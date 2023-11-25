import React, { useState, useEffect } from "react";
import "../css/MyPage.css";
import CodingBadge from "./mypage/CodingBadge";
import MyWrongQuestion from "./mypage/MyWrongQuestion";
import MyQuestion from "./mypage/MyQuestion";
import SolveQuestion from "./mypage/SolveQuestion";
import MyBoarde from "./mypage/MyBoard";
import Chatbot from "../components/Chatbot";
import axios from "axios";
import { UNSAFE_ErrorResponseImpl } from "@remix-run/router";
const MyPageMain = () => {
  const [currentScreen, setCurrentScreen] = useState("codingBadge");
  const [selectedButton, setSelectedButton] = useState("codingBadge");
  const [username, setUsername] = useState("");
  const [codingBadge, setCodingBadge] = useState("");
  const [codingBadgeImg, setCodingBadgeImg] = useState("");

  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
    setSelectedButton(screen);
  };
  useEffect(() => {
    const apiUrl = "/api/v1/user/info/my";

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.nickName);
        setCodingBadge(response.data.badgeName);
        if ((response.data.badName = "알")) {
          setCodingBadgeImg(
            "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/codingBadge/%EC%95%8C.jpg"
          );
        } else if ((response.data.badName = "아기 까마귀")) {
          setCodingBadgeImg(
            "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/codingBadge/%EC%95%84%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
          );
        } else if ((response.data.badName = "초딩 까마귀")) {
          setCodingBadgeImg(
            "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/codingBadge/%EC%B4%88%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
          );
        } else if ((response.data.badName = "사춘기 까마귀")) {
          setCodingBadgeImg(
            "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/codingBadge/%EC%82%AC%EC%B6%98%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
          );
        } else if ((response.data.badName = "대딩 까마귀")) {
          setCodingBadgeImg(
            "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/codingBadge/%EB%8C%80%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
          );
        } else if ((response.data.badName = "석박사 까마귀")) {
          setCodingBadgeImg(
            "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/codingBadge/%EC%84%9D%EB%B0%95%EC%82%AC+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
          );
        }
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  }, []);

  return (
    <>
      <section>
        <div className="myPage-user">
          <div className="myPage-badge">
            <div className="mypageCircle">
              <img src={codingBadgeImg}></img>
            </div>
          </div>
          <div className="myPageName">
            <span className="myPage-user-name">{username}</span>
            <span className="myPage-user-grade">{codingBadge}</span>
          </div>
        </div>
        <div className="mypageHeader">
          <button
            className={selectedButton === "codingBadge" ? "selectedButton" : ""}
            onClick={() => handleButtonClick("codingBadge")}
          >
            내 정보 확인
          </button>
          <button
            className={
              selectedButton === "wrongQuestion" ? "selectedButton" : ""
            }
            onClick={() => handleButtonClick("wrongQuestion")}
          >
            틀린 문제
          </button>
          <button
            className={
              selectedButton === "solveQuestion" ? "selectedButton" : ""
            }
            onClick={() => handleButtonClick("solveQuestion")}
          >
            풀었던 문제
          </button>
          <button
            className={
              selectedButton === "createQuestion" ? "selectedButton" : ""
            }
            onClick={() => handleButtonClick("createQuestion")}
          >
            만든 문제
          </button>
          <button
            className={selectedButton === "myBord" ? "selectedButton" : ""}
            onClick={() => handleButtonClick("myBord")}
          >
            내 게시글
          </button>
        </div>
        {currentScreen === "codingBadge" && <CodingBadge/>}
        {currentScreen === "wrongQuestion" && <MyWrongQuestion />}
        {currentScreen === "solveQuestion" && <SolveQuestion />}
        {currentScreen === "createQuestion" && <MyQuestion />}
        {currentScreen === "myBord" && <MyBoarde />}
        <Chatbot></Chatbot>
      </section>
    </>
  );
};

export default MyPageMain;
