import React, { useState,useEffect } from "react";
import "../../css/Community.css";
import Chatbot from '../../components/Chatbot';
import BoardComponent from "../BoardComponent";
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
const Community = () => {
  const [communityList,setCommunityLit] = useState([]);
  const navigate = useNavigate();

  const [totalPages,setTotalpages]=useState(1); 
  const writeContents = () => {
  
  };

  useEffect(() => {
    const apiUrl = '/api/v1/board';
    const sort="RECENT"
    const categorPk=1
    const page=1
    const params = {
      sort:sort,
      categorPk:categorPk,
      page:page,

    };
    const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;

  axios.get(url)
    .then(response => {
      setCommunityLit(response.data.list)
      setTotalpages(response.data.cnt % 8 > 0 ? response.data.cnt/8 + 1 : response.data.cnt/8);
      console.log(response.data)
      if(totalPages<1){
        setTotalpages(1)
      }
    
    })
    .catch(error => {
      console.error('API 호출 중 에러:', error);
    });

  }, []);


  //검색창 입력
  const [searchTerm, setSearchTerm] = useState("");

  const performSearch = () => {
    if(selectedOption=="최신순"){
      console.log("RECENT")
      getList(searchTerm,"RECENT",selectedButton,1)
      console.log("RECENT")
    }else if(selectedOption=="인기순"){
      console.log("POP")
      getList(searchTerm,"POP",selectedButton,1)
    }
    else{
      console.log("댓글순")
      getList(searchTerm,"COMMENT",selectedButton,1)
    }
    setSearchTerm("");
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  //아코디언
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const changeOrder = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 옵션을 선택한 후 아코디언을 닫음

    if(option=="최신순"){
      console.log("RECENT")
      getList(searchTerm,"RECENT",selectedButton,1)
      console.log("RECENT")
    }else if(option=="인기순"){
      console.log("POP")
      getList(searchTerm,"POP",selectedButton,1)
    }
    else{
      console.log("댓글순")
      getList(searchTerm,"COMMENT",selectedButton,1)
    }
  };
  const getList = (value,selectsort,category,pageing) => {
    const apiUrl = '/api/v1/board';
    const sort=selectsort
    const page=pageing
    let params={}
    
    if(category == 0 || category == 1){
      if(value==null){
      params = {
        sort:sort,
        page:page,
     
      };}
      else{
        params = {
          q:value,
          sort:sort,
          page:page,
      
        };
      }
    }
    else{
      const newCategory = category -1;
      if(value == null){
      params = {
        sort:sort,
        categoryPk:newCategory,
        page:page,
     
      };}
      else{
        params = {
          q:value,
          sort:sort,
          categoryPk:newCategory,
          page:page,
  
        };
      }
    }
   
    
    const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;

  axios.get(url)
    .then(response => {
      setCommunityLit(response.data.list)
      setTotalpages(response.data.cnt % 10 > 0 ? response.data.cnt/10 + 1 : response.data.cnt/10);
     
    
    })
    .catch(error => {
      console.error('API 호출 중 에러:', error);
    });

  }
  const goToWrite = () => {
    navigate('/communitywrite')
  }
  //상단 버튼
  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    console.log('buttonNumber',buttonNumber)
    if(selectedOption=="최신순"){
      console.log("RECENT")
      getList(searchTerm,"RECENT",buttonNumber,1)
      console.log("RECENT")
    }else if(selectedOption=="인기순"){
      console.log("POP")
      getList(searchTerm,"POP",buttonNumber,1)
    }
    else{
      console.log("댓글순")
      getList(searchTerm,"COMMENT",buttonNumber,1)
    }
    

  };

  //페이징
  const [currentPage, setCurrentPage] = useState(1);

  const buttonClick = (n) => {
    setCurrentPage(n)
    if(selectedOption=="최신순"){
      console.log("RECENT")
      getList(searchTerm,"RECENT",selectedButton,n)
      console.log("RECENT")
    }else if(selectedOption=="인기순"){
      console.log("POP")
      getList(searchTerm,"POP",selectedButton,n)
    }
    else{
      console.log("댓글순")
      getList(searchTerm,"COMMENT",selectedButton,n)
    }
  }
  
  const handlePrevClick = () => {
    if (currentPage > 1) {
      const page=currentPage-1
      setCurrentPage(currentPage - 1);
 
    if(selectedOption=="최신순"){
      console.log("RECENT")
      getList(searchTerm,"RECENT",selectedButton,page)
      console.log("RECENT")
    }else if(selectedOption=="인기순"){
      console.log("POP")
      getList(searchTerm,"POP",selectedButton,page)
    }
    else{
      console.log("댓글순")
      getList(searchTerm,"COMMENT",selectedButton,page)
    }
    }
  };

  const handleNextClick = () => {
   
    if (currentPage < totalPages) { 
      const page = currentPage+1
      setCurrentPage(currentPage + 1);
     
    if(selectedOption=="최신순"){
      console.log("RECENT")
      getList(searchTerm,"RECENT",selectedButton,page)
      console.log("RECENT")
    }else if(selectedOption=="인기순"){
      console.log("POP")
      getList(searchTerm,"POP",selectedButton,page)
    }
    else{
      console.log("댓글순")
      getList(searchTerm,"COMMENT",selectedButton,page)
    }
    }
  };

  return (
    <section>
      <div className="community-page-container">
        <div className="community-page-button-wrappger">
          <div
            className={`community-page-button-item1 ${
              selectedButton === 1 ? "community-page-button-item1-clicked" : ""
            }`}
            onClick={() => handleButtonClick(1)}
          >
            전체
          </div>
          <div
            className={`community-page-button-item2 ${
              selectedButton === 2 ? "community-page-button-item2-clicked" : ""
            }`}
            onClick={() => handleButtonClick(2)}
          >
           자유게시판
          </div>
          <div
            className={`community-page-button-item3 ${
              selectedButton === 3 ? "community-page-button-item3-clicked" : ""
            }`}
            onClick={() => handleButtonClick(3)}
          >
            공지사항
          </div>
          <div
            className={`community-page-button-item4 ${
              selectedButton === 4 ? "community-page-button-item4-clicked" : ""
            }`}
            onClick={() => handleButtonClick(4)}
          >
            코딩게시판
          </div>
          <div
            className={`community-page-button-item5 ${
              selectedButton === 5 ? "community-page-button-item5-clicked" : ""
            }`}
            onClick={() => handleButtonClick(5)}
          >
            취업게시판
          </div>
          <div
            className={`community-page-button-item6 ${
              selectedButton === 6 ? "community-page-button-item6-clicked" : ""
            }`}
            onClick={() => handleButtonClick(6)}
          >
            공모전게시판
          </div>
        </div>
        <div className="community-page-middle-contents-wrapper">
          <div className="community-page-search-wrapper">
            <div className="community-page-search-box">
              <input
                type="text"
                value={searchTerm}
                id="search-input"
                placeholder="검색어를 입력하세요"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button
                id="search-button"
                className="community-page-search-icon"
                onClick={performSearch}
              ></button>
            </div>
            <div className="community-page-search-order">
              <div className="accordion-header" onClick={toggleAccordion}>
                <sapn className="community-page-search-order-text">
                  {selectedOption}
                </sapn>
                <sapn className="community-page-search-order-icon">
                  {isOpen ? "▲" : "▼"}
                </sapn>
              </div>
              {isOpen && (
                <div className="accordion-content">
                  <div
                    href="#"
                    className="community-page-search-order-text"
                    onClick={() => changeOrder("최신순")}
                  >
                    최신순
                  </div>
                  <div
                    href="#"
                    className="community-page-search-order-text"
                    onClick={() => changeOrder("댓글순")}
                  >
                    댓글순
                  </div>
                  <div
                    href="#"
                    className="community-page-search-order-text"
                    onClick={() => changeOrder("인기순")}
                  >
                    인기순
                  </div>
                </div>
              )}
            </div>
            <div className="community-page-write-box">
              <a
                href
                className="community-page-write-box-text"
                onClick={goToWrite}
              >
                게시글 작성
              </a>
            </div>
          </div>
        </div>
        <div className="community-page-contents-wrapper">
          <BoardComponent posts={communityList} />
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
      <Chatbot></Chatbot>
    </section>
  );
};

export default Community;
