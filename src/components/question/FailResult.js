import RecommendComponent from "../mypage/RecommendComponent";
import "../../css/FailResult.css";
import React, { useState, useEffect, similar } from "react";
import axios from "axios";

const FailResult = ({ onClose, value, code, similar}) => {
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
  };
  useEffect(() => {
    // console.log("similar 잘 받았니?", similar.response);
    // console.log("similar 길이는", similar.response.length);

    // // 비동기 요청을 위한 배열
    // const requests = [];

    // for (let i = 0; i < 5; i++) {
    //   console.log("배열 들어옴");
    //   const questionPk = similar.response[i];
    //   console.log("문제 상세조회에서 questionPk는", questionPk);
    //   const apiUrl = `/api/v1/question/detail/${questionPk}`;

    //   // 비동기 요청을 배열에 추가
    //   requests.push(axios.get(apiUrl));
    // }

    // // 모든 비동기 요청이 완료된 후에 처리
    // Promise.all(requests)
    //   .then((responses) => {
    //     const questions = responses.map((response) => ({
    //       pk: response.data.question.pk,
    //       title: response.data.question.title,
    //       levelPk: response.data.question.levelPk,
    //     }));

    //     console.log("questions = ", questions);
    //     setQuestion(questions);
    //   })
    //   .catch((error) => {
    //     console.error("상세조회에서 호출 중 에러:", error);
    //   });
  }, []);

  const onClickReview = () => {
    setIsReview(true);
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
    // await sleep(50000);
  };

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
                  {/* {question.map((value, index) => (
                    <RecommendComponent key={index} question={value} />
                  ))} */}
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
