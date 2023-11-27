import React, { useState } from "react";
import "../../css/AdminCTFQuestion.css";
import "../../css/AdminCTFEnrollQuestion.css";
import QuestionTableComponent from "./QuestionTableComponent";

const CTFquestion = () => {
  const [isCreateQuestion, setIsCreateQuestion] = useState(false);
  const [popupTitle, setPopupTitle] = useState("CTF 리그 문제 등록");

  const toggleModifyQuestion = () => {
    setIsCreateQuestion(!isCreateQuestion);
    setPopupTitle("CTF 리그 문제 수정");
  };

  const toggleCreateQuestion = () => {
    setIsCreateQuestion(!isCreateQuestion);
    // const data={
    //   nane:
    // }
    // axios
    //     .post("/api/v1/board", data, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("access")}`,
    //       },
    //     })
    //     .then((response) => {
    //       console.log(localStorage.getItem("access"));
    //       console.log(response.data);
    //       navigate("/community");
    //     })

    // .catch((error) => {
    //   console.error("API 호출 중 에러:", error);
    // });
    // setPopupTitle("CTF 리그 문제 등록");
  }


  // accrodian
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const changeOrder = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 옵션을 선택한 후 아코디언을 닫음
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    console.log("selectedFiles", selectedFiles);
  };

  return (
    <>
      <div className="admin-main-board-right">
        <div className="admin-question-board-wrapper">
          <h1 className="admin-question-board-rightMain">CTF 문제 관리</h1>
          <div className="admin-question-board-topBar">
            <div name="admin-question-board-category-accordion-wrap">
              <div
                className="admin-question-accordion-header"
                onClick={toggleAccordion}
              >
                <sapn className="ctf-question-board-search-order-text">
                  {selectedOption}
                </sapn>
                <sapn className="ctf-question-board-search-order-icon">
                  {isOpen ? "▲" : "▼"}
                </sapn>
              </div>
              {isOpen && (
                <div className="ctf-question-accordion-content">
                  <div
                    className="ctf-question-board-search-order-text "
                    onClick={() => changeOrder("최신순")}
                  >
                    최신순
                  </div>
                  <div
                    className="ctf-question-board-search-order-text "
                    onClick={() => changeOrder("점수높은순")}
                  >
                    점수높은순
                  </div>
                  <div
                    className="ctf-question-board-search-order-text "
                    onClick={() => changeOrder("점수낮은순")}
                  >
                    점수낮은순
                  </div>
                </div>
              )}
            </div>
            <div className="admin-question-board-create-question">
              <span onClick={toggleCreateQuestion}>
                문제 생성
              </span>
            </div>
          </div>
          <div className="admin-question-board-table">
            <table className="admin-question-table">
              <thead>
                <tr>
                  <th className="admin-question-table-number">No.</th>
                  <th className="admin-question-table-name">문제 이름</th>
                  <th className="admin-question-table-score">점수</th>
                  <th className="admin-question-table-category">카테고리</th>
                  <th className="admin-question-table-modify"></th>
                  <th className="admin-question-table-delete"></th>
                </tr>
              </thead>
              <tbody>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
                <QuestionTableComponent isCreateQuestion={isCreateQuestion} toggleCreateQuestion={toggleModifyQuestion}/>
              </tbody>
            </table>
          </div>
          <h1 className="admin-question-paging">1 2 3 4 5</h1>
        </div>
        {isCreateQuestion && (
          <div className="ctf-question-edit-popup-container">
            <div className="ctf-question-edit-popup-wrapper">
              <div className="ctf-question-edit-popup-title-box">
                <span className="ctf-question-edit-popup-title">{popupTitle}</span>
                <div
                  className="ctf-question-edit-popup-cancel"
                  onClick={toggleCreateQuestion}
                ></div>
              </div>
              <div className="ctf-question-edit-popup-contents-box">
                <div className="ctf-question-edit-popup-contents-title-box">
                  <span className="ctf-question-edit-popup-contents-title">
                    문제 이름
                  </span>
                  <input
                    className="ctf-question-edit-popup-contents-title-input"
                    type="text"
                  />
                </div>
                <div className="ctf-question-edit-popup-contents-middle-box">
                  <span className="ctf-question-edit-popup-contents-score">
                    문제 점수
                  </span>
                  <input
                    className="ctf-question-edit-popup-contents-score-input"
                    type="number"
                  />
                  <span className="ctf-question-edit-popup-contents-category">
                    카테고리
                  </span>
                  <select>
                    <option value="">컴퓨터 네트워크</option>
                    <option value="">웹</option>
                    <option value="">자료구조</option>
                    <option value="">SQL</option>
                    <option value="">JSP</option>
                    <option value="">컴퓨터 언어</option>
                    <option value="">운영체제</option>
                    <option value="">인공지능</option>
                    <option value="">UML</option>
                    <option value="">IoT</option>
                    <option value="">모바일</option>
                    <option value="">정보보안</option>
                    <option value="">빅데이터</option>
                    <option value="">기초지식</option>
                    <option value="">데이터베이스</option>
                  </select>
                  <span className="ctf-question-edit-popup-contents-radio">
                    객관식
                  </span>
                  <input
                    className="ctf-question-edit-popup-contents-radio-option"
                    type="radio"
                    value="objective"
                  />
                  <span className="ctf-question-edit-popup-contents-radio">
                    주관식
                  </span>
                  <input
                    className="ctf-question-edit-popup-contents-radio-option"
                    type="radio"
                    value="subjective"
                  />
                </div>
                <div className="ctf-question-edit-popup-contents-description-box">
                  <span className="ctf-question-edit-popup-contents-description">
                    문제 설명
                  </span>
                  <textarea className="ctf-question-edit-popup-contents-description-input" />
                </div>
                <div className="ctf-question-edit-popup-contents-answer-box">
                  <span className="ctf-question-edit-popup-contents-answer">
                    문제 답안
                  </span>
                  <textarea className="ctf-question-edit-popup-contents-answer-input" />
                </div>
                <div className="ctf-question-edit-popup-contents-img-box">
                  <input
                    className="ctf-question-edit-popup-contents-input-file"
                    type="file"
                    accept="image/jpg, image/png, image/jpeg"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                <div className="ctf-question-edit-popup-contents-button-wrapper">
                  <div className="ctf-question-edit-popup-contents-button" onClick={toggleCreateQuestion}>확인</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CTFquestion;
