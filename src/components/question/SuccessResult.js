import "../../css/SuccessResult.css";
import RecommendComponent from "../mypage/RecommendComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";
const SuccessResult = ({ onClose, value, code, fianlSimilarQuestion }) => {
  // const [questionData, setQuestionData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [aiReview, setAIreview] = useState("");
  const [isReview, setIsReview] = useState(false);


  useEffect(() => {
    console.log(value)
  }, []);
  
  //조언보기 버튼에 연결해주세용 ~
  const onClickReview = () => {
  

    const apiUrl = "/api/v1/chatbot/codeReview";
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
 
  };

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
                <td>{value.time} ms</td>
                <td>{value.memory} KB</td>
                <td>{value.lenguage}</td>
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
                <td className="success-comment-ai">
                  {!isReview && (
                    <button className="ai-review-button" onClick={onClickReview}>조언보기</button>
                  )}
                  {isReview && (
                    <>{aiReview}</>
                  )}
                </td>
                <td className="success-comment-similar">
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

export default SuccessResult;
