import React, { useState, useEffect } from "react";
import "../css/MyPage.css";
import CodingBadge from "./mypage/CodingBadge";
import MyWrongQuestion from "./mypage/MyWrongQuestion";
import MyQuestion from "./mypage/MyQuestion";
import SolveQuestion from "./mypage/SolveQuestion";
import MyBoard from "./mypage/MyBoard";
import Chatbot from "../components/Chatbot";
import axios from "axios";
import { UNSAFE_ErrorResponseImpl } from "@remix-run/router";
const MyPageMain = () => {
  
  const [selectedButton, setSelectedButton] = useState("codingBadge");
  const [username, setUsername] = useState("");
  const [codingBadge, setCodingBadge] = useState("");
  const [codingBadgeImg, setCodingBadgeImg] = useState("");
  const [user,setUser]=useState();

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+"/api/v1/user/info/my";

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
        setUser(response.data)
        setCodingBadgeImg(response.data.imgUrl)
        // console.log(user);
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  }, []);

  const [currentScreen, setCurrentScreen] = useState("codingBadge");
  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
    setSelectedButton(screen);
  };


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
        {currentScreen === "codingBadge" && user && <CodingBadge user = {user} />}
        {currentScreen === "wrongQuestion" && <MyWrongQuestion />}
        {currentScreen === "solveQuestion" && <SolveQuestion />}
        {currentScreen === "createQuestion" && <MyQuestion />}
        {currentScreen === "myBord" && <MyBoard />}
        <Chatbot></Chatbot>
      </section>
    </>
  );
};

export default MyPageMain;
