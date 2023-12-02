import React, { useState,useEffect } from "react";
import "../../css/MyPage.css";
import BoardComponent from "../BoardComponent";
import axios from 'axios';

const MyBorde = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [boardList, setBoardList] = useState([])
  const [totalPages,setTotalpages]=useState(0); 
  useEffect(() => {
    const apiUrl =`${process.env.REACT_APP_DB_HOST}`+ '/api/v1/my/board';
    const page=1
    const params = {
      pageSize:8,
      page:page
    };
    const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;

  axios.get(url
    ,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`


      }
    })
    .then(response => {
      console.log(response.data)
      setBoardList(response.data.list)
      setTotalpages(response.data.cnt % 10 > 0 ? response.data.cnt/10 + 1 : response.data.cnt/10);
    
    })
    .catch(error => {
      console.error('내 게시물 확인 중 에러:', error);
    });

 


  }, []);

  const getList = (paging) => {
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+'/api/v1/my/board';
 
    const params = {
      pageSize:8,
      page:paging
    };
    const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;
  
  
  axios.get(url
    ,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`


      }
    })
    .then(response => {
      console.log(response.data)
      setBoardList(response.data.list)
      setTotalpages(response.data.cnt % 8 > 0 ? response.data.cnt/8 + 1 : response.data.cnt/8);
    
    })
    .catch(error => {
      console.error('API 호출 중 에러:', error);
    });
  }
  const handlePrevClick = () => {
    if (currentPage > 1) {
      getList(currentPage-1)
      setCurrentPage(currentPage - 1);

    }
  };
  const buttonClick = (n) => {
    setCurrentPage(n)
    
      getList(n)
  
  }
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      getList(currentPage+1)
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="mypage-main-wrapper">
        <div className="mypageMain">
          <div className="myBoard-wrapper">
            <BoardComponent posts={boardList} />
          </div>
          <div className="mypage-paging">
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
    </>
  );
};

export default MyBorde;
