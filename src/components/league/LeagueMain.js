import { useState } from "react";
import Chatbot from '../Chatbot';
import "../../css/LeagueMain.css";
import "../../css/LeagueJoinPopup.css";
import "../../css/LeagueCreatePopup.css";

const LeagueMain = () => {
  const [title, setTitle] = useState("제 1회 SECodeVerse 리그");
  const [description, setDescription] = useState(
    "- 일시 : 2023-08-13 10:00 ~ 11:00"
  );

  const [isCreate, setIsCreate] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  return (
    <section>
      <div className="league-main-board-container">
        <div className="league-main-board-wrapper">
          <div className="league-main-board-title-box">
            <span className="league-main-board-title">{title}</span>
          </div>
          <div className="league-main-board-description-area">
            <div className="league-main-board-description-box">
              {description}
            </div>
          </div>
          <div className="league-main-board-button-wrapper">
            <div className="league-main-board-button-area">
              <div className="league-main-board-team-area">
                <div
                  className="league-main-board-team-create"
                  onClick={() => setIsCreate(!isCreate)}
                >
                  <span>팀 생성</span>
                </div>
                <div
                  className="league-main-board-team-join"
                  onClick={() => setIsJoin(!isJoin)}
                >
                  <span>팀 참가</span>
                </div>
              </div>
              <div className="league-main-board-join-league">
                <div className="league-main-board-star"></div>
                <span>리그참여</span>
              </div>
              <div className="league-main-board-show-result">
                <div className="league-main-board-star"></div>
                <span>결과조회</span>
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
                onClick={() => setIsCreate(!isCreate)}
              ></div>
            </div>
            <div className="create-team-popup-midle-box">
              <div className="create-team-popup-team-name-box">
                <span>팀 이름</span>
                <input type="text" />
              </div>
              <div className="create-team-popup-team-password-box">
                <span>비밀번호</span>
                <input type="text" />
              </div>
              <div className="join-team-popup-team-description-box">
                <div className="join-team-popup-team-description">
                  <p>[주의사항]</p>
                  <p>1. 팀은 한 사람당 하나만 생성이 가능합니다.</p>
                  <p>2. 팀 이름은 한번 생성하면 바꿀 수 없습니다.</p>
                </div>
              </div>
            </div>
            <div className="create-team-popup-bottom-box">
              <div
                className="create-team-popup-check-button"
                onClick={() => setIsCreate(!isCreate)}
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
                onClick={() => setIsJoin(!isJoin)}
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
                onClick={() => setIsJoin(!isJoin)}
              >
                확인
              </div>
              <join
                className="join-team-popup-cancel-button"
                onClick={() => setIsJoin(!isJoin)}
              >
                취소
              </join>
            </div>
          </div>
        )}
      </div>
      <Chatbot></Chatbot>
    </section>
  );
};

export default LeagueMain;
