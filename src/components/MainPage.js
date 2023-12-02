import "../css/MainPage.css";
import Chatbot from "../components/Chatbot";
import FavoriteBoardComponent from "./FavoriteBoardComponent";
import RecentQuestionComponent from "./RecentQuestionComponent";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Main_Page_Body = () => {
  const [boardList, setBoardList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isLeague, setIsLeage] = useState(false);
  const [league, setLeague] = useState();
  const [leagueName, setLeagueName] = useState("");
  const [leagueOpenTime, setLeagueOpenTime] = useState("");
  const [leagueCloseTime, setCloseTime] = useState("");
  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_DB_HOST}` + "/api/v1/board/popular";

    axios
      .get(apiUrl)

      .then((response) => {
        console.log("인기게시글", response.data);
        console.log(response.data);
        setBoardList(response.data.list);
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });

    axios
      .get(
        `${process.env.REACT_APP_DB_HOST}` + "/api/v1/question/search/recent"
      )
      .then((response) => {
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });

    const apiUrl2 =
      `${process.env.REACT_APP_DB_HOST}` + "/api/v1/ctf/league/current";
    axios
      .get(apiUrl2, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setIsLeage(true);
        console.log("현재 진행중인 리그 있음", response.data);
        const apiUrl3 =
          `${process.env.REACT_APP_DB_HOST}` +
          `/api/v1/ctf/league/${response.data}`;
        axios
          .get(apiUrl3, {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            setLeague(response.data);
            setLeagueName(response.data.name);
            setLeagueOpenTime(response.data.openTime);
            setCloseTime(response.data.closeTime);
          })
          .catch((error) => {
            console.error("리그 상세조회중 에러", error);
          });
      })
      .catch((error) => {
        console.error("현재 진행중인 리그 받아오는중 에러", error);
        setIsLeage(false);
      });
  }, []);

  return (
    <section>
      <div className="main_page_container">
        <div className="main_page_wrapper">
          <div className="main_page_left">
            <div className="main_page_contents1">
              <div className="main-page-contents1-title-box">
                <span className="main-page-contents1-font">인기게시글</span>
              </div>
              <div className="main-page-contents1-table">
                <FavoriteBoardComponent posts={boardList} />
              </div>
            </div>
          </div>
          <div className="main_page_right">
            <div className="main_page_contents2">
              <div className="main-page-contents2-title-box">
                <div className="main-page-contents2-title-box">
                  <span className="main-page-contents2-font">
                    최근 올라온 문제
                  </span>
                </div>
              </div>
              <table className="main-page-contents2-table">
                <thead>
                  <tr>
                    <th className="main-page-contents2-table-name">
                      문제 제목
                    </th>
                    <th className="main-page-contents2-table-writer">제출자</th>
                    <th className="main-page-contents2-table-level">레벨</th>
                    <th className="main-page-contents2-table-category">유형</th>
                  </tr>
                </thead>
                <tbody>
                  <RecentQuestionComponent questions={questionList} />
                </tbody>
              </table>
            </div>
            <div className="main_page_contents3">
              <div className="main-page-contents3-title-box">
                <div className="main-page-contents3-title-box">
                  <span className="main-page-contents3-font">
                    현재 진행중인 리그
                  </span>
                </div>
              </div>
              <div className="main-page-content3-wrap">
                {isLeague ? (
                  <div>
                    <p>{leagueName}</p>
                    <p>
                      {new Date(leagueOpenTime).toLocaleString()} ~ {new Date(leagueCloseTime).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  // <div className="main-page-contents3-img"></div>
                  <div><p>리그 없음</p></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot></Chatbot>
    </section>
  );
};
export default Main_Page_Body;
