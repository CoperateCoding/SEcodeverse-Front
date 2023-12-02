import React, { useEffect, useState } from "react";
import "../../css/league/LeagueResult.css";
import BarChart from "./BarChart";
import RankTableComponent from "./RankTableComponent";
import axios from "axios";
const LeagueResult = () => {
  //Close 상태 및 시간 지났을 때만 열리는걸로 처리. (useEffect 사용)
  const [langk,setLank]= useState([])
  const [teamName,setTeamName] = useState('')
  const[categoryTeamQuestion,setCategoryTeamQuestion] = useState([])
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
            .post(
              `${process.env.REACT_APP_DB_HOST}/api/v1/ctf/team/category/scores`,{},
                
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

  //현재 내가 속한 팀의 pk
  const userTeam = 12;

  //BarChart를 위한 임시 데이터
  const teamDataArray = [
    { pk: 1, name: "teamName1", score: 15, rank: 10 },
    { pk: 2, name: "teamName2", score: 100, rank: 4 },
    { pk: 3, name: "teamName3", score: 200, rank: 3 },
    { pk: 4, name: "teamName4", score: 55, rank: 6 },
    { pk: 5, name: "teamName5", score: 85, rank: 5 },
    { pk: 6, name: "teamName6", score: 455, rank: 2 },
    { pk: 7, name: "teamName7", score: 40, rank: 7 },
    { pk: 8, name: "teamName8", score: 500, rank: 1 },
    { pk: 9, name: "teamName9", score: 45, rank: 9 },
    { pk: 10, name: "teamName10", score: 35, rank: 8 },
    { pk: 11, name: "teamName11", score: 5, rank: 11 },
    { pk: 12, name: "teamName12", score: 0, rank: 12 },
  ];

  //내 팀이 얻은 카테고리 별 점수
  const getTeamScore = [
    { category: "컴퓨터네트워크", score: 15 },
    { category: "웹", score: 10 },
    { category: "자료구조", score: 20 },
    { category: "SQL", score: 15 },
    { category: "JSP", score: 0 },
    { category: "컴퓨터언어", score: 0 },
    { category: "운영체제", score: 5 },
    { category: "인공지능", score: 0 },
    { category: "UML", score: 5 },
    { category: "IoT", score: 5 },
    { category: "모바일", score: 5 },
    { category: "정보보안", score: 0 },
    { category: "빅데이터", score: 0 },
    { category: "기초지식", score: 30 },
    { category: "데이터베이스", score: 10 },
  ];

  //위의 배열을 랭크순으로 정렬한 것
  const teamDataSorted = teamDataArray.slice().sort((a, b) => a.rank - b.rank);

  //랭크별 막대그래프
  const teamRankData = [];
  const sortedTeams = teamDataArray.slice(1).sort((a, b) => a.rank - b.rank);
  teamRankData.push(...sortedTeams.slice(0, 6));

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
        data: teamRankData.map((item) => item.score),
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
