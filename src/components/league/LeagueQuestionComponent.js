const LeagueQuestionComponent = ({problem}) => {
  return (
    <div className="league-category-detail-question-box">
      <span className="league-category-detail-question-name">{problem.name}</span>
      <span className="league-category-detail-question-score">{problem.score}점</span>
      <span className="league-category-detail-question-type">{problem.type}</span>
    </div>
  );
};

export default LeagueQuestionComponent;
