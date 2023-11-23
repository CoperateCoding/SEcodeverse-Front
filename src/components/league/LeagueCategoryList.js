import React from "react";
import { Link } from "react-router-dom";
import CategoryComponent from "./CategoryComponent";
import "../../css/league/LeagueCategoryList.css";

const LeagueCategoryList = () => {
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
