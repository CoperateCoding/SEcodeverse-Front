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
  const [successResult , setSuccessResult] = useState({});
  const [code, setCode] = useState(`public class Main {
    public static void main(String args[]) {
      System.out.println("Hello SEcodeVerse!");
    }
}`);
  const [result, setResult] = useState("");
  
  const [isPopup, setIsPopup] = useState(false);
  const [isSuccess, setSuccess] = useState(true);
  const [ similar, setSimilar] = useState([]);
  useEffect(() => {
    console.log(questionPk);
    console.log("pk", questionPk);
    const apiUrl = `/api/v1/question/detail/${questionPk}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("처음 문제 정보", response.data);
        console.log("처음 문제 정보",response.data.question)
        console.log("처음 이미지 정보",response.data.img)
        console.log("처음 테스트케이스 정보",response.data.testCase)
        setQuestion(response.data.question);
        setImg(response.data.img);
        setTestcase(response.data.testCase);
      })
      .catch((error) => {
        console.error("처음 문제 정보 가져오는 중 에러남:", error);
      });
  }, []);
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [ai,setAI]=useState('')

  const compiler = async ()=> {
   
    const compileResult = []
    const TestcaseOutput=[]
    let totalmemory =0
    let totaltime =0
    let memory=0
    let time =0;
    let isSucess=true
    console.log("테스트 케이스 보내기 시작합니다.")
    console.log("테스트케이스의 길이는",testcase.length)
    for(let i=0; i<testcase.length; i++){
      console.log("배열들어옴 ")
      handleExecuteCode(testcase[i],compileResult)
      await sleep(5000);
      console.log("받아온 테스트케이스",testcase)
      console.log("보내는 테스트케이스2 ",testcase[i].pk, testcase[i].input)
    }
    await sleep(5000); 
    console.log("코드 모두 컴파일 후 "+ result)
    for(let i=0; i<testcase.length;i++){
      let str = testcase[i].output
      str = str.replace(/[!@#]|[*()]/g, "\n");
      TestcaseOutput.push(str)
    }
    console.log(compileResult)

    for(let i =0; i<compileResult.length ; i++){
      const line = compileResult[i].stdout
      console.log("line",line)
      const lines = line.split('\n');
      lines.pop(); 
      const result = lines.join('\n');
      if(result != TestcaseOutput[i]){
        isSucess=false
        console.log("내 코드 결과",result)
        console.log("내스트케이스 결과",TestcaseOutput[i])
      }
      totalmemory=totalmemory+compileResult[i].memory
      totaltime = totaltime+parseFloat(compileResult[i].time)
      console.log("parseInt한 값",parseFloat(compileResult[i].time))

    }

    memory =totalmemory/compileResult.length
    time =totaltime/compileResult.length
    setSuccessResult({memory:memory,time:time,lenguage:selectedLanguage})
    console.log("성공여부",isSucess)
    if(isSucess==true){
      setSuccess(true)
      
      
    }
    else{
      setSuccess(false)
    }
    await sleep(5000); 

  //   console.log("successResut",successResult)
  //   console.log("인공지능한테보내는 levelpk",question.levelPk)
  //   console.log("인공지능한테 보내는 카테고리 pk",question.categoryPk)
  // axios.get('/api/v1/chatbot/similary', {
  //     params: {
  //       levelPk :question.levelPk,
  //       categoryPk :question.categoryPk
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("access")}`,
  //     }
  //   })
  //   .then(response => {
  
  //     console.log("비슷한 문제 받아 왔음similarData", response)
  //     setSimilar(response.data)
  //   })
  //   .catch(error => {
  //     // 에러 처리
  //     console.error(error);
  //   });

  //   await sleep(10000)
    
  //   const apiUrl = `/api/v1/question/detail/${questionPk}`;
  //   //맞으면 1 틀리면 0
  //   const data={
  //     codeStatus:1,
  //     content:code,
  //     compileTime : time,
  //     memory:memory,
  //     accarcy:80

  //   }
  //   axios
  //   .post(apiUrl, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("access")}`,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(localStorage.getItem("access"));
  //     console.log(response.data);
  
  //   })
  //   .catch((error) => {
  //     console.error("API 호출 중 에러:", error);
  //   });

    setIsPopup(!isPopup)
  }

  const handleExecuteCode = (testcaseValue,compileResult) => {
    console.log("보내기 시도합니다")
    const FormattedCode = code.replace(/\n/g, '\n');
    const apiUrl = '/api/v1/question/solveQuestion';
    const params = new URLSearchParams();
    
    params.append("userCode", FormattedCode);
    params.append("languageNum","2");
    params.append("testcase",testcaseValue.input);

    console.log("보내는 테스트케이스",testcaseValue.input)

    axios
  .get(apiUrl, {
    params: params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  })
  .then((response) => {
    const result = response.data;
    console.log(result);
    compileResult.push(result);
  })
  .catch((error) => {
    console.log(localStorage.getItem('access'));
    console.error("문제 푸는 페이지에서 에러남", error);
  });
  };

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

  const handleChangeLanguage = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue)
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

    const languages = ["Java", "Python", "C", "C++"];
    // const currentIndex = languages.indexOf(selectedLanguage);
    // const nextIndex = (currentIndex + 1) % languages.length;

    // setSelectedLanguage(languages[nextIndex]);
    // setCode(languageCodeMap[languages[nextIndex]]);

    const selectedIndex = languages.indexOf(selectedValue);

  if (selectedIndex !== -1) {
    // 선택된 언어가 languages 배열에 있다면 코드를 설정
    setCode(languageCodeMap[languages[selectedIndex]]);
  }
  };

  const handleChangeNextLangue = () => {
    const languages = ["Java", "Python", "C", "C++"];
    const currentIndex = languages.indexOf(selectedLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;

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

    setSelectedLanguage(languages[nextIndex]);
    setCode(languageCodeMap[languages[nextIndex]]);
  }

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
            </div>
            <div className="question-detail-right-contents-wrapper">
              <div className="question-detail-description-box">
                <span className="question-detail-description-text-bar">
                  문제 설명
                </span>
                <div className="question-detail-description-text-content">
                {/* {isPopup && } */}
                  {question.content}
                </div>
              </div>
            </div>
          </div>
          <div className="question-detail-bottom-contents-wrapper">
            <div
              className="question-detail-button-result-check"
              onClick={compiler}
       
            >
              채점 결과 확인
            </div>
            <div
              className="question-detail-button-change-language"
              onClick={handleChangeNextLangue}
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
      {isPopup && isSuccess && <SuccessResult onClose={() => setIsPopup(false)} value ={successResult} />}
      {isPopup && !isSuccess && <FailResult onClose={() => setIsPopup(false)} value={successResult } />}
    </section>
  );
};

export default QuestionDetail;
