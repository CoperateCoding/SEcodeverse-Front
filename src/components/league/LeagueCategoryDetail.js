import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "../../css/league/LeagueCategoryDetail.css";
import LeagueQuestionComponent from "./LeagueQuestionComponent";
import LeagueQuestionPopup from "./LeagueQusetionPopup";
import axios from 'axios';
const LeagueCategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(10);
  const [isPopup, setIsPopup] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [problems, setProblems] = useState([]);
  const [Index,setIndex] = useState(0)
  const[detailQuestion, setDetailQuestion] = useState({})
  useEffect(() => {
    var categoryid =0
    axios
      .get(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/ctf/category/${category}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((response) => {
        console.log("ctf카테고리Pk",response.data)
        categoryid=response.data
        axios
        .get(`${process.env.REACT_APP_DB_HOST}/api/v1/ctf/league/current`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          }
        })
        .then((response) => {
          console.log("현재진행중인 리그pk",response.data)
          const league = response.data
          axios
          .get(`${process.env.REACT_APP_DB_HOST}/api/v1/ctf/question/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
            params: {
              categoryPk: categoryid,
              leaguePk:league
            },
          })
          .then((response) => {
            console.log("카테고리별 문제", response.data);
            setProblems(response.data.list);
          })
          .catch((error) => {
            console.error("카테고리 별 문제찾다가", error);
          });

        })
        .catch((error) => {
          console.error("현재 진행중인 리그 찾다가", error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, []);


  // const [problems, setProblems] = useState([
  //   { name: "문제 1", score: 5, type: "객관식", submit: false },
  //   { name: "문제 2", score: 20, type: "주관식", submit: false },
  //   { name: "문제 3", score: 10, type: "객관식", submit: false },
  //   { name: "문제 4", score: 10, type: "주관식", submit: false },
  //   { name: "문제 5", score: 5, type: "객관식", submit: false },
  //   { name: "문제 6", score: 5, type: "객관식", submit: false },
  //   { name: "문제 7", score: 10, type: "주관식", submit: false },
  //   { name: "문제 8", score: 5, type: "객관식", submit: false },
  //   { name: "문제 9", score: 10, type: "객관식", submit: false },
  //   { name: "문제 10", score: 20, type: "주관식", submit: false }
  // ]);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const[questionPk,setQuestionPk] = useState()
  
  const handleQuestionClick = async (index,pk) => {
    setQuestionPk(pk)
    axios
  .get(`${process.env.REACT_APP_DB_HOST}/api/v1/ctf/question/${pk}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    }
  })
  .then((response) => {
    console.log("상세 문제", response.data);
    setDetailQuestion(response.data);
  })
  .catch((error) => {
    console.error("상세 문제 찾다가", error);
  });
    console.log(index);
    console.log("클릭한 문제의 상세 pk" ,pk)
    console.log(problems[index].solved);

    // await sleep(2000);
    setIsPopup(!isPopup);
    setSelectedQuestionIndex(index);
  };

  const handleSubmitClick = () => {
    setQuestionCount(questionCount - 1);
    setIsSubmit(true);

    // problems 배열을 직접 수정하지 말고, setProblems 함수를 사용하여 상태를 업데이트합니다.
    setProblems(prevProblems => {
      const updatedProblems = [...prevProblems];
      updatedProblems[selectedQuestionIndex].solved = true;
      return updatedProblems;
    });

    setSelectedQuestionIndex(null);
    setIsPopup(!isPopup);

  };

  if (questionCount === 0) {
    navigate("/league/category");
    //이거 여기에 값 업데이트 하는거라던가 해줭,,,,ㅠㅠ
  }


 

  return (
    <section>
      <div className="league-category-detail-container">
        <div className="league-category-detail-wrapper">
          <div className="league-category-detail-upper-box">
            <Link to="/league/category">&lt;&lt; 카테고리 선택으로 돌아가기</Link>
          </div>
          <div className="league-category-detail-title-box">
            <span>{category} 문제</span>
            {/* <div className="league-category-detail-remain-question">
              <span>남은 문제 : </span>
              <span>{questionCount}개</span>
            </div> */}
          </div>
          <div className="league-category-detail-question-list">
            <div className="league-category-detail-question-wrap">
              {problems && problems.map((value, index) => (
                <LeagueQuestionComponent
                  key={index}
                  problem={value}
                  onQuestionClick={() => handleQuestionClick(index, value.questionPk)}
                  isSubmitted={value.solved}
             
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isPopup && (
        <LeagueQuestionPopup

          isSubmitted={problems[selectedQuestionIndex].solved}
          onQuestionClick={() => handleQuestionClick(selectedQuestionIndex)}
          onSubmitClick={handleSubmitClick}
          detailQuestion={detailQuestion}
          questionPk={questionPk}
        />
      )}
    </section>
  );
};

export default LeagueCategoryDetail;
