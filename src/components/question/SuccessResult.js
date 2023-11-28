import "../../css/SuccessResult.css";
import RecommendComponent from "../mypage/RecommendComponent";
import React, { useState,useEffect } from "react";
import axios from 'axios'
const SuccessResult = ({ onClose, value, code, similar }) => {
  // const [questionData, setQuestionData] = useState([]);
  const [question,setQuestion] = useState([ ]);
  const [aiReview,setAIreview]=useState('');
  // const questionData= [{ pk: 1, title: "유사문제 1", img: "" },
  // { pk: 2, title: "유사문제 2", img: "" },
  // { pk: 3, title: "유사문제 3", img: "" },
  // { pk: 4, title: "유사문제 4", img: "" },
  // { pk: 5, title: "유사문제 5", img: "" },]
// let question =[]

useEffect(() => {
  console.log("similar 잘 받았니?", similar.response);
  console.log("similar 길이는", similar.response.length);

  // 비동기 요청을 위한 배열
  const requests = [];

  for (let i = 0; i < 5; i++) {
    console.log("배열 들어옴");
    const questionPk = similar.response[i];
    console.log("문제 상세조회에서 questionPk는", questionPk);
    const apiUrl = `/api/v1/question/detail/${questionPk}`;

    // 비동기 요청을 배열에 추가
    requests.push(axios.get(apiUrl));
  }

  // 모든 비동기 요청이 완료된 후에 처리
  Promise.all(requests)
    .then((responses) => {
      const questions = responses.map((response) => ({
        pk: response.data.question.pk,
        title: response.data.question.title,
        levelPk: response.data.question.levelPk,
      }));

      console.log("questions = ", questions);
      setQuestion(questions);
    })
    .catch((error) => {
      console.error("상세조회에서 호출 중 에러:", error);
    });
    
  
}, []);
//조언보기 버튼에 연결해주세용 ~
const  onClick = () => {
      const apiUrl = '/api/v1/chatbot/codeReview';
    axios.post(apiUrl, {
      "code": code
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log("ai 조언", response.data);
      setAIreview(response.data.response)
    })
    .catch(error => {
      // 에러 처리
      console.error("ai조언중 에러남", error);
    });
    // await sleep(50000); 
}
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
           
  <tbody className="success-result-table-tbody" >
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
                <td className="success-comment-ai">{aiReview}</td>
                <td className="success-comment-similar">
                {question.map((question) => (
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
