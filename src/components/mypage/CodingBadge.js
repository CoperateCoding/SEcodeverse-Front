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
              <div className="mypage-codingBadge-info-background">
                <div className="mypage-codingBadge-info-contents">
                  <div className="mypage-codingBadge-info-img-box">
                    <div className="mypage-codingBadge-info-img"></div>
                  </div>
                  <div className="mypage-codingBadge-info-box">
                    <div className="mypage-codingBadge-info-text-box">
                      <span className="mypage-codingBadge-info-text-badge-name">석박사까마귀</span>
                      <span className="mypage-codingBadge-info-text-exp">경험치 : </span>
                      <span className="mypage-codingBadge-info-text-remain-exp">남은 경험치 : </span>
                    </div>
                    <div className="mypage-codingBadge-info-exp-box">
                      <div className="mypage-codingBadge-info-exp-gage">38.4%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mypage-recommend-question-wrapper">
              <div className="mypage-recommend-question-background">
                <div className="mypage-recommend-question-contents">
                  <span className="mypage-recommend-question-title">사용자 문제 추천</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodingBadge;
