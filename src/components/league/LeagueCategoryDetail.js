import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../css/league/LeagueCategoryDetail.css";
import LeagueQuestionComponent from "./LeagueQuestionComponent";

const LeagueCategoryDetail = () => {
  const { category } = useParams();
  const [questionCount, setQuestionCount] = useState(10);

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
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
              <LeagueQuestionComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeagueCategoryDetail;
