import LevelImage from "./LevelImage";
import { Link, useNavigate } from "react-router-dom";

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
            {question.categoryName}
          </td>
        </tr>
      ))}
    </>
  );
};

export default QuestionTableComponent;
