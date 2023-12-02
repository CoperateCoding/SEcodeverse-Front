const LeagueQuestionComponent = ({problem, onQuestionClick,isSubmitted }) => {
  return (
    <div className={`league-category-detail-question-box ${isSubmitted ? "submitted" : ""}`}
    onClick={onQuestionClick}>
      <span className="league-category-detail-question-name">{problem.questionName}</span>
      <span className="league-category-detail-question-score">{problem.score}점</span>
      <span className="league-category-detail-question-type">{problem.type}</span>
    </div>
  );
};

export default LeagueQuestionComponent;
