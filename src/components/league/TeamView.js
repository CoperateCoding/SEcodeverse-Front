import "../../css/league/TeamView.css";
import { useState, useEffect } from "react";

const TeamView = ({ handlePopup, handleWithdraw, teams}) => {
  useEffect(() => {
    console.log("넘어온 팀", teams);

  }, [teams]);

  return (
    <div className="view-team-popup-container">
      <div className="view-team-popup-upper-box">
        <div className="view-team-popup-title">
          <span>CTF 리그 팀 조회하기</span>
        </div>
        <div className="view-team-popup-cancel" onClick={handlePopup}></div>
      </div>
      <div className="view-team-popup-midle-box">
        <div className="view-team-popup-team-name-box">
          <span>팀 이름 : {teams && teams.name}</span>
        </div>
        <div className="view-team-popup-team-member-box">
          <div className="view-team-popup-team-member">
            <table className="view-team-popup-team-table">
              <thead>
                <tr>
                  <th className="team-member-count">No.</th>
                  <th className="team-member-nickName">닉네임</th>
                </tr>
              </thead>
              <tbody>
                {teams.memberList.map((value, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="join-team-popup-bottom-box">
        <div className="join-team-popup-check-button" onClick={handlePopup}>
          확인
        </div>
        <div className="join-team-popup-cancel-button" onClick={handlePopup}>
          취소
        </div>
      </div>
    </div>
  );
};

export default TeamView;
