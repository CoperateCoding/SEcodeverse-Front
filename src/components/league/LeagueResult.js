import React from "react";
import "../../css/league/LeagueResult.css";
import BarChart from "./BarChart";

const LeagueResult = () => {
  return (
    <section>
      <div className="league-result-container">
        <div className="league-result-wrapper">
          <div className="league-result-title-box">
            <span>CTF 리그 결과 확인</span>
          </div>
          <div className="league-result-score-graph-box">

          </div>
          <div className="league-result-bottom-box">
            <div className="league-result-team-box"></div>
            <div className="league-result-team-graph-box">
                <BarChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeagueResult;
