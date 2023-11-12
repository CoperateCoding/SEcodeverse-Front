import React, { useState } from "react";
import "../../css/MyPage.css";
import Calendar from "./Calendar";

const CodingBadge = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  }

  const handleNextClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  }

  return (
    <>
      <div className="mypageMain">
        <div className="mypage-coding-calendar-wrapper">
          <div className="mypage-coding-calendar-background">
            <div className="mypage-prev-button" onClick={() => handlePrevClick()}></div>
            <div className="mypage-prev-calendar">
              <Calendar currentDate={new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)} />
            </div>
            <div className="mypage-current-calendar">
              <Calendar currentDate={currentDate} />
            </div>
            <div className="mypage-next-calendar">
              <Calendar currentDate={new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)} />
            </div>
            <div className="mypage-next-button" onClick={() => handleNextClick()}></div>
          </div>
        </div>
        <div className="mypage-under-space-wrapper">
          <div className="mypage-codingBadge-info-wrapper">
            <div className="mypage-codingBadge-info-background"></div>
          </div>
          <div className="mypage-recommend-question-wrapper">
            <div className="mypage-recommend-question-background"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodingBadge;
