import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Chatbot from "../Chatbot";
import "../../css/league/LeagueMain.css";
import "../../css/league/LeagueJoinPopup.css";
import "../../css/league/LeagueCreatePopup.css";
import TeamView from "./TeamView";

import axios from 'axios';

const LeagueMain = () => {
  const [league, setLeague] = useState();
  const [leaguePk, setLeaguePk] = useState();

  //dummy
  const leagueData = {
    name: "CTF League Name",
    openTime: "2023-11-28T05:29:38.541Z",
    closeTime: "2023-11-30T05:29:38.541Z",
    memberCnt: 4,
    notice: "notice",
    description: "description",
  };

  useEffect(() => {
    const apiUrl =  `${process.env.REACT_APP_DB_HOST}` +"/api/v1/ctf/league/current";
    axios.get(apiUrl)
      .then((response) => {
       
        console.log(response.data);
        setLeague(response.data)
    })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  }, []);


  const [isOpen, setIsOpen] = useState(false);

  const [isCreate, setIsCreate] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [teamPw, setTeamPw] = useState("");

  //이름, pw 정규식 맞는지 확인
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 리그 이벤트의 시작 및 종료 시간 설정


  //team 있냐?
  const [isTeamPopup, setIsTeamPopup] = useState(false);
  const [isTeam, setIsTeam] = useState(false); //나중에 팀 있는지 없는지 검사 추가좀

  const navigate = useNavigate();

  useEffect(() => {
    const api = 'api/v1/ctf/league/2'
    axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      }
    })
    .then(response => {
      console.log("리그정보", response);
      setLeague(response.data);
    })
    .catch(error => {
      // 에러 처리
      console.error(error);
    });
  }, []);

  const handleLeagueCategoryRedirect = () => {
    const currentTime = new Date();

    const leagueStartTime = new Date(league.openTime);
    const leagueEndTime = new Date(league.closeTime);

    if (currentTime >= leagueStartTime && currentTime <= leagueEndTime) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    if (isOpen) {
      navigate("/league/category");
    } else {
      // 리그가 현재 열려 있지 않은 경우 처리
      alert("리그는 현재 열려 있지 않습니다");
    }
  };

  const handleNameInput = (event) => {
    const inputName = event.target.value;

    if (inputName == "" || inputName == null) {
      setIsName(false);
    } else {
      if (
        /^(?=.*[가-힣])(?=.*[a-zA-Z])[가-힣a-zA-Z0-9]{1,}$/u.test(inputName)
      ) {
        // 유효한 경우
        setIsName(true);
      } else {
        // 유효하지 않은 경우
        setIsName(false);
      }
    }

    setTeamName(inputName);
  };

  const handlePasswordInput = (event) => {
    const inputPassword = event.target.value;

    if (inputPassword == "" || inputPassword == null) {
      setIsPassword(false);
    } else {
      if (/^\d{4}$/.test(inputPassword)) {
        // 유효한 경우
        setIsPassword(true);
      } else {
        // 유효하지 않은 경우
        setIsPassword(false);
      }
    }

    setTeamPw(inputPassword);
  };

  const handleCreateCheck = () => {
   
    //   data = {
    //     leaguePk: leaguePk,
    //     categoryPk: selectedCategory,
    //     ctfQuestionType: questionType,
    //     name: titleValue,
    //     score: scoreValue,
    //     description: content,
    //     answer: answer
    //   };
    
    
    // axios
    //   .post(`${process.env.REACT_APP_DB_HOST}` + "/api/v1/admin/ctf/question", data, {
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
    //     console.error("리그 등록중 에러:", error);
    //   });
    // if (isName && isPassword) {
    //   setTeamName("");
    //   setTeamPw("");

    //   setIsCreate(!isCreate);
    //   setIsTeam(true);
    // } else {
    //   if (!isName) {
    //     alert(
    //       "팀 이름은 2~8자 이내의 영어, 한글, 숫자의 조합으로 입력해주세요."
    //     );
    //   }
    //   if (!isPassword) {
    //     alert("비밀번호는 4자리의 숫자로 입력해주세요.");
    //   }
    // }
  };

  const handelCreateClick = () => {
    if(isTeam){
      alert("이미 팀에 속해있습니다.");
      setIsCreate(false);
    }
    else{
      setIsCreate(true);
    }
  }

  const handleJoinClick = () => {
    setIsJoin(!isJoin);
    setIsTeam(true);
  }

  const handleViewClick = () => {
    setIsTeamPopup(!isTeamPopup);
  };

  const handleWithdrawClick = () => {
    setIsTeam(false);
    alert("탈퇴되었습니다.");
    setIsTeamPopup(!isTeamPopup);
  }

  return (
    <section>
      <div className="league-main-board-container">
        <div className="league-main-board-wrapper">
          <div className="league-main-board-title-box">
            <span className="league-main-board-title">리그이름</span>
          </div>
          <div className="league-main-board-description-area">
            <div className="league-main-board-description-box">
              <div className="league-main-board-description-notice">
                <span>[공지사항]</span>
                <br />
            {league && league.name}
                <br />
                <br />
              </div>
              <div className="league-main-board-description-description">
                <span>[리그설명]</span>
                <br />
                <span>  {league && league.description}</span>
                <br />
              </div>
            </div>
          </div>
          <div className="league-main-board-button-wrapper">
            <div className="league-main-board-button-area">
              <div className="league-main-board-team-area">
                <div
                  className="league-main-board-team-create"
                  onClick={handelCreateClick}
                >
                  <span>팀 생성</span>
                </div>
                {isTeam && (
                  <div
                    className="league-main-board-team-join"
                    onClick={handleViewClick}
                  >
                    <span>팀 조회</span>
                  </div>
                )}
                {!isTeam && (
                  <div
                    className="league-main-board-team-join"
                    onClick={handleJoinClick}
                  >
                    <span>팀 참가</span>
                  </div>
                )}
              </div>
              <div
                className="league-main-board-join-league"
                onClick={handleLeagueCategoryRedirect}
              >
                <div className="league-main-board-star"></div>
                <span>리그참여</span>
              </div>
              <div className="league-main-board-show-result">
                <Link to="/league/result">
                  <div className="league-main-board-star"></div>
                  <span>결과조회</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {isCreate && (
          <div className="create-team-popup-container">
            <div className="create-team-popup-upper-box">
              <div className="create-team-popup-title">
                <span>CTF 리그 팀 생성하기</span>
              </div>
              <div
                className="create-team-popup-cancel"
                onClick={handelCreateClick}
              ></div>
            </div>
            <div className="create-team-popup-midle-box">
              <div className="create-team-popup-team-name-box">
                <span>팀 이름</span>
                <input
                  type="text"
                  maxLength={8}
                  minLength={2}
                  value={teamName}
                  onChange={handleNameInput}
                />
                <div className="team-name-check-box">중복확인</div>
              </div>
              <div className="create-team-popup-team-password-box">
                <span>비밀번호</span>
                <input
                  type="text"
                  maxLength={4}
                  value={teamPw}
                  onChange={handlePasswordInput}
                />
              </div>
              <div className="join-team-popup-team-description-box">
                <div className="join-team-popup-team-description">
                  <p>[주의사항]</p>
                  <p>{league && league.notice}</p>
                  {/* <p>2. 팀 이름은 한번 생성하면 바꿀 수 없습니다.</p> */}
                </div>
              </div>
            </div>
            <div className="create-team-popup-bottom-box">
              <div
                className="create-team-popup-check-button"
                onClick={handleCreateCheck}
              >
                확인
              </div>
              <div
                className="create-team-popup-cancel-button"
                onClick={()=>setIsCreate(!isCreate)}
              >
                취소
              </div>
            </div>
          </div>
        )}
        {isJoin && (
          <div className="join-team-popup-container">
            <div className="join-team-popup-upper-box">
              <div className="join-team-popup-title">
                <span>CTF 리그 팀 참가하기</span>
              </div>
              <div
                className="join-team-popup-cancel"
                onClick={handleJoinClick}
              ></div>
            </div>
            <div className="join-team-popup-midle-box">
              <div className="join-team-popup-team-name-box">
                <span>팀 이름 : </span>
                <input type="text" />
              </div>
              <div className="join-team-popup-team-password-box">
                <span>비밀번호 : </span>
                <input type="password" />
              </div>
              <div className="join-team-popup-team-description-box">
                <div className="join-team-popup-team-description">
                  <p>[참여방법]</p>
                  <p>1. 참여하고자 하는 팀의 이름을 입력합니다.</p>
                  <p>2. 참여하고자 하는 팀의 비밀번호 입력합니다.</p>
                </div>
              </div>
            </div>
            <div className="join-team-popup-bottom-box">
              <div
                className="join-team-popup-check-button"
                onClick={()=>setIsJoin(!isJoin)}
              >
                확인
              </div>
              <div
                className="join-team-popup-cancel-button"
                onClick={()=>setIsJoin(!isJoin)}
              >
                취소
              </div>
            </div>
          </div>
        )}
        {isTeamPopup && <TeamView handlePopup={handleViewClick} handleWithdraw={handleWithdrawClick}></TeamView>}
      </div>
      <Chatbot></Chatbot>
    </section>
  );
};

export default LeagueMain;
