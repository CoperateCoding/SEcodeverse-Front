import "../../css/QuestionDetail.css";
import React, { useState, useEffect } from "react";

const QuestionDetail = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  const [code, setCode] = useState(`public class Main {
    public static void main(String args[]) {
      System.out.println("Hello SEcodeVerse!");
    }
}`);
  const [result, setResult] = useState("");

  const handleExecuteCode = async () => {
    try {
      // 여기에 코드 실행을 위한 백엔드 API 호출 또는 클라이언트 내 실행 로직 추가
      // 예: 백엔드 API 호출
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language: selectedLanguage }),
      });

      // 결과 처리
      const resultData = await response.json();
      setResult(resultData.result);
    } catch (error) {
      console.error("Error executing code:", error);
      setResult(`Error: ${error.message}`);
    }
  };

const getCodeLines = () => {
  const lines = code.split('\n');
  console.log(lines)
  return lines.map((line, index) => (
    <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
      <span style={{ marginRight: '8px' }}>{index + 1}</span>
      {line}
    </div>
  ));
};

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleChangeLanguage = () => {
    const languageCodeMap = {
      Java: `public class Main {
    public static void main(String args[]) {
      System.out.println("Hello SEcodeVerse!");
    }
}`,
      Python: `print("Hello SEcodeVerse!")`,
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
              <span className="question-detail-question-level">Lv 5</span>
            </div>
            <div className="question-detail-text-box">
              <span className="question-detail-question-name">문제 이름</span>
              <span className="question-detail-question-description">
                문제 설명
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
                  style={{ display: "flex",
                  width: "100%"}}
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
                  문제 설명 넣어주세욤
                </div>
              </div>
            </div>
          </div>
          <div className="question-detail-bottom-contents-wrapper">
            <div className="question-detail-button-result-check">
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
    </section>
  );
};

export default QuestionDetail;
