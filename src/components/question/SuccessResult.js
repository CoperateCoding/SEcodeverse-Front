import "../../css/SuccessResult.css";
import RecommendComponent from "../mypage/RecommendComponent";

const SuccessResult = ({ onClose }) => {
    //유사문제 추천 관련
  const questionData = [
    { pk: 1, title: "유사문제 1", img: "" },
    { pk: 2, title: "유사문제 2", img: "" },
    { pk: 3, title: "유사문제 3", img: "" },
    { pk: 4, title: "유사문제 4", img: "" },
    { pk: 5, title: "유사문제 5", img: "" },
  ];

  return (
    <div className="success-container">
      <div className="success-wrapper">
        <div className="success-top-wrapper">
          <span className="success-title">SUCCESS!!</span>
          <div className="success-img"></div>
          <div className="success-cancel-img" onClick={onClose}></div>
        </div>
        <div className="success-middle-wrapper">
          <table className="success-result-table">
            <thead className="success-result-table-thead">
              <tr className="success-result-table-title">
                <th colSpan="4">채점현황</th>
              </tr>
              <tr className="success-result-table-label">
                <th>실행결과</th>
                <th>실행시간</th>
                <th>메모리</th>
                <th>언어</th>
              </tr>
            </thead>
            <tbody className="success-result-table-tbody">
              <tr>
                <td>성공!</td>
                <td>ms</td>
                <td>KB</td>
                <td>Java</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="success-bottom-wrapper">
          <table className="success-comment-table">
            <thead className="success-comment-thead">
              <tr>
                <th>AI의 조언</th>
                <th>유사문제 추천</th>
              </tr>
            </thead>
            <tbody className="success-comment-tbody">
              <tr>
                <td className="success-comment-ai">ai 조언</td>
                <td className="success-comment-similar">
                    {questionData.map((value, index) => (
                      <RecommendComponent key={index} question={value} />
                    ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuccessResult;
