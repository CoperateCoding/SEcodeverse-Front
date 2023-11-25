import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../css/league/LeagueCategoryDetail.css";
import LeagueQuestionComponent from "./LeagueQuestionComponent";

const LeagueCategoryDetail = () => {
  const { category } = useParams();
  const [questionCount, setQuestionCount] = useState(10);

  //서버에서 카테고리에 해당하는 문제들을 가져와야 함
  const problems = [
    { name: "문제 1", score: 5, type: "객관식" },
    { name: "문제 2", score: 20, type: "주관식" },
    { name: "문제 3", score: 10, type: "객관식" },
    { name: "문제 4", score: 10, type: "주관식" },
    { name: "문제 5", score: 5, type: "객관식" },
    { name: "문제 6", score: 5, type: "객관식" },
    { name: "문제 7", score: 10, type: "주관식" },
    { name: "문제 8", score: 5, type: "객관식" },
    { name: "문제 9", score: 10, type: "객관식" },
    { name: "문제 10", score: 20, type: "주관식" }
  ];

  return (
    <section>
      <div className="league-category-detail-container">
        <div className="league-category-detail-wrapper">
          <div className="league-category-detail-upper-box">
            <Link to ="/league/category">
              &lt;&lt; 카테고리 선택으로 돌아가기
            </Link>
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
                <LeagueQuestionComponent key={index} problem={value}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeagueCategoryDetail;
