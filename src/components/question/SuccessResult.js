import "../../css/SuccessResult.css";
import RecommendComponent from "../mypage/RecommendComponent";
import React, { useState,useEffect } from "react";
import axios from 'axios'
const SuccessResult = ({ onClose, value, similar }) => {

  const [question,setQuestion] = useState();
    //유사문제 추천 관련
  const questionData = [
    { pk: 1, title: "유사문제 1", img: "" },
    { pk: 2, title: "유사문제 2", img: "" },
    { pk: 3, title: "유사문제 3", img: "" },
    { pk: 4, title: "유사문제 4", img: "" },
    { pk: 5, title: "유사문제 5", img: "" },
  ];
  
  useEffect(() => {
    let data =[]
    console.log("similar잘 받았니?",similar.response)
    console.log("similar길이는",similar.response.length)
    for(let i=0;i<similar.response.length;i++){
      console.log("배열 들어옴")
      const questionPk=similar.response[i]
      console.log("문제 상세조회에서 questionPk는",questionPk)
      const apiUrl = `/api/v1/question/detail/${questionPk}`;
      axios.get(apiUrl)
      .then(response => {
       
        console.log("response=",response.data)
        const value ={pk:response.data.question.pk,
                      title:response.data.question.title,
                      levelPk:response.data.question.levelPk
        }
        data.push(value)
    
      })
      .catch(error => {
        console.error('상세조회에서 호출 중 에러:', error);
      });
    }
    
    console.log("data= ",data)

  }, []);

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
                <td className="success-comment-ai">ai 조언</td>
                <td className="success-comment-similar">
                    {questionData.map((value, index) => (
                      <RecommendComponent key={index} question={value}  />
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
