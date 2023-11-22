const QuestionTableComponent = ({ isCreateQuestion, toggleCreateQuestion }) =>{
    return(
        <tr>
                <th className="question-number"></th>
                <th className="question-name"></th>
                <th className="question-score"></th>
                <th className="question-category"></th>
                <th className="admin-question-table-modify" onClick={toggleCreateQuestion}>
                  <div className="admin-question-table-modify-img"></div>
                </th>
                <th className="admin-question-table-delete">
                  <div className="admin-question-table-delete-img"></div>
                </th>
              </tr>
    );
}

export default QuestionTableComponent;
