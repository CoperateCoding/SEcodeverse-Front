import React from "react";
import "../../css/league/LeagueResult.css";
import BarChart from "./BarChart";
import RankTableComponent from "./RankTableComponent";

const LeagueResult = () => {
  //Close 상태 및 시간 지났을 때만 열리는걸로 처리. (useEffect 사용)

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
  
  //categoryLabels는 카테고리 모음. 이거는 프론트에서 입력한 값으로 해도 될듯함

  const categoryDatas = [0, 10, 0, 15, 0, 0, 5, 0, 5, 5, 5, 0, 0, 0, 10];
  //categoryLabels의 카테고리 당 팀에서 획득한 점수

  const teamLables = ["팀7", "팀1", "팀2", "팀3", "팀4", "팀5"];
  //teamLabels 배열에서는 index 0에서는 본인팀이 와야하고, 이후 index 1~5까지는 점수 높은 순

  const teamDatas = [40, 100, 90, 80, 70, 60];
  //각 team이 획득한 점수 (위의 teamLabel 순서)

  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        data:categoryDatas,
        backgroundColor: "rgba(180, 200, 230, 0.7)",
      },
    ],
  };
  
  const teamData = {
    labels: teamLables,
    datasets: [
      {
        data : teamDatas,
        backgroundColor: "rgba(180, 200, 230, 0.7)",
      },
    ],
  };

  const rankData = [
    { rank: 1, teamName: "팀1", score: 100 },
    { rank: 2, teamName: "팀2", score: 90 },
    { rank: 3, teamName: "팀3", score: 80 },
    { rank: 4, teamName: "팀4", score: 70 },
    { rank: 5, teamName: "팀5", score: 60 },
    { rank: 6, teamName: "팀6", score: 50 },
    { rank: 7, teamName: "팀7", score: 40 },
    { rank: 8, teamName: "팀8", score: 30 },
    { rank: 9, teamName: "팀9", score: 20 },
    { rank: 10, teamName: "팀10", score: 10 },
  ];
  //모든 팀의 순위, 이름, 획득한 점수

  const userTeamName = "팀7";
  //현재 내가 속한 팀의 이름

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
                  {rankData.map((value, index) => (
                    <RankTableComponent key={index}
                    rankData={value}
                    isYou={value.teamName === userTeamName}
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
