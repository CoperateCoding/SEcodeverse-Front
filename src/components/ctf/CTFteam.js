import React, { useState } from "react";
import "../../css/AdminCTFTeam.css";
import TeamTableComponent from "./TeamTableComponent";

const CTFteam = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const changeOrder = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 옵션을 선택한 후 아코디언을 닫음
  };

  return (
    <div className="admin-main-board-right">
      <div className="admin-team-board-wrapper">
        <h1 className="admin-team-board-rightMain">CTF 팀관리</h1>
        <div className="admin-team-board-topBar">
          <div name="admin-team-board-category-accordion-wrap">
            <div
              className="admin-team-accordion-header"
              onClick={toggleAccordion}
            >
              <sapn className="ctf-team-board-search-order-text">
                {selectedOption}
              </sapn>
              <sapn className="ctf-team-board-search-order-icon">
                {isOpen ? "▲" : "▼"}
              </sapn>
            </div>
            {isOpen && (
              <div className="ctf-team-accordion-content">
                <div
                  className="ctf-team-board-search-order-text "
                  onClick={() => changeOrder("최신순")}
                >
                  최신순
                </div>
                <div
                  className="ctf-team-board-search-order-text "
                  onClick={() => changeOrder("점수높은순")}
                >
                  점수높은순
                </div>
                <div
                  className="ctf-team-board-search-order-text "
                  onClick={() => changeOrder("점수낮은순")}
                >
                  점수낮은순
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="admin-team-board-table">
          <table className="admin-team-table">
            <thead>
              <tr>
                <th className="admin-team-table-number">No.</th>
                <th className="admin-team-table-name">팀이름</th>
                <th className="admin-team-table-score">총 점수</th>
              </tr>
            </thead>
            <tbody>
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
              <TeamTableComponent />
            </tbody>
          </table>
        </div>
        <h1 className="admin-team-paging">1 2 3 4 5</h1>
      </div>
    </div>
  );
};

export default CTFteam;
