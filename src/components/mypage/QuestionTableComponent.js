import LevelImage from "../LevelImage";
function getProperty(obj) {
  if(typeof obj == undefined){
    const value =obj
    return value
  }
  else{
    return obj
  }
}
const QuestionTableComponent = ({ questions }) => {
 
  return (
    <>
      {questions.map((question) => (
        <tr key={question.number}>
          <td className="mypage-question-number">{question.pk}</td>
          <td className="mypage-question-name">{question.title}</td>
          <td className="mypage-question-description">{question.intro}</td>
          <td className="mypage-question-grade"><LevelImage level={getProperty(question.levelPk)}/></td>
        </tr>
      ))}
    </>
  );
};

export default QuestionTableComponent;
