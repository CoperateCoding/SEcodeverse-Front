import React, { useEffect, useState } from "react";
import axios from 'axios';
const EditQuestion = ({onClose, question, img, testcaseArray}) => {

const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("c1");
  const [desc, setDesc] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [level, setLevel] = useState("l1");
  const [testDesc,setTestDesc]= useState('');

  console.log("컴포넌트 렌더링됨");
  console.log("문제 수정 열 때 테스트케이스", testcaseArray);


  useEffect(() => {
    const fetchData = async () => {
      
      setTitle(question.title);
      setDescription(question.intro);//한줄설명
      const c = "c" + question.categoryPk;
      setCategory(c);
      setDesc(question.content);//문제설명
      const l = "l" + question.levelPk;
      setLevel(l);
      setTestDesc(question.testcaseDescription);
    };
  
    fetchData();
  }, [question, testcaseArray]);
  


  const handleTypeChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTypeLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleSubmit = () => {
    console.log(category)
    console.log(level)
    const parseCategory = parseInt(category.replace(/[^\d]/g, ""));
    const parseLevel = parseInt(level.replace(/[^\d]/g, ""));
    const testCase1input =
      document.getElementsByClassName("testcase1input")[0].value;
    const testCase1output =
      document.getElementsByClassName("testcase1output")[0].value;
    const testCase2input =
      document.getElementsByClassName("testcase2input")[0].value;
    const testCase2output =
      document.getElementsByClassName("testcase2output")[0].value;
    const testCase3input =
      document.getElementsByClassName("testcase3input")[0].value;
    const testCase3output =
      document.getElementsByClassName("testcase3output")[0].value;
    console.log(parseCategory);
    console.log(parseLevel);
    console.log(testCase1input);
    console.log(testCase1output);
    console.log(testCase2input);
    console.log(testCase2output);
    console.log(testCase3input);
    console.log(testCase3output);
    console.log(title);
    console.log(desc);
    console.log(description);
    const testCase = [
      {
        input: testCase1input,
        output: testCase1output,
      },
      {
        input: testCase2input,
        output: testCase2output,
      },
      {
        input: testCase3input,
        output: testCase3output,
      },
    ];
    const data = {
      question: {
        categoryPk: parseCategory,
        levelPk: parseLevel,
        title: title,
        intro: description,
        content: desc,
        testcaseDescription:testDesc,
        language: "java/python/c++/c",
      },
      testCase,
    };
    axios
    .patch(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/question/${question.pk}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {

    })
    .catch((error) => {
      console.error("API 호출 중 에러:", error);
    });
    onClose();
    window.location.reload();
  };

  return (
    <div className="enroll-question-popup-container">
      <div className="enroll-question-popup-wrapper">
        <div className="enroll-question-popup-title-box">
          <span className="enroll-question-popup-title">문제 수정</span>
          <div
            className="enroll-question-popup-cancel"
            onClick={onClose}
          ></div>
        </div>
        <div className="enroll-question-popup-contents-box">
          <div className="enroll-question-popup-contents-title-box">
            <span className="enroll-question-popup-contents-title">제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="enroll-question-popup-contents-title-input"
              type="text"
            />
          </div>
          <div className="enroll-question-popup-contents-description-box">
            <span className="enroll-question-popup-contents-description">
              문제 한줄 설명
            </span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="enroll-question-popup-contents-description-input"
              type="text"
            />
          </div>
          <div className="enroll-question-popup-contents-category-box-wrapper">
            <div className="enroll-question-popup-contents-level-box">
              <span className="enroll-question-popup-contents-level">레벨</span>
              <select
                className="enroll-popup-select-level"
                value={level}
                onChange={handleTypeLevelChange}
              >
                <option value="l1">1</option>
                <option value="l2">2</option>
                <option value="l3">3</option>
                <option value="l4">4</option>
                <option value="l5">5</option>
                <option value="l6">6</option>
              </select>
            </div>
            <div className="enroll-question-popup-contents-category-box">
              <span className="enroll-question-popup-contents-category">
                / 카테고리
              </span>
              <select value={category} onChange={handleTypeChange}>
                <option value="c1">자료구조</option>
                <option value="c2">네트워크</option>
                <option value="c3">수학</option>
              </select>
            </div>
          </div>
          <div className="enroll-question-popup-contents-question-box">
            <span className="enroll-question-popup-contents-question">
              [문제 내용]
            </span>
            <span className="enroll-question-popup-contents-testcase">
              [테스트케이스 설명]
            </span>
            <span className="enroll-question-popup-contents-input-testcase">
              [테스트케이스 입력]
            </span>
            <div className="enroll-question-text-area-wrap">
              <textarea
                type="text"
                className="enroll-question-popup-contents-text-box"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <textarea
                type="text"
                className="enroll-question-popup-contents-testcase-box"
                value={testDesc}
                onChange={(e) => setTestDesc(e.target.value)}
              />
              <div className="enroll-question-test-case">
                <table className="enroll-question-test-case-table">
                  <thead className="enroll-question-test-case-thead">
                    <tr>
                      <th className="enroll-question-test-case-input">
                        입력 값
                      </th>
                      <th className="enroll-question-test-case-result">
                        결과 값
                      </th>
                    </tr>
                  </thead>
                  <tbody className="enroll-question-test-case-tbody">
                    <tr>
                      <td className="enroll-question-test-case-input">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 1 입력"
                          className="testcase1input"
                          value={testcaseArray[0].input}
                        ></textarea>
                      </td>
                      <td className="enroll-question-test-case-result">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 1 결과"
                          className="testcase1output"
                          value={testcaseArray[0].output}
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="enroll-question-test-case-input">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 2 입력"
                          className="testcase2input"
                          value={testcaseArray[1].input}
                        ></textarea>
                      </td>
                      <td className="enroll-question-test-case-result">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 2 결과"
                          className="testcase2output"
                          value={testcaseArray[1].output}
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="enroll-question-test-case-input">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 3 입력"
                          className="testcase3input"
                          value={testcaseArray[2].input}
                        ></textarea>
                      </td>
                      <td className="enroll-question-test-case-result">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 3 결과"
                          className="testcase3output"
                          value={testcaseArray[2].output}
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
           
          </div>
        </div>
        <div
          onClick={handleSubmit}
          className="enroll-question-popup-yes"
        >
          수정
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
