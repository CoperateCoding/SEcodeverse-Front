import "../../css/QuestionDetail.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessResult from "./SuccessResult";
import FailResult from "./FailResult";
// import { resolveObjectKey } from "chart.js/dist/helpers/helpers.core";

const QuestionDetail = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const { questionPk } = useParams();
  const [question, setQuestion] = useState([]);
  const [img, setImg] = useState([]);
  const [testcase, setTestcase] = useState([]);
  const [code, setCode] = useState(`public class Main {
    public static void main(String args[]) {
      System.out.println("Hello SEcodeVerse!");
    }
}`);
  const [result, setResult] = useState("");

  const [isPopup, setIsPopup] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    console.log(questionPk);
    console.log("pk", questionPk);
    const apiUrl = `/api/v1/question/${questionPk}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("처음 문제 정보", response.data);
        setQuestion(response.data.question);
        setImg(response.data.img);
        setTestcase(response.data.testCase);
      })
      .catch((error) => {
        console.error("처음 문제 정보 가져오는 중 에러남:", error);
      });
  }, []);

  const handleExecuteCode = () => {
    const FormattedCode = code.replace(/\n/g, "\\n");

    const apiUrl = "/api/v1/question/solveQuestion";

    const params = new URLSearchParams();
    params.append("userCode", FormattedCode);
    params.append("languageNum", "2");

    axios
      .get(apiUrl, { params })
      .then((response) => {
        const result = response.data;
        // 결과 처리 로직 작성
        console.log(result);
      })
      .catch((error) => {
        console.error("문제 푸는 페이지에서 에러남", error);
      });
  };

  // 사용 예시

  //   const handleExecuteCode = async () => {

  //     const apiUrl = '/api/v1/question/solveQuestion';
  // console.log("보내기 전 코드 확인", code);

  // const params = {
  //   // userCode: "public class Main{\n    public static void main(String[] args){\n    System.out.println(1);\n}\n}",
  //   userCode:code,
  //   languageNum: 1
  // };

  // const queryString = Object.entries(params)
  //   .map(([key, value]) => `${key}=${value}`)
  //   .join('&');

  // const url = `${apiUrl}?${queryString}`;
  // console.log(params)
  // axios
  //   .get(url)
  //   .then((response) => {
  //     setResult(response.data);
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error('문제 푸는 페이지에서 에러남', error);
  //   });
  //     // try {
  //     //   // 여기에 코드 실행을 위한 백엔드 API 호출 또는 클라이언트 내 실행 로직 추가
  //     //   // 예: 백엔드 API 호출
  //     //   const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
  //     //     method: "POST",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //     body: JSON.stringify({ code, language: selectedLanguage }),
  //     //   });

  //     //   // 결과 처리
  //     //   const resultData = await response.json();
  //     //   setResult(resultData.result);
  //     // } catch (error) {
  //     //   console.error("Error executing code:", error);
  //     //   setResult(`Error: ${error.message}`);
  //     // }
  //   };

  const getCodeLines = () => {
    const lines = code.split("\n");
    console.log(lines);
    return lines.map((line, index) => (
      <div key={index} style={{ whiteSpace: "pre-wrap" }}>
        <span style={{ marginRight: "8px" }}>{index + 1}</span>
        {line}
      </div>
    ));
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleChangeLanguage = () => {
    const languageCodeMap = {
      Java: "public class Main {\n  public static void main(String args[]) {\n  System.out.println(1);\n }\n}",
      Python: "print(1)",
      C: `#include <stdio.h>\n
int main() {
    printf("Hello SEcodeVerse!");
    return 0;
}`,
      "C++": `#include <iostream>
using namespace std;\n
int main() {
    cout << "Hello SEcodeVerse!" << endl;
    return 0;
}`,
    };

    // 각 언어 순환
    const languages = ["Java", "Python", "C", "C++"];
    const currentIndex = languages.indexOf(selectedLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setSelectedLanguage(languages[nextIndex]);
    setCode(languageCodeMap[languages[nextIndex]]);
  };

  const handleResetCode = () => {
    // 여기에서 초기화를 위한 코드를 추가
    // 여기에서 언어를 'Java'로 초기화하고 해당 언어에 맞는 코드로 설정
    setResult("");
    setSelectedLanguage("Java");
    setCode(`public class Main {
  public static void main(String args[]) {
    System.out.println("Hello SEcodeVerse!");
  }
}`);
  };

  return (
    <section>
      <div className="question-detail-total-container">
        <div className="question-detail-total-wrapper">
          <div className="question-detail-upper-contents-wrapper">
            <div className="question-detail-star-box">
              <span className="question-detail-question-level">
                {question.levelPk}
              </span>
            </div>
            <div className="question-detail-text-box">
              <span className="question-detail-question-name">
                {question.title}
              </span>
              <span className="question-detail-question-description">
                {question.intro}
              </span>
            </div>
          </div>
          <div className="question-detail-middle-contents-wrapper">
            <div className="question-detail-left-contents-wrapper">
              <div className="question-detail-code-box">
                <div className="question-detail-code-bar">
                  <span className="question-detail-code-text-bar">
                    Solution
                  </span>
                  <select
                    className="question-detail-code-select-bar"
                    value={selectedLanguage}
                    onChange={handleChangeLanguage}
                  >
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                  </select>
                </div>

                <div
                  className="question-detail-code-area"
                  style={{ display: "flex", width: "100%" }}
                >
                  <div className="question-detail-code-line">
                    {getCodeLines().map((line, index) => (
                      <div key={index}>{index + 1}</div>
                    ))}
                  </div>
                  <textarea
                    className="question-detail-code-text-area"
                    value={code}
                    onChange={handleCodeChange}
                  />
                </div>
              </div>
              <div className="question-detail-result-box">
                <span className="question-detail-result-text-bar">
                  실행 결과
                </span>
                <div className="question-detail-show-result">{result}</div>
              </div>
            </div>
            <div className="question-detail-right-contents-wrapper">
              <div className="question-detail-description-box">
                <span className="question-detail-description-text-bar">
                  문제 설명
                </span>
                <div className="question-detail-description-text-content">
                  {question.content}
                </div>
              </div>
            </div>
          </div>
          <div className="question-detail-bottom-contents-wrapper">
            <div
              className="question-detail-button-result-check"
              onClick={() => setIsPopup(!isPopup)}
            >
              채점 결과 확인
            </div>
            <div
              className="question-detail-button-execute-code"
              onClick={handleExecuteCode}
            >
              코드 실행
            </div>
            <div
              className="question-detail-button-change-language"
              onClick={handleChangeLanguage}
            >
              {selectedLanguage}
            </div>
            <div
              className="question-detail-button-reset-code"
              onClick={handleResetCode}
            >
              초기화
            </div>
          </div>
        </div>
      </div>
      {isPopup && isSuccess && <SuccessResult onClose={() => setIsPopup(!isPopup)}/>}
      {isPopup && !isSuccess && <FailResult onClose={() => setIsPopup(!isPopup)}/>}
    </section>
  );
};

export default QuestionDetail;
