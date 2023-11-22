import React, { useState } from "react";
import "../../css/AdminCTFLeague.css";
import "../../css/AdminCTFEnrollLeague.css";
import LeaugeTableComponent from "./LeagueTableComponent";

const CTFLeague = () => {
  const [isCreateLeague, setIsCreateLeague] = useState(false);
  const [popupTitle, setPopupTitle] = useState("CTF 리그 등록");

  const toggleModifyLeague = () => {
    setIsCreateLeague(!isCreateLeague);
    setPopupTitle("CTF 리그 수정");
  };

  const toggleCreateLeague = () => {
    setIsCreateLeague(!isCreateLeague);
    setPopupTitle("CTF 리그 등록");
  };

  // 아코디언
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
      <div className="admin-league-board-wrapper">
        <h1 className="admin-league-board-rightMain">CTF 리그 관리</h1>
        <div className="admin-league-board-topBar">
          <div name="admin-league-board-category-accordion-wrap">
            <div
              className="admin-league-accordion-header"
              onClick={toggleAccordion}
            >
              <sapn className="ctf-league-board-search-order-text">
                {selectedOption}
              </sapn>
              <sapn className="ctf-league-board-search-order-icon">
                {isOpen ? "▲" : "▼"}
              </sapn>
            </div>
            {isOpen && (
              <div className="ctf-league-accordion-content">
                <div
                  className="ctf-league-board-search-order-text "
                  onClick={() => changeOrder("최신순")}
                >
                  최신순
                </div>
                <div
                  className="ctf-league-board-search-order-text "
                  onClick={() => changeOrder("점수높은순")}
                >
                  점수높은순
                </div>
                <div
                  className="ctf-league-board-search-order-text "
                  onClick={() => changeOrder("점수낮은순")}
                >
                  점수낮은순
                </div>
              </div>
            )}
          </div>
          <div
            className="admin-league-board-create-question"
            onClick={toggleCreateLeague}
          >
            <span>리그 생성</span>
          </div>
        </div>
        <div className="admin-league-board-table">
          <table className="admin-league-table">
            <thead>
              <tr>
                <th className="admin-league-table-number">No.</th>
                <th className="admin-league-table-name">리그 이름</th>
                <th className="admin-league-table-date">리그 기간</th>
                <th className="admin-league-table-modify"></th>
                <th className="admin-league-table-delete"></th>
              </tr>
            </thead>
            <tbody>
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
              <LeaugeTableComponent
                isCreateLeague={isCreateLeague}
                toggleModifyLeague={toggleModifyLeague}
              />
            </tbody>
          </table>
        </div>
        <h1 className="admin-league-paging">1 2 3 4 5</h1>
      </div>
      {isCreateLeague && (
        <div className="ctf-league-edit-popup-container">
          <div className="ctf-league-edit-popup-wrapper">
            <div className="ctf-league-edit-popup-title-box">
              <span className="ctf-league-edit-popup-title">{popupTitle}</span>
              <div
                className="ctf-league-edit-popup-cancel"
                onClick={toggleCreateLeague}
              ></div>
            </div>
            <div className="ctf-league-edit-popup-contents-box">
              <div className="ctf-league-edit-popup-contents-title-box">
                <span className="ctf-league-edit-popup-contents-title">
                  리그 이름
                </span>
                <input
                  className="ctf-league-edit-popup-contents-title-input"
                  type="text"
                />
              </div>
              <div className="ctf-league-edit-popup-contents-description-box">
                <span className="ctf-league-edit-popup-contents-description">
                  리그 설명
                </span>
                <textarea
                  className="ctf-league-edit-popup-contents-description-input"
                  type="text"
                />
              </div>
            </div>
            <div className="ctf-league-edit-popup-contents-button-wrapper">
              <div className="ctf-league-edit-popup-contents-button" onClick={toggleCreateLeague}>확인</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CTFLeague;
