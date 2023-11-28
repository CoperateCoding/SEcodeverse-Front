import React, { useState } from "react";
import "../../css/AdminCTFLeague.css";
import "../../css/AdminCTFEnrollLeague.css";
import LeaugeTableComponent from "./LeagueTableComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
const CTFLeague = () => {
  const [isCreateLeague, setIsCreateLeague] = useState(false);
  const [popupTitle, setPopupTitle] = useState("CTF 리그 등록");

  const toggleModifyLeague = () => {
    setIsCreateLeague(!isCreateLeague);
    setPopupTitle("CTF 리그 수정");
  };
  const leagueRegister =() => {

    setIsCreateLeague(!isCreateLeague);
    const inputElements = document.getElementsByClassName('ctf-league-edit-popup-contents-title-input');
    const count = document.getElementsByClassName('ctf-league-edit-popup-contents-count-input');
    const notic = document.getElementsByClassName('ctf-league-edit-popup-contents-description-input');
    
    if (inputElements.length > 0) {
      const inputElement = inputElements[0];
      const inputValue = inputElement.value;
      console.log("name", inputValue);
    } else {
      console.log("해당 className을 가진 input 요소를 찾을 수 없습니다.");
    }
    
    if (count.length > 0) {
      const countElement = count[0];
      const countValue = countElement.value;
      console.log("인원수", countValue);
    } else {
      console.log("해당 className을 가진 count input 요소를 찾을 수 없습니다.");
    }
    
    if (notic.length > 0) {
      const noticElement = notic[0];
      const noticValue = noticElement.value;
      console.log("notic", noticValue);
    } else {
      console.log("해당 className을 가진 notic input 요소를 찾을 수 없습니다.");
    }

    const start = startDate
    const end = endDate
    console.log(start)
    console.log(end)


//     const api ='api/v1/admin/league/post'
//     data={name : ,
//         openTime:,
//       closeTime:,
//     memberCnt,
//   notice,
// description}
//     axios.post()
  }
  const toggleCreateLeague = () => {
    setIsCreateLeague(!isCreateLeague);
    
    setPopupTitle("CTF 리그 등록");
  };

  // 아코디언
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
              <div className="ctf-league-edit-popup-contents-date-box">
                <span className="ctf-league-edit-popup-contents-date">
                  시작 날짜 선택
                </span>
                <DatePicker
                  className="ctf-league-edit-popup-contents-date-picker"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  timeCaption="Time"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="ctf-league-edit-popup-contents-date-box">
                <span className="ctf-league-edit-popup-contents-date">
                  종료 날짜 선택
                </span>
                <DatePicker
                  className="ctf-league-edit-popup-contents-date-picker"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  timeCaption="Time"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
              <div className="ctf-league-edit-popup-contents-count-box">
                <span className="ctf-league-edit-popup-contents-count">
                  인원수
                </span>
                <input
                  className="ctf-league-edit-popup-contents-count-input"
                  type="number"
                />
              </div>
              <div className="ctf-league-edit-popup-contents-description-box">
                <span className="ctf-league-edit-popup-contents-description">
                  리그 설명
                </span>
                <textarea
                  className="ctf-league-edit-popup-contents-description-input"
                  type="text"
                  maxLength={2000}
                />
              </div>
            </div>
            <div className="ctf-league-edit-popup-contents-button-wrapper">
              <div
                className="ctf-league-edit-popup-contents-button"
                onClick={leagueRegister}
              >
                확인
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CTFLeague;
