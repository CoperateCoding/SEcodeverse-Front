import RecommendComponent from "../mypage/RecommendComponent";
import "../../css/FailResult.css";

const FailResult = ({ onClose ,value }) => { // 괄호 수정
  // 유사문제 추천 관련
  const questionData = [
    { pk: 1, title: "유사문제 1", img: "" },
    { pk: 2, title: "유사문제 2", img: "" },
    { pk: 3, title: "유사문제 3", img: "" },
    { pk: 4, title: "유사문제 4", img: "" },
    { pk: 5, title: "유사문제 5", img: "" },
  ];
  const onClick=()=>{
    console.log(value)
  }

  return (
    <div className="fail-container">
      <div className="fail-wrapper">
        <div className="fail-top-wrapper">
          <span className="fail-title">Fail..</span>
          <div className="fail-img"></div>
          <div className="fail-cancel-img" onClick={onClose}></div>
        </div>
        <div className="fail-middle-wrapper">
          <table className="fail-result-table">
            <thead className="fail-result-table-thead">
              <tr className="fail-result-table-title">
                <th colSpan="4">채점현황</th>
              </tr>
              <tr className="fail-result-table-label">
                <th>실행결과</th>
                <th>실행시간</th>
                <th>메모리</th>
                <th>언어</th>
              </tr>
            </thead>
            <tbody className="fail-result-table-tbody" onClick={onClick}>
              <tr>
                <td>실패..</td>
                <td>{value.time}</td>
                <td>{value.memory}</td>
                <td>{value.lenguage}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="fail-bottom-wrapper">
          <table className="fail-comment-table">
            <thead className="fail-coh mment-thead">
              <tr>
                <th>AI의 조언</th>
                <th>유사문제 추천</th>
              </tr>
            </thead>
            <tbody className="fail-comment-tbody">
              <tr>
                <td className="fail-comment-ai">ai 조언</td>
                <td className="fail-comment-similar">
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

export default FailResult;
