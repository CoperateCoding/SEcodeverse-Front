import "../../css/league/LeagueQuestionPopup.css";
import React, { useState } from 'react';
import axios from 'axios';
const LeagueQuestionPopup = ({
  isSubmitted,
  onQuestionClick,
  onSubmitClick,
  detailQuestion,
  questionPk
}) => {
  const [answer, setAnswer] = useState(""); // textarea 값 상태 관리

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value); // textarea 값 변경 시 상태 업데이트
  };

  const handleSubmit =() => {
    axios
        .post(`${process.env.REACT_APP_DB_HOST}/api/v1/ctf/question/${questionPk}/solve`,{
          answer:answer
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
          
        })
        .then((response) => {
          console.log("문제 풀기 성공", response.data)
        })
        .catch((error) => {
          console.error("문제 풀기 실패",error);
        });
    onSubmitClick()
  }
  return (
    <div className="league-question-container">
      <div className="league-question-wrapper">
        <div className="league-question-top-wrapper">
          <span className="league-question-title">
            {detailQuestion.questionName}
          </span>
          <div
            className="league-question-cancel-img"
            onClick={onQuestionClick}
          ></div>
        </div>
        <div className="league-question-middle-wrapper">
          <div className="league-question-description">
            {detailQuestion.imgUrlList &&
              detailQuestion.imgUrlList.map((value, index) => (
                <img src={value} alt="대충 이미지" key={index} />
              ))}
            <p style={{whiteSpace:'pre-line'}}>{detailQuestion.description}</p>
            {/* <p>
              Proin et justo et elit bibendum luctus at in nisl. Maecenas
              tristique, leo eu dignissim feugiat, urna turpis ullamcorper
              felis, nec hendrerit odio risus eu tellus. Suspendisse eu augue
              vel quam tincidunt dignissim. Nullam convallis, ex nec fermentum
              pellentesque, velit lacus iaculis velit, vel fermentum mi lacus et
              justo.
            </p> */}
          </div>
        </div>
        {!isSubmitted && (
          <div className="league-question-bottom-wrapper">
             <textarea
              className="league-question-answer"
              placeholder="답안을 입력하세요."
              value={answer}
              onChange={handleAnswerChange} // textarea 값 변경 시 이벤트 핸들러 호출
            ></textarea>
             <button className="league-question-submit" onClick={handleSubmit}>
              제출
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueQuestionPopup;
