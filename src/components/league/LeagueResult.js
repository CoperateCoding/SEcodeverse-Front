import React from "react";
import "../../css/league/LeagueResult.css";
import BarChart from "./BarChart";
import RankTableComponent from "./RankTableComponent";

const LeagueResult = () => {
  //Close 상태 및 시간 지났을 때만 열리는걸로 처리. (useEffect 사용)

  //현재 내가 속한 팀의 pk
  const userTeam = 3;

  //BarChart를 위한 임시 데이터
  const teamDataArray = [
    { pk: 1, name: "teamName1", score: 5, rank: 10 },
    { pk: 2, name: "teamName2", score: 100, rank: 4 },
    { pk: 3, name: "teamName3", score: 200, rank: 3 },
    { pk: 4, name: "teamName4", score: 55, rank: 6 },
    { pk: 5, name: "teamName5", score: 85, rank: 5 },
    { pk: 6, name: "teamName6", score: 455, rank: 2 },
    { pk: 7, name: "teamName7", score: 40, rank: 7 },
    { pk: 8, name: "teamName8", score: 500, rank: 1 },
    { pk: 9, name: "teamName9", score: 45, rank: 9 },
    { pk: 10, name: "teamName10", score: 35, rank: 8 },
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

  const teamRankData = [];
  const userTeamIndex = teamDataArray.findIndex((team) => team.pk === userTeam);

  if (userTeamIndex === 0) {
    teamRankData.push(teamDataArray[userTeamIndex]);
  } else {
    const sortedTeams = teamDataArray.slice(1).sort((a, b) => a.rank - b.rank);
    teamRankData.push(teamDataArray[userTeamIndex], ...sortedTeams.slice(0, 5));
  }

  const categoryData = {
    labels: getTeamScore.map((item) => item.category),
    datasets: [
      {
        data: getTeamScore.map((item) => item.score),
        backgroundColor: "rgba(180, 200, 230, 0.7)",
      },
    ],
  };

  const teamData = {
    labels: teamRankData.map((item)=> item.name),
    datasets: [
      {
        data: teamRankData.map((item)=> item.score),
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
                  {teamDataArray.map((value, index) => (
                    <RankTableComponent
                      key={index}
                      rankData={value}
                      isYou={value.pk === userTeam}
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
