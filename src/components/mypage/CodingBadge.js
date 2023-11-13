import React, { useState } from "react";
import "../../css/CodingBadge.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CodingBadge = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
      <div className="mypageMain">
        <div className="mypage-total-wrapper">
          <div className="mypage-coding-calendar-wrapper">
            <div className="mypage-coding-calendar-background">
              <div className="mypage-current-calendar">
                <Calendar
                  locale="en"
                  value={currentDate}
                  next2Label={null}
                  prev2Label={null}
                  showNeighboringMonth={false}
                />
              </div>
            </div>
          </div>
          <div className="mypage-right-space-wrapper">
            <div className="mypage-codingBadge-info-wrapper">
              <div className="mypage-codingBadge-info-background"></div>
            </div>
            <div className="mypage-recommend-question-wrapper">
              <div className="mypage-recommend-question-background"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodingBadge;
