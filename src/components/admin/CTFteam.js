import React, { useState } from "react";
import "../../css/AdminCTFTeam.css";
import TeamTableComponent from "./TeamTableComponent";
import axios from 'axios'
const CTFteam = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("점수 높은순");
  const[sortType,setSortType] = useState('HIGH')
  const[leaguePk,setLeaguePk] = useState(0)
  const [team, setTeam] = useState([])
  const [totalPages,setTotalpages]=useState(1); 
  const [currentPage, setCurrentPage] = useState(1);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const high = () => {
    console.log("high 누름")
    changeOrder("점수높은순")
    sortTeam('HIGH')
  }

  const low = () => {
    console.log("low 누름")
    changeOrder("점수낮은순")
    sortTeam('LOW')
  }

  const sortTeam = (sort) => {
    console.log(sort)
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/admin/ctf/team/all/${leaguePk}`;
    const page=1
    const params = {
      
      page:page,
      pageSize:10,
      sort:sort

    };
    const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;

    axios.get(url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then(response => {
        console.log("team결과 ",response.data)
        setTeam(response.data.list)
        setTotalpages(response.data.cnt % 10 > 0 ? response.data.cnt/10 + 1 : response.data.cnt/10);
      
      
      })
      .catch(error => {
        console.error('team 조회 중 에러:', error);
      });
  }

  const changeOrder = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 옵션을 선택한 후 아코디언을 닫음
  }; 
   const handlePrevClick = () => {
    if (currentPage > 1) {
      const pagiging=currentPage-1
      getTeam(pagiging) 
      setCurrentPage(pagiging)
    }
  };

  const handleNextClick = () => {
   
    if (currentPage < totalPages) { 
      const pagiging = currentPage+1
      getTeam(pagiging) 
      setCurrentPage(pagiging)
    }
  }
  const leagueSearch = () => {
    var inputElement = document.querySelector('input');
    var inputValue = inputElement.value;
    console.log(inputValue)
    setLeaguePk(inputValue)
    getTeam(1)
    
  }
  const buttonClick = (n) => {
    getTeam(n)
    setCurrentPage(n)
  }
  const getTeam =(paging) => {
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/admin/ctf/team/all/${leaguePk}`;
    const page=paging
    const params = {
      
      page:page,
      pageSize:10,
      sort:sortType

    };
    const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;

    axios.get(url,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then(response => {
        console.log("team결과 ",response.data)
        setTeam(response.data.list)
        setTotalpages(response.data.cnt % 10 > 0 ? response.data.cnt/10 + 1 : response.data.cnt/10);
      
      
      })
      .catch(error => {
        console.error('team 조회 중 에러:', error);
      });
  }

  return (
    <div className="admin-main-board-right">
      <div className="admin-team-board-wrapper">
        <h1 className="admin-team-board-rightMain">CTF 팀 관리</h1>
        <div className="admin-team-board-topBar">
          <div name="admin-team-board-category-accordion-wrap">
            <div
              className="admin-team-accordion-header"
              onClick={toggleAccordion}
            >
              <sapn className="ctf-team-board-search-order-text">
                {selectedOption}
              </sapn>
              <sapn className="ctf-team-board-search-order-icon">
                {isOpen ? "▲" : "▼"}
              </sapn>
            </div>
            <div
                  className="league"
                  
                >
                 리그 pk
                </div>
            <input></input>
            <button onClick={leagueSearch}>조회</button>
            {isOpen && (
              <div className="ctf-team-accordion-content">
                <div
                  className="ctf-team-board-search-order-text "
                  onClick={high}
                >
                  점수높은순
                </div>
                <div
                  className="ctf-team-board-search-order-text "
                  onClick={low}
                >
                  점수낮은순
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="admin-team-board-table">
          <table className="admin-team-table">
            <thead>
              <tr>
                <th className="admin-team-table-number">No.</th>
                <th className="admin-team-table-name">팀이름</th>
                <th className="admin-team-table-score">총 점수</th>
              </tr>
            </thead>
            <tbody>
            {team && team.map((value, index) => (
              <TeamTableComponent index={index} value ={value}/>
                   
                ))}
             
            </tbody>
          </table>
        </div>
        <div className="community-paging">
            <button onClick={handlePrevClick}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => buttonClick(i + 1)}>
                {i + 1}
              </button>
            ))}
            <button onClick={handleNextClick}>&gt;</button>
          </div>
      </div>
    </div>
  );
};

export default CTFteam;
