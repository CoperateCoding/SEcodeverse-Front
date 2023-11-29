import LevelImage from "./LevelImage";
import { Link, useNavigate } from "react-router-dom";
function getCategroy(num) {
  if (num == 1) {
    return "자료구조";
  } else if (num == 2) {
    return "웹프로그래밍";
  } else if (num == 3) {
    return "자바프로그래밍";
  } else if (num == 4) {
    return "데이터베이스";
  } else if (num == 5) {
    return "c++";
  } else if (num == 6) {
    return "python";
  }
}
const QuestionTableComponent = ({ questions }) => {
  const navigate = useNavigate();

  console.log("넘어온데이터는", questions);
  const onClick = (pk) => {
    navigate(`/question/detail/${pk}`);
  };
  return (
    <>
      {questions.map((question) => (
        <tr
          key={question.number}
          onClick={() => {
            onClick(question.pk);
          }}
        >
          <td className="mainPage-question-name">{question.title}</td>
          <td className="mainPage-question-writer">{question.userName}</td>
          <td className="mainPage-question-grade">{question.levelPk}</td>
          <td className="mainPage-question-category">
            {getCategroy(question.categoryPk)}
          </td>
        </tr>
      ))}
    </>
  );
};

export default QuestionTableComponent;
