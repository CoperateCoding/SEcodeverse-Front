import RecommendComponent from "../mypage/RecommendComponent";
import "../../css/FailResult.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";

const FailResult = ({ onClose, value, code, fianlSimilarQuestion}) => {
  // 괄호 수정
  // 유사문제 추천 관련
  // const questionData = [
  //   { pk: 1, title: "유사문제 1", img: "" },
  //   { pk: 2, title: "유사문제 2", img: "" },
  //   { pk: 3, title: "유사문제 3", img: "" },
  //   { pk: 4, title: "유사문제 4", img: "" },
  //   { pk: 5, title: "유사문제 5", img: "" },
  // ];
  const [question, setQuestion] = useState([]);
  const [aiReview, setAIreview] = useState("");
  const [isReview, setIsReview] = useState(false);

  const onClick = () => {
    console.log(value);
    console.log(fianlSimilarQuestion)
    console.log(code)
  };
  useEffect(() => {
    console.log(value)
  }, []);

  const onClickReview =  () => {

    // console.log(code)
    // console.log("넘어온 SIMILARqUESTION",fianlSimilarQuestion)
    const apiUrl =`${process.env.REACT_APP_DB_HOST}`+ "/api/v1/chatbot/codeReview";
    axios
      .post(
        apiUrl,
        {
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("ai 조언", response.data);
        setAIreview(response.data.response);
      })
      .catch((error) => {
        // 에러 처리
        console.error("ai조언중 에러남", error);
      });
      setIsReview(true);
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
                <td className="fail-comment-ai">
                  {!isReview && (
                    <button
                      className="ai-review-button"
                      onClick={onClickReview}
                    >
                      조언보기
                    </button>
                  )}
                  {isReview && 
                  (<>{aiReview}</>)}
                  
                </td>
                <td className="fail-comment-similar">
                {fianlSimilarQuestion && fianlSimilarQuestion.map((question) => (
                    <RecommendComponent key={question.pk} question={question} />
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
