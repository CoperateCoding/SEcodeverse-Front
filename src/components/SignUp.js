import React, { useState } from "react";
import "../css/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputID, setinputID] = useState("");
  const [inputPW, setinputPW] = useState("");
  const [inputNickname, setinputNickname] = useState("");
  const [inputName, setinputName] = useState("");
  const [checkPW, setCheckPW] = useState("");
  const [message, setmessage] = useState("");
  const [idSentence, setIDsentence] = useState(
    "중복확인  후 회원가입을 시도해주세요"
  );
  const [nickNameSentence, setNickNameSentence] = useState(
    "중복확인  후 회원가입을 시도해주세요"
  );
  const [buttonSentence, setButtonSentence] = useState(
    "아이디와 닉네임 중복확인 후 시도해주세요"
  );
  const [isExistenceId, setisExistenceId] = useState(true);
  const [isExistenceNickName, setisExistenceNickName] = useState(true);
  const [isNotify, setIsNotyfy] = useState(false);

  //ID 아래에 description 부분 껐다 켰다
  const [isIdBox, setIsIdBox] = useState(false);

  //닉네임 아래 껐다켰다
  const [isNickNameBox, setNickNameBox] = useState(false);

  //PW 정규식 따르는지 check
  const [isAcceptPw, setIsAcceptPw] = useState(false);

  //PW와 PW확인이 동일한지 check
  const [isSamePw, setIsSamePw] = useState(false);

  //아이디 중복검사까지만 함
  const performInput = () => {
    setinputID("");
    setinputPW("");
    setinputNickname("");
    setinputName("");
  };

  const handleInputChange = (event) => {
    const inputChar = event.target.value;
    setinputID(inputChar);

    var ret = false;
    setIsIdBox(true);

    if (inputChar == "" || inputChar == null) {
      ret = false;
    } else {
      // 영어와 숫자로 이루어진 4~12자리 문자열인지 확인
      if (/^(?=.*[a-z])[a-z0-9]{4,12}$/u.test(inputChar)) {
        ret = true;
      } else {
        ret = false;
      }
    }

    // 에러 메시지 설정
    if (!ret) {
      setIDsentence("영어와 숫자로 이루어진 4~12자리 ID를 입력해주세요.");
    } else {
      setIDsentence("중복확인 후 회원가입을 시도해주세요");
    }

    console.log(ret);
  };

  const handleInputChangePW = (event) => {
    const inputChar = event.target.value;

    if (inputChar == "" || inputChar == null) {
      setIsAcceptPw(false);
    } else {
      if (
        /^(?=.*[a-zA-Z0-9])(?=.*[~!@#$%^&*()_=+|{};:<>/?])[a-zA-Z0-9~~!@#$%^&*()_=+|{};:<>/?]{12,20}$/.test(
          inputChar
        )
      ) {
        setIsAcceptPw(true);
      } else {
        setIsAcceptPw(false);
      }
    }

    setinputPW(inputChar);
  };

  const handleInputChangeNickname = (event) => {
    const inputChar = event.target.value;
    setinputNickname(inputChar);

    var ret = false;
    setNickNameBox(true);

    if (inputChar == "" || inputChar == null) {
      ret = false;
    } else {
      if (/^(?=.*[a-zA-Z가-힣])[가-힣a-zA-Z0-9]{2,8}$/u.test(inputChar)) {
        ret = true;
      } else {
        ret = false;
      }
    }

    if (!ret) {
      setNickNameSentence(
        "한글 또는 영문으로 이루어진 2~8자리 닉네임을 입력해주세요."
      );
    } else {
      setNickNameSentence("중복확인  후 회원가입을 시도해주세요");
    }
  };

  const handleInputChangeName = (event) => {
    var inputChar = event.target.value;
    var ret = false;

    if (/^(?=.*[가-힣])[가-힣]{2,8}$/u.test(inputChar)) {
      ret = true;
    } else {
      ret = false;
    }

    setinputName(inputChar);
  };

  const handleInputCheckPW = (event) => {
    var inputChar = event.target.value;
    setCheckPW(inputChar);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      performInput();
    }
  };

  //아이디 중복 체크
  const isIDExistence = () => {
    const id = inputID;

    axios
      .get(`${process.env.REACT_APP_DB_HOST}`+`api/v1/user/id/${id}/exists`)
      .then((response) => {
        console.log(response.data);
        if (response.data.exists === true) {
          setIsIdBox(true);
          setIDsentence("이미 존재하는 아이디입니다.");
          setisExistenceId(true);
        } else {
          setisExistenceId(false);
          setIDsentence("사용 가능한 아이디입니다.");
          setIsIdBox(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //닉넴 중복 체크
  const isNickNamExistence = () => {
    const nickName = inputNickname;
    axios
      .get(`${process.env.REACT_APP_DB_HOST}`+`api/v1/user/nickname/${nickName}/exists`)
      .then((response) => {
        console.log(response.data);

        if (response.data.exists == true) {
          setNickNameSentence("이미 존재하는 닉네임입니다.");
          setisExistenceNickName(true);
        } else {
          setisExistenceNickName(false);
          setNickNameSentence("사용가능한 닉네임입니다.");
          setNickNameBox(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //확인 버튼 눌렀을 때
  const handleSignUp = () => {
    console.log(isExistenceId);
    console.log(isExistenceNickName);
    if (isExistenceId == true || isExistenceNickName == true) {
      setIsNotyfy(true);
    } else {
      if (inputPW == checkPW) {
        setIsSamePw(true);
        if (isSamePw && isAcceptPw) {
          axios
            .post(`${process.env.REACT_APP_DB_HOST}`+"/api/v1/user/signup", {
              id: inputID,
              pw: inputPW,
              name: inputName,
              nickname: inputNickname,
            })
            .then((response) => {
              console.log(response.data);
              navigate("/login");
            })
            .catch((error) => {
              console.error("API 호출 중 에러:", error);
            });
        } else {
          if (!isAcceptPw) {
            alert(
              "비밀번호는 영문, 숫자, 특수기호가 포함된 12~20자리로 입력해주세요."
            );
          }
          if (!isSamePw) {
            alert("입력하신 비밀번호가 비밀번호 확인과 일치하지 않습니다.");
          }
        }
      } else {
        setIsSamePw(false);
      }
    }
  };

  return (
    <section>
      <div className="signUp-page-container">
        <div className="signUp-page-wrapper">
          <div className="signUp-page-signUp-box">
            <div className="signUp-page-signUp-text">
              <span>Sign Up</span>
            </div>
            <div className="signUp-page-signUp-input-box-wrapper">
              <div className="signUp-page-signUp-input-box">
                <div className="signUp-page-signUp-input-box-total-wrapper">
                  <div className="signUp-page-id-input-wrapper">
                    <span className="signUp-page-id-text">ID</span>
                    <input
                      type="text"
                      value={inputID}
                      className="signUp-page-id-input-box"
                      placeholder="아이디를 입력하세요"
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      maxLength="12"
                    ></input>
                    <div className="id-check-button" onClick={isIDExistence}>
                      중복 확인
                    </div>
                    {isIdBox && <h1>{idSentence}</h1>}
                  </div>
                  <div className="signUp-page-pw-input-wrapper">
                    <span className="signUp-page-pw-text">PW</span>
                    <input
                      type="password"
                      value={inputPW}
                      className="signUp-page-pw-input-box"
                      placeholder="비밀번호를 입력하세요"
                      onChange={handleInputChangePW}
                      onKeyDown={handleKeyDown}
                      maxLength={20}
                    ></input>
                  </div>
                  <div className="signUp-page-checkPw-input-wrapper">
                    <span className="signUp-page-checkPw-text">PW 확인</span>
                    <input
                      type="password"
                      value={checkPW}
                      className="signUp-page-checkPw-input-box"
                      placeholder="비밀번호를 입력하세요"
                      onChange={handleInputCheckPW}
                      maxLength={20}
                    ></input>
                  </div>
                  <div className="signUp-page-nickName-input-wrapper">
                    <span className="signUp-page-nickName-text">닉네임</span>
                    <input
                      type="text"
                      value={inputNickname}
                      className="signUp-page-nickName-input-box"
                      placeholder="닉네임을 입력하세요"
                      onChange={handleInputChangeNickname}
                      onKeyDown={handleKeyDown}
                      maxLength={8}
                    ></input>
                    <div
                      className="nickName-check-button"
                      onClick={isNickNamExistence}
                    >
                      중복 확인
                    </div>
                    {isNickNameBox && <h1>{nickNameSentence}</h1>}
                  </div>
                  <div className="signUp-page-name-input-wrapper">
                    <span className="signUp-page-name-text">이름</span>
                    <input
                      type="text"
                      value={inputName}
                      className="signUp-page-name-input-box"
                      placeholder="이름을 입력하세요"
                      onChange={handleInputChangeName}
                      onKeyDown={handleKeyDown}
                      minLength={2}
                      maxLength={8}
                    ></input>
                  </div>
                </div>
                {isNotify && (
                  <h1 className="signUp-buttonSentence">{buttonSentence}</h1>
                )}

                <div className="signUp-page-input-button-wrapper">
                  <div
                    className="signUp-page-input-button"
                    onClick={handleSignUp}
                  >
                    확인
                  </div>
                </div>
              </div>
            </div>
            <div className="signUp-page-deco-wrapper">
              <div className="signUp-page-deco"></div>
              <div className="signUp-page-deco"></div>
              <div className="signUp-page-deco"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
