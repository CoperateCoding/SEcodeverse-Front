
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import axios from "axios";
import Chatbot from "../Chatbot";
import "../../css/league/LeagueMain.css";
import "../../css/league/LeagueJoinPopup.css";
import "../../css/league/LeagueCreatePopup.css";
import TeamView from "./TeamView";




const LeagueMain = () => {
  const [league, setLeague] = useState();
  const [leaguePk, setLeaguePk] = useState();
  const [isExistNickName, setIsExistNickName] = useState(false);

  //dummy
  const leagueData = {
    name: "CTF League Name",
    openTime: "2023-11-28T05:29:38.541Z",
    closeTime: "2023-11-30T05:29:38.541Z",
    memberCnt: 4,
    notice: "notice",
    description: "description",
  };

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
  const [teams, setTeams] = useState([]);
  // var teams=[]
  var teamNames =""
  const navigate = useNavigate();
  const [joinTeamName, setJoinTeamName] = useState('')
  const[joinPw,setJoinPw] = useState('')

  useEffect(() => {
    var leage = 0;
    var leageDetail = [];
    var openTime = "";
    var closeTime = "";
    const apiUrl =
      `${process.env.REACT_APP_DB_HOST}` + "/api/v1/ctf/league/current";
    axios
      .get(apiUrl)
      .then((response) => {
        setLeaguePk(response.data);
        console.log("현재 진행중인 리그 PK", response.data);
        leage = response.data;
        console.log("리그설정", leage);
        const apiUrl2 =
          `${process.env.REACT_APP_DB_HOST}` + `/api/v1/ctf/league/${leage}`;
        axios
          .get(apiUrl2)
          .then((response) => {
            console.log("현재 진행중인 리그 정보", response.data);
            setLeague(response.data);
            leageDetail.push(response.data);
            openTime = response.data.openTime;
            closeTime = response.data.closeTime;
            console.log(
              "리그가져오는동안 openTime과 closeTime",
              openTime,
              closeTime
            );
            const currentTime = new Date();

            const leagueStartTime = new Date(openTime);
            const leagueEndTime = new Date(closeTime);
            console.log("리그 시작 시간", openTime);
            console.log("리그 끝나는 시간", closeTime);

            if (
              currentTime >= leagueStartTime &&
              currentTime <= leagueEndTime
            ) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }

            const apiUrl = `${process.env.REACT_APP_DB_HOST}/api/v1/ctf/team/user/isexist`;

            axios
              .get(apiUrl, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
                params: {
                  leaguePk: leage,
                },
              })
              .then((response) => {
                console.log("리그에 참여할 수 있니?", response.data);
                if (response.data === true) {
                  console.log("팀이 있는지 검사해서 나 팀 있다니깐");
                  setIsTeam(true);
                 
                } else {
                  setIsTeam(false);
                }
              })
              .catch((error) => {
                console.error("API 호출 중 에러:", error);
              });
          })
          .catch((error) => {
            console.error("API 호출 중 에러:", error);
          });
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  }, []);

  const handleLeagueCategoryRedirect = () => {
    if (isOpen) {
      if (isTeam) {
        navigate("/league/category");
      } else {
        alert("팀에 먼저 참가해주세요");
      }
    } else {
      // 리그가 현재 열려 있지 않은 경우 처리
      alert("리그는 현재 열려 있지 않습니다");
    }
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const TeamJoin = () => {
    setIsJoin(!isJoin)
    
  };

  const handleNameInput = (event) => {
    const inputName = event.target.value;

    if (inputName == "" || inputName == null) {
      // setIsName(false);
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

  const hadleJoinName = (event) => {
    setJoinTeamName(event.target.value)
  }

  const handleJoingPw = (event) => {
    setJoinPw(event.target.value)
  }
  const handleCreateCheck = () => {
    console.log("팀 등록 시작");
    console.log("팀등록할수있는지", isExistNickName);

    if (isExistNickName === false) {
      console.log("팀 등록 들어옴 ");
      const apiUrl2 =
        `${process.env.REACT_APP_DB_HOST}` + `/api/v1/ctf/team/post`;
      axios
        .post(
          apiUrl2,
          {
            leaguePk: leaguePk,
            name: teamName,
            pw: teamPw,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((response) => {
          console.log("팀 등록 성공!");
          setIsCreate(false);
        })
        .catch((error) => {
          console.error("팀 등록중 중", error);
        });
    }
  };

  const existsClick = () => {
    const apiUrl2 =
      `${process.env.REACT_APP_DB_HOST}` +
      `/api/v1/ctf/team/name/${teamName}/exists`;
    axios
      .get(apiUrl2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.exists === false) {
          alert("사용가능한 팀이름 입니다");
          setIsExistNickName(false);
          console.log("팀등록이 가능한데 ..,?,", isExistNickName);
        } else {
          alert("사용불가능한 팀이름 입니다");
          setIsExistNickName(true);
          console.log("팀등록이 불가능한데 ,,? ", isExistNickName);
        }
      })
      .catch((error) => {
        console.error("리그 중복 확인 중", error);
      });
  };

  const handelCreateClick = () => {
    if (isTeam) {
      alert("이미 팀에 속해있습니다.");
      setIsCreate(false);
    } else {
      setIsCreate(true);
    }
  };

  const handleJoinClick =  () => {
    setIsJoin(!isJoin);
    const apiUrl = `${process.env.REACT_APP_DB_HOST}/api/v1/ctf/team/join`;
    console.log("joinTeamName:",joinTeamName)
    console.log("joinpw:",joinPw)
    axios
      .post(apiUrl, {
        teamName: joinTeamName,
        pw: joinPw
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("팀 참가 성공");
        window.location.reload();
      })
      .catch((error) => {
        console.error("팀 참가 중 에러: ", error);
      });
    setIsTeam(true);
  };

  const handleViewClick =async () => {
    console.log("제팀들은요")
    const apiUrl2 =
    `${process.env.REACT_APP_DB_HOST}` +
    `/api/v1/ctf/detail/my/team`;
  axios
    .get(apiUrl2, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "access"
        )}`,
      },
    })
    .then((response) => {
      // setTeam(response.data);
      // teams=response.data
      setTeams(response.data);
      console.log("내 팀은",teams);
        
    })
    .catch((error) => {
      console.error("팀 확인중 확인 중", error);
    });

    await sleep(2000);
    setIsTeamPopup(!isTeamPopup);

  };

  
  const handleWithdrawClick = () => {
    setIsTeam(false);
    alert("탈퇴되었습니다.");
    setIsTeamPopup(!isTeamPopup);
  };

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
                <span> {league && league.description}</span>
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
                    onClick={TeamJoin}
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
                onClick={() => {
                  setIsCreate(false);
                }}
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
                <div className="team-name-check-box" onClick={existsClick}>
                  중복확인
                </div>
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
                  <p>팀 이름 : 한글 또는 영문 필수, 숫자 선택. 2~8자리</p>
                  <p>비밀번호 : 숫자 4자리</p>
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
                onClick={() => setIsCreate(!isCreate)}
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
                onClick={() => {
                  setIsJoin(!setIsJoin);
                }}
              ></div>
            </div>
            <div className="join-team-popup-midle-box">
              <div className="join-team-popup-team-name-box">
                <span>팀 이름 : </span>
                <input type="text" 
                value={joinTeamName}
                onChange={hadleJoinName}/>
              </div>
              <div className="join-team-popup-team-password-box">
                <span>비밀번호 : </span>
                <input type="password"
                value={joinPw}
                onChange={handleJoingPw} />
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
                onClick={handleJoinClick}
              >
                확인
              </div>
              <div
                className="join-team-popup-cancel-button"
                onClick={() => setIsJoin(!isJoin)}
              >
                취소
              </div>
            </div>
          </div>
        )}
        {isTeamPopup && (teams &&
          <TeamView
            teams={teams}
            handlePopup={handleViewClick}
            handleWithdraw={handleWithdrawClick}
          ></TeamView>
        )}
      </div>
      <Chatbot></Chatbot>
    </section>
  );
};

export default LeagueMain;
