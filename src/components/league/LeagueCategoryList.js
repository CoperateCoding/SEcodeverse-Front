import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CategoryComponent from "./CategoryComponent";
import "../../css/league/LeagueCategoryList.css";
import axios from 'axios'
const LeagueCategoryList = () => {
  const [categorys, setCategorys] = useState([])
  const [isAllSolved,setIsAllSolved] = useState([])
  useEffect(() => {
  
    axios
      .get(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/ctf/league/current`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        }
      })
      .then((response) => {
        console.log("현재 진행중인 리그 pk",response.data)
        axios.get(`${process.env.REACT_APP_DB_HOST}/api/v1/ctf/category/all`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
          params: {
            leaguePk: response.data,
          },
        })
          .then((response) => {
            console.log("ctf카테고리", response.data);
            setCategorys(response.data);
            // setIsAllSolved(response.data.)
          })
          .catch((error) => {
            console.error(error);
          });
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  // const leagueData = {
  //   name: "CTF League Name",
  //   openTime: "2023-11-28T05:29:38.541Z",
  //   closeTime: "2023-11-30T05:29:38.541Z",
  //   memberCnt: 4,
  //   notice: "notice",
  //   description: "description",
  // };

  // // 리그 이벤트의 시작 및 종료 시간 설정(임의)
  // const leagueStartTime = new Date(leagueData.openTime);
  // const leagueEndTime = new Date(leagueData.closeTime);

  // // 현재 시간이 리그 이벤트 시간 내에 있는지 확인
  // const currentTime = new Date();

  // if (currentTime >= leagueStartTime && currentTime <= leagueEndTime) {
  //   navigate("/league/category");
  // } else {
  //   navigate("/league");
  //   alert("리그는 현재 열려있지 않습니다.");
  // }

  // const categoryArray = [
  //   "컴퓨터네트워크",
  //   "웹",
  //   "자료구조",
  //   "SQL",
  //   "JSP",
  //   "컴퓨터언어",
  //   "운영체제",
  //   "인공지능",
  //   "UML",
  //   "IoT",
  //   "모바일",
  //   "정보보안",
  //   "빅데이터",
  //   "기초지식",
  //   "데이터베이스",
  // ];

  const categoryArray = [
    { category: "컴퓨터네트워크", problemCount: 10 },
    { category: "웹", problemCount: 10 },
    { category: "자료구조", problemCount: 10 },
    { category: "SQL", problemCount: 10 },
    { category: "JSP", problemCount: 10 },
    { category: "컴퓨터언어", problemCount: 10 },
    { category: "운영체제", problemCount: 10 },
    { category: "인공지능", problemCount: 10 },
    { category: "UML", problemCount: 10 },
    { category: "IoT", problemCount: 10 },
    { category: "모바일", problemCount: 10 },
    { category: "정보보안", problemCount: 10 },
    { category: "빅데이터", problemCount: 10 },
    { category: "기초지식", problemCount: 10 },
    { category: "데이터베이스", problemCount: 10 },
  ];

  return (
    <section>
      <div className="league-category-list-container">
        <div className="league-category-list-wrapper">
          {categorys.map((value, index) => (
            <Link key={index} to={`/league/category-detail/${value.name}`}>
              <CategoryComponent key={index} category={value.name} value = {value} count={value.problemCount} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeagueCategoryList;
