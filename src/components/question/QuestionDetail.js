import "../../css/QuestionDetail.css";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessResult from "./SuccessResult";
import FailResult from "./FailResult";
import EditQuestion from "./EditQuestion";
// import { resolveObjectKey } from "chart.js/dist/helpers/helpers.core";
function formatTime(seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substr(11, 8);
  return timeString;
}

const QuestionDetail = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const { questionPk } = useParams();
  const [question, setQuestion] = useState([]);
  const [img, setImg] = useState([]);
  const [testcase, setTestcase] = useState([]);
  const [successResult , setSuccessResult] = useState({});
  const [isModify, setIsModify] = useState(false)
  const [code, setCode] = useState(`public class Main {
    public static void main(String args[]) {
      System.out.println("Hello SEcodeVerse");
    }
}`);
  const [result, setResult] = useState("");
  
  const [isPopup, setIsPopup] = useState(false);
  const [isSuccess, setSuccess] = useState(true);
  const [ similar, setSimilar] = useState([]);
  const similarQuestion =[]
  const [fianlSimilarQuestion, setFinalSimilarQuestion] = useState([])
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('roleType')==="ADMIN"){
      setIsModify(true)
    }
    console.log(questionPk);
    console.log("pk", questionPk);
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/question/detail/${questionPk}`;
    
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
      str = str.replace(/!@#/g, "\n");
      str= str.replace(/\*\(\)/g, "\n");
      TestcaseOutput.push(str)
    }
    console.log(compileResult)
    var wrongCount =0
    for(let i =0; i<compileResult.length ; i++){
      const line = compileResult[i].stdout
      console.log("line",line)
      if(line!="null"){ const lines = line.split('\n');
      console.log("lines",lines)
      lines.pop(); 
      const result = lines.join('\n');}
     
      if(result != TestcaseOutput[i]){
        isSucess=false
        console.log("내 코드 결과",result)
        console.log("내스트케이스 결과",TestcaseOutput[i])
        wrongCount+=1
      }
      totalmemory=totalmemory+compileResult[i].memory
      totaltime = totaltime+parseFloat(compileResult[i].time)
      console.log("parseInt한 값",parseFloat(compileResult[i].time))

    }

    memory =totalmemory/compileResult.length
    time =totaltime/compileResult.length
    const roundMemory = memory.toFixed(2);
    const roundtIME = time.toFixed(2);
    setSuccessResult({memory:roundMemory,time:roundtIME,lenguage:selectedLanguage})
    console.log("성공여부",isSucess)
    var seconds = 0.055;
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = (seconds % 3600) % 60;
    
    var timeString = hours.toString().padStart(2, '0') + ':' +
                     minutes.toString().padStart(2, '0') + ':' +
                     remainingSeconds.toFixed(3).padStart(6, '0');
    
    console.log(timeString);
    console.log(code)
    console.log(roundMemory)
    if(isSucess==true){
      setSuccess(true)
      const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/code/${questionPk}`;
      axios.post(apiUrl,{
        codeState : "TRUE",
        content : code,
        compileTime :timeString,
        memory:roundMemory,
        accuracy:100
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
        .then(response => {
          console.log(response.data)
       
        
        
        })
        .catch(error => {
          console.error('코드 저장 중 에러:', error);
        });


        const params = {
          questionPk: questionPk
        };
        
        const apiUrl2 = `${process.env.REACT_APP_DB_HOST}/api/v1/question/corret/exp`;
        
        axios.post(apiUrl2, null, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access")}`
          },
          params: params
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('코드 저장 중 에러:', error);
          });
    }
    else{
      setSuccess(false)
      const accuracyPercent = (testcase.length - wrongCount)/testcase.length
      console.log(accuracyPercent)
      const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/code/${questionPk}`;
      axios.post(apiUrl,{
        codeState : "FALSE",
        content : code,
        compileTime : timeString,
        memory:roundMemory,
        accuracy:100
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
        .then(response => {
          console.log(response.data)
       
        
        
        })
        .catch(error => {
          console.error('코드 저장 중 에러:', error);
        });
      
    }
    await sleep(5000); 
    let similarArr=[]
    try {
      const response = await axios.get(`${process.env.REACT_APP_DB_HOST}`+'/api/v1/chatbot/similary', {
        params: {
          levelPk: question.levelPk,
          categoryPk: question.categoryPk
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        }
      });
  
      console.log("비슷한 문제 받아 왔음similarData", response.data);
      setSimilar(response.data);
  
       similarArr = response.data.response;
       console.log("similarArrLenght:",similarArr.length)
 
  
      for (let i = 0; i < similarArr.length; i++) {
        try {
          console.log("for문 들어옴 " ,i)
          const similarItem = similarArr[i];
          const detailResponse = await axios.get(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/question/detail/${similarItem}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            }
          });
  
          console.log("비슷한 문제중 문제 하나 상세조회", detailResponse.data);

          similarQuestion.push({pk : detailResponse.data.question.pk ,
            level : detailResponse.data.question.levelPk,
          title : detailResponse.data.question.title
         });
        } catch (error) {
          console.error("비슷한 문제 상세조회 중 에러", error);
          similarQuestion.push(null);
        }
      }
  
      // 상세 정보를 처리하거나 저장할 수 있습니다.
      // 예를 들어, similarQuestions를 state에 저장하거나 처리할 수 있습니다.
    } catch (error) {
      console.error("비슷한 문제 받아오는 중 에러", error);
    }
    
   
    if(similarQuestion.length === similarArr.length){
      console.log("similRqUESTION",similarQuestion)
      setFinalSimilarQuestion(similarQuestion)
      setIsPopup(!isPopup)
    }


  }

  const handleExecuteCode = (testcaseValue,compileResult) => {
    console.log("보내기 시도합니다")
    const FormattedCode = code.replace(/\n/g, '\n');
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+'/api/v1/question/solveQuestion';
    const params = new URLSearchParams();
    var languageNum =0
    if(selectedLanguage === "Java"){
      languageNum =2
    }
    else if(selectedLanguage ==="Python"){
      languageNum=1
    }
    else if(selectedLanguage === "C"){
      languageNum=3
    }
    else if(selectedLanguage === "C++"){
      languageNum=4
    }
    console.log(selectedLanguage,":",languageNum)
    params.append("userCode", FormattedCode);
    params.append("languageNum",languageNum);
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

  const handleDelete = () => {
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/question/delete/${questionPk}`;
    axios
    .delete(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      navigate('/question')
    })
    .catch((error) => {
 
      console.error("문제 삭제 페이지에서 에러남", error);
    });
  }

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
    printf("Hello SEcodeVerse");
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

  const handleQuestionEdit = ()=>{
    setIsEdit(!isEdit);
  }

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
          {isModify &&   <><div
              className="question-detail-button-edit"
              onClick={handleQuestionEdit}
            >
              수정
            </div><div
              className="question-detail-button-delete"
              onClick={handleDelete}
            >
                삭제
             
              </div></>}
          </div>
        </div>
        {isEdit && <EditQuestion onClose = {handleQuestionEdit} question ={question} img = {img} />}
      </div>   
      {isPopup && isSuccess && <SuccessResult onClose={() => setIsPopup(false)} value ={successResult} code ={code} fianlSimilarQuestion = {fianlSimilarQuestion}/>}
      {isPopup && !isSuccess && <FailResult onClose={() => setIsPopup(false)} value={successResult } code ={code} fianlSimilarQuestion = {fianlSimilarQuestion}/>}
    </section>
  );
};

export default QuestionDetail;
