import React from "react";
import "../../css/league/LeagueResult.css";
import BarChart from "./BarChart";

const LeagueResult = () => {
//BarChart를 위한 임시 데이터
  const categoryLabels = [
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

  const teamLables = ['내팀', '니팀', '니네팀', '너네팀', '상대팀', '너희팀'];

  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        data: [90, 10, 50, 15, 60, 80, 5, 10, 5, 5, 5, 5, 30, 45, 10],
        backgroundColor: 'rgba(180, 200, 230, 0.7)',
      },
    ],
  };

  const teamData = {
    labels: teamLables,
    datasets : [
      {
        data : [500, 255, 600, 800, 800, 700],
        backgroundColor: 'rgba(180, 200, 230, 0.7)',
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
            <BarChart  data={categoryData}/>
          </div>
          <div className="league-result-bottom-box">
            <div className="league-result-team-box">
              <table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th>팀 이름</th>
                    <th>획득 점수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>10</th>
                    <th>내팀</th>
                    <th>500</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="league-result-team-graph-box">
              <BarChart data={teamData}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeagueResult;
