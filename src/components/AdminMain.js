import React, { useState } from "react";
import "../css/AdminMain.css";
import CTFquestion from "../components/admin/CTFquestion";
import CTFLeague from "../components/admin/CTFLeague";
import CTFteam from "../components/admin/CTFteam";

const AdminMain = () => {
  const [currentScreen, setCurrentScreen] = useState("CTFQuestion");
  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <section>
      <div className="admin-main-board-container">
        <div className="admin-main-board-left">
          <div className="admin-main-board-menu_contents">
            <div className="admin-main-board-question-button">
              <h1
                className="CTFQ"
                onClick={() => handleButtonClick("CTFQuestion")}
              >
                CTF 문제관리
              </h1>
            </div>
            <div className="admin-main-board-team-button">
              <h1 className="CTFT" onClick={() => handleButtonClick("CTFT")}>
                CTF 팀관리
              </h1>
            </div>
            <div className="admin-main-board-league-button">
              <h1
                className="ctfRig"
                onClick={() => handleButtonClick("ctfRig")}
              >
                CTF 리그관리
              </h1>
            </div>
          </div>
        </div>
        {currentScreen === "CTFQuestion" && <CTFquestion />}
        {currentScreen === "CTFT" && <CTFteam />}
        {currentScreen === "ctfRig" && <CTFLeague />}
      </div>
    </section>
  );
};

export default AdminMain;
