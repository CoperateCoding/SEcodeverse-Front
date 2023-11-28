import "../../css/league/TeamView.css";

const TeamView = ({ handlePopup, handleWithdraw }) => {
    
    //팀 정보
  const teamName = "세종대왕";
  const members = [
    { nickName: "가가" },
    { nickName: "나나" },
    { nickName: "다다" },
    { nickName: "라라" },
  ];

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
          <span>팀 이름 : </span>
          <div>{teamName}</div>
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
                {members.map((value, index) => (
                  <tr>
                    <td>{index+1}</td>
                    <td>{value.nickName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="join-team-popup-bottom-box">
        <div className="withdraw-team-button" onClick={handleWithdraw}>
          탈퇴하기
        </div>
        <div className="join-team-popup-check-button" onClick={handlePopup}>
          확인
        </div>
        <join className="join-team-popup-cancel-button" onClick={handlePopup}>
          취소
        </join>
      </div>
    </div>
  );
};

export default TeamView;
