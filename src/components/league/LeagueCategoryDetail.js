import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "../../css/league/LeagueCategoryDetail.css";
import LeagueQuestionComponent from "./LeagueQuestionComponent";
import LeagueQuestionPopup from "./LeagueQusetionPopup";

const LeagueCategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(10);
  const [isPopup, setIsPopup] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const [problems, setProblems] = useState([
    { name: "문제 1", score: 5, type: "객관식", submit: false },
    { name: "문제 2", score: 20, type: "주관식", submit: false },
    { name: "문제 3", score: 10, type: "객관식", submit: false },
    { name: "문제 4", score: 10, type: "주관식", submit: false },
    { name: "문제 5", score: 5, type: "객관식", submit: false },
    { name: "문제 6", score: 5, type: "객관식", submit: false },
    { name: "문제 7", score: 10, type: "주관식", submit: false },
    { name: "문제 8", score: 5, type: "객관식", submit: false },
    { name: "문제 9", score: 10, type: "객관식", submit: false },
    { name: "문제 10", score: 20, type: "주관식", submit: false }
  ]);

  const handleQuestionClick = (index) => {
    console.log(index);
    console.log(problems[index].submit);
    setIsPopup(!isPopup);
    setSelectedQuestionIndex(index);
  };

  const handleSubmitClick = () => {
    setQuestionCount(questionCount - 1);
    setIsSubmit(true);

    // problems 배열을 직접 수정하지 말고, setProblems 함수를 사용하여 상태를 업데이트합니다.
    setProblems(prevProblems => {
      const updatedProblems = [...prevProblems];
      updatedProblems[selectedQuestionIndex].submit = true;
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
            <div className="league-category-detail-remain-question">
              <span>남은 문제 : </span>
              <span>{questionCount}개</span>
            </div>
          </div>
          <div className="league-category-detail-question-list">
            <div className="league-category-detail-question-wrap">
              {problems.map((value, index) => (
                <LeagueQuestionComponent
                  key={index}
                  problem={value}
                  onQuestionClick={() => handleQuestionClick(index)}
                  isSubmitted={value.submit}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isPopup && (
        <LeagueQuestionPopup
          isSubmitted={problems[selectedQuestionIndex].submit}
          onQuestionClick={() => handleQuestionClick(selectedQuestionIndex)}
          onSubmitClick={handleSubmitClick}
        />
      )}
    </section>
  );
};

export default LeagueCategoryDetail;
