import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CategoryComponent from "./CategoryComponent";
import "../../css/league/LeagueCategoryList.css";

const LeagueCategoryList = () => {
  const leagueData = {
    name : "CTF League Name",
    openTime : "2023-11-25T05:29:38.541Z",
    closeTime : "2023-11-26T05:29:38.541Z",
    memberCnt : 4,
    notice : "notice",
    description : "description",
  };

  // 리그 이벤트의 시작 및 종료 시간 설정(임의)
  const leagueStartTime = new Date(leagueData.openTime);
  const leagueEndTime = new Date(leagueData.closeTime);

  const navigate = useNavigate();

  useEffect(() => {
    // 현재 시간이 리그 이벤트 시간 내에 있는지 확인
    const currentTime = new Date();

    if (currentTime >= leagueStartTime && currentTime <= leagueEndTime) {
      navigate("/league/category");
    } else {
      navigate("/league");
      alert("리그는 현재 열려있지 않습니다.");
    }
  }, [leagueStartTime, leagueEndTime]);
  
  const categoryArray = [
    "컴퓨터네트워크",
    "웹",
    "자료구조",
    "SQL",
    "JSP",
    "컴퓨터언어",
    "운영체제",
    "인공지능",
    "UML",
    "IoT",
    "모바일",
    "정보보안",
    "빅데이터",
    "기초지식",
    "데이터베이스",
  ];

  return (
    <section>
      <div className="league-category-list-container">
        <div className="league-category-list-wrapper">
          {categoryArray.map((value, index) => (
            <Link key={index} to={`/league/category-detail/${value}`}>
              <CategoryComponent key={index} category={value} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeagueCategoryList;
