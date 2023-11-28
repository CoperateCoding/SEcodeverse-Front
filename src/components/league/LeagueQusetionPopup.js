const LeagueQuestionPopup = () => {
  return (
    <div className="league-question-container">
      <div className="league-question-wrapper">
        <div className="league-question-top-wrapper">
          <span className="league-question-title">문제이름</span>
          <div className="league-question-cancel-img"></div>
        </div>
        <div className="league-question-middle-wrapper">
          <div className="league-question-description"></div>
          <div className="league-question-answer"></div>
        </div>
        <div className="league-question-bottom-wrapper">
          <button className="league-question-submit"></button>
        </div>
      </div>
    </div>
  );
};


export default LeagueQuestionPopup;