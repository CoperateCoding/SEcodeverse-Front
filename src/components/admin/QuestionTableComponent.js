import axios from 'axios'
const QuestionTableComponent = ({ value, isCreateQuestion, toggleCreateQuestion }) =>{
  const deleteQuestion =() => {
    axios
      .delete(`${process.env.REACT_APP_DB_HOST}/api/v1/admin/ctf/question/${value.questionPk}`,  {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("ctf 문제 삭제 중:", error);
      });
  }
    return(
        <tr>
                <th className="question-number">{value.questionPk}</th>
                <th className="question-name">{value.questionName}</th>
                <th className="question-score">{value.score}</th>
                <th className="question-category">{value.categoryName}</th>
                <th className="admin-question-table-modify" onClick={toggleCreateQuestion}>
                  <div className="admin-question-table-modify-img"></div>
                </th>
                <th className="admin-question-table-delete">
                  <div className="admin-question-table-delete-img" onClick={deleteQuestion}></div>
                </th>
              </tr>
    );
}

export default QuestionTableComponent;
