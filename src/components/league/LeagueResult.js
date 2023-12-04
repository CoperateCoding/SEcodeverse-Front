import React, { useEffect, useState } from "react";
import "../../css/league/LeagueResult.css";
import BarChart from "./BarChart";
import RankTableComponent from "./RankTableComponent";
import axios from "axios";
const LeagueResult = () => {
  //Close 상태 및 시간 지났을 때만 열리는걸로 처리. (useEffect 사용)
  const [langk,setLank]= useState([])
  const [teamName,setTeamName] = useState('')
  const [categoryTeamQuestion,setCategoryTeamQuestion] = useState([])
  useEffect(() => {
    var leagePk = 0;
    axios
  .get(
    `${process.env.REACT_APP_DB_HOST}` +
      `/api/v1/ctf/detail/my/team`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  )
  .then((response) => {
    console.log("팀 이름", response.data.name);
    setTeamName(response.data.name)
  })
  .catch((error) => {
    console.error("팀이름 찾다가", error);
  });

    axios
      .get(`${process.env.REACT_APP_DB_HOST}` + `/api/v1/ctf/league/current`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("현제 진행중인 leaguePk", response.data);
        leagePk = response.data;
        axios
          .post(
            `${process.env.REACT_APP_DB_HOST}` +
              `/api/v1/ctf/team/all/end/${leagePk}`,{},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((response) => {
            console.log("팀 등수 매기기 성공", response.data);
            axios
            .get(
              `${process.env.REACT_APP_DB_HOST}` +
                `/api/v1/ctf/team/all/rank_and_score/${leagePk}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            )
            .then((response) => {
              console.log("상위 10명 유저의 랭크", response.data);
              setLank(response.data.list)
            })
            .catch((error) => {
              console.error("상위 10명 유저 랭크 찾다가", error);
            });
            axios
            .get(
              `${process.env.REACT_APP_DB_HOST}/api/v1/ctf/team/category/scores`,
                
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            )
            .then((response) => {
              console.log("팀별 카테고리별 맞춘 문제", response.data);
              setCategoryTeamQuestion(response.data.list)
             
            })
            .catch((error) => {
              console.error("팀별 카테고리 별 맞춘 문제 찾다가", error);
            });
          })
          .catch((error) => {
            console.error("팀 등수 메기다가", error);
          });
      })
      .catch((error) => {
        console.error("진행중인 leaguePk찾다고", error);
      });
  }, []);


  const categoryData = {
    labels: categoryTeamQuestion.map((item) => item.categoryName),
    datasets: [
      {
        data: categoryTeamQuestion.map((item) => item.score),
        backgroundColor: "rgba(180, 200, 230, 0.7)",
      },
    ],
  };

  const teamData = {
    labels: langk.map((item) => item.name),
    datasets: [
      {
        data: langk.map((item) => item.score),
        backgroundColor: "rgba(180, 200, 230, 0.7)",
      },
    ],
  };

  return (
    <section>
      <div className="league-result-container">
        <div className="league-result-wrapper">
          <div className="league-result-title-box">
            <span>CTF 리그 결과 확인</span>
          </div>
          <div className="league-result-score-graph-box">
            <BarChart data={categoryData} />
          </div>
          <div className="league-result-bottom-box">
            <div className="league-result-team-box">
              <table className="league-result-table">
                <thead className="league-result-table-thead">
                  <tr>
                    <th className="league-result-table-rank">순위</th>
                    <th className="league-result-table-name">팀 이름</th>
                    <th className="league-result-table-score">획득 점수</th>
                  </tr>
                </thead>
                <tbody className="league-result-table-tbody">
                  {langk.map((value, index) => (
                    <RankTableComponent
                      key={index}
                      rankData={value}
                      isYou={value.name === teamName}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="league-result-team-graph-box">
              <BarChart data={teamData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeagueResult;
