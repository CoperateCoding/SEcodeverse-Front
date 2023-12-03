import React, { useState, useEffect } from "react";
import "../../css/AdminCTFLeague.css";
import "../../css/AdminCTFEnrollLeague.css";
import LeaugeTableComponent from "./LeagueTableComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const CTFLeague = () => {
  const [isCreateLeague, setIsCreateLeague] = useState(false);
  const [isEditLeague, setIsEditLeague] = useState(false);
  const [popupTitle, setPopupTitle] = useState("CTF 리그 등록");
  const [totalPages, setTotalpages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [league, setLeague] = useState([]);
  const [selectL, setSelectL] = useState("");
 const [editLeaguePk, setEditLeaguePk] = useState()

  //input 친구 헤헤..
  const [inputValue, setInputValue] = useState("");
  const [countValue, setCountValue] = useState("");
  const [noticValue, setNoticValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  }

  const handleCountValue = (e) => {
    setCountValue(e.target.value);
  }

  const handleNoticeValue = (e) => {
    setNoticValue(e.target.value);
  }

  const handleContentValue = (e) => {
    setContentValue(e.target.value);
  }

  useEffect(() => {
    const apiUrl =
      `${process.env.REACT_APP_DB_HOST}` + "/api/v1/admin/ctf/league/all";
    const page = 1;
    const params = {
      page: page,
      pageSize: 10,
    };
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const url = `${apiUrl}?${queryString}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLeague(response.data.list);
        setTotalpages(
          response.data.cnt % 10 > 0
            ? response.data.cnt / 10 + 1
            : response.data.cnt / 10
        );
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  }, []);

  const leagueRegister = () => {
    setIsCreateLeague(!isCreateLeague);
    // const inputElements = document.getElementsByClassName(
    //   "ctf-league-edit-popup-contents-title-input"
    // );
    // const count = document.getElementsByClassName(
    //   "ctf-league-edit-popup-contents-count-input"
    // );
    // const content = document.getElementsByClassName(
    //   "ctf-league-edit-popup-contents-description-input"
    // );
    // const notic = document.getElementsByClassName(
    //   "ctf-league-edit-popup-contents-description-input"
    // );

    // const inputElement = inputElements[0];
    // const inputValue = inputElement.value;
    // console.log("name", inputValue);

    // const countElement = count[0];
    // const countValue = countElement.value;
    // console.log("인원수", countValue);

    // const contentElement = content[0];
    // const contentValue = contentElement.value;
    // console.log("content", contentValue);

    // const noticElement = notic[0];
    // const noticValue = noticElement.value;
    // console.log("notic", noticValue);

    const start = startDate;
    const end = endDate;
    console.log("start", start);
    console.log("end", end);

    console.log("수정할 리그pk", editLeaguePk)
    const data = {
      name: inputValue,
      openTime: start,
      closeTime: end,
      memberCnt: countValue,
      notice: noticValue,
      description: contentValue,
    };
    axios
      .patch(
        `${process.env.REACT_APP_DB_HOST}` + `/api/v1/admin/ctf/league/${editLeaguePk}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  };

  const toggleModifyLeague = (leagueIndex) => {
    const leaguePk = league.at(leagueIndex).leaguePk;
    setEditLeaguePk(leaguePk)
    leagueDetail(leaguePk);
    // setIsEditLeague(!isEditLeague);
    console.log("받은 리그 정보", selectL.name);
    console.log("저장한 시작 시간", startTime);
  };

  const leagueDetail = (leaguePk) => {
    const url1 =
      `${process.env.REACT_APP_DB_HOST}` + `/api/v1/ctf/league/${leaguePk}`;

    axios
      .get(
        url1,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((response) => {
        console.log("들고온 리그 정보", response.data);
        setSelectL(response.data);
        setInputValue(response.data.name);
        setCountValue(response.data.memberCnt);
        setNoticValue(response.data.notice);
        setContentValue(response.data.description);
        setStartTime(response.data.openTime);
        setEndTime(response.data.closeTime);
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });

      setTimeout(()=>{
        setIsEditLeague(!isEditLeague);
      },1000)
  };

  const toggleCreateLeague = () => {
    setIsCreateLeague(!isCreateLeague);

    //     const api ='api/v1/admin/league/post'
    //     data={name : ,
    //         openTime:,
    //       closeTime:,
    //     memberCnt,
    //   notice,
    // description}
    //     axios.post()

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

  const buttonClick = (n) => {
    getQuestionList(n);
    setCurrentPage(n);
  };

  const getQuestionList = (paging) => {
    const apiUrl =
      `${process.env.REACT_APP_DB_HOST}` + "/api/v1/admin/ctf/league/all";
    const page = paging;
    const params = {
      page: page,
      pageSize: 10,
    };
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const url = `${apiUrl}?${queryString}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLeague(response.data.list);
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  };

  const changeOrder = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // 옵션을 선택한 후 아코디언을 닫음
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      const pagiging = currentPage - 1;
      getQuestionList(pagiging);
      setCurrentPage(pagiging);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const pagiging = currentPage + 1;
      getQuestionList(pagiging);
      setCurrentPage(pagiging);
    }
  };


  return (
    <div className="admin-main-board-right">
      <div className="admin-league-board-wrapper">
        <h1 className="admin-league-board-rightMain">CTF 리그 관리</h1>
        <div className="admin-league-board-topBar">
          <div name="admin-league-board-category-accordion-wrap"></div>
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
              {league &&
                league.map((value, index) => (
                  <LeaugeTableComponent
                    index={index}
                    isCreateLeague={isCreateLeague}
                    value={value}
                    toggleModifyLeague={() => toggleModifyLeague(index)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className="community-paging">
          <button onClick={handlePrevClick}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => buttonClick(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button onClick={handleNextClick}>&gt;</button>
        </div>
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
                  value={inputValue}
                  onChange={handleInputValue}
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
                  value={countValue}
                  onChange={handleCountValue}
                />
              </div>
              <div className="ctf-league-edit-popup-contents-boxes">
                <div className="ctf-league-edit-popup-contents-description-box">
                  <span className="ctf-league-edit-popup-contents-description">
                    리그 설명
                  </span>
                  <textarea
                    className="ctf-league-edit-popup-contents-description-input"
                    type="text"
                    maxLength={2000}
                    value={contentValue}
                    onChange={handleContentValue}
                  />
                </div>
                <div className="ctf-league-edit-popup-contents-notice-box">
                  <span className="ctf-league-edit-popup-contents-description">
                    주의사항
                  </span>
                  <textarea
                    className="ctf-league-edit-popup-contents-description-input"
                    type="text"
                    maxLength={2000}
                    value={noticValue}
                    onChange={handleNoticeValue}
                  />
                </div>
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
      {isEditLeague && (
        <div className="ctf-league-edit-popup-container">
          <div className="ctf-league-edit-popup-wrapper">
            <div className="ctf-league-edit-popup-title-box">
              <span className="ctf-league-edit-popup-title">CTF 리그 수정</span>
              <div
                className="ctf-league-edit-popup-cancel"
                onClick={()=>setIsEditLeague(!isEditLeague)}
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
                  value={selectL.name}
                  onChange={handleInputValue}
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
                  selected={new Date(startTime)}
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
                  selected={new Date(endTime)}
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
                  value={selectL.memberCnt}
                  onChange={handleCountValue}
                />
              </div>
              <div className="ctf-league-edit-popup-contents-boxes">
                <div className="ctf-league-edit-popup-contents-description-box">
                  <span className="ctf-league-edit-popup-contents-description">
                    리그 설명
                  </span>
                  <textarea
                    className="ctf-league-edit-popup-contents-description-input"
                    type="text"
                    maxLength={2000}
                    value={selectL.description}
                    onChange={handleContentValue}
                  />
                </div>
                <div className="ctf-league-edit-popup-contents-notice-box">
                  <span className="ctf-league-edit-popup-contents-description">
                    주의사항
                  </span>
                  <textarea
                    className="ctf-league-edit-popup-contents-description-input"
                    type="text"
                    maxLength={2000}
                    value={selectL.notice}
                    onChange={handleNoticeValue}
                  />
                </div>
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