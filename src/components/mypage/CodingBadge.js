import React, { useState, useEffect } from "react";
import "../../css/CodingBadge.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import RecommendComponent from "./RecommendComponent";

const CodingBadge = ({calendar,user}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

//  const [userInfo, setUserInfo] = useState();
 const [badgeimg,setBadgeImg] = useState();
 const[exp,setExp] = useState()
 const[badgeName,setBadgeName]=useState()

 const dayList = calendar

 useEffect(() => {
  console.log("dayList:", dayList);
}, []);


  //날짜별로 달력 출력하는거
  // const dayList = [
  //   { date: "2023-10-21T05:29:38.541Z", question: 3 },
  //   { date: "2023-11-21T05:29:38.541Z", question: 3 },
  //   { date: "2023-11-22T05:29:38.541Z", question: 5 },
  //   { date: "2023-11-23T05:29:38.541Z", question: 10 },
  //   { date: "2023-11-24T05:29:38.541Z", question: 7 },
  //   { date: "2023-11-25T05:29:38.541Z", question: 1 },
  // ];


  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const matchingDay = dayList.find((day) => {
        const dayDate = new Date(day.time);
        return (
          dayDate.getDate() === date.getDate() &&
          dayDate.getMonth() === date.getMonth() &&
          dayDate.getFullYear() === date.getFullYear()
        );
      });
  
      if (matchingDay) {
        // 특정 날짜에 대한 cnt 값을 표시
        if (matchingDay.cnt > 0 && matchingDay.cnt <= 3) {
          return (
            <span style={{ color: "black" }}>{matchingDay.cnt}😊</span>
          );
        } else if (matchingDay.cnt > 3 && matchingDay.cnt <= 7) {
          return (
            <span style={{ color: "black" }}>{matchingDay.cnt}😎</span>
          );
        } else if (matchingDay.cnt > 7) {
          return (
            <span style={{ color: "black" }}>{matchingDay.cnt}😍</span>
          );
        }
      }
    }
    return null;
  };
  //경험치 관련
  const expData = { badgeName: "석박사까마귀", exp: 5317 };
  let limitExp = 0;

  if(user.exp === null){
    limitExp = 100;
  }
  else{
    if (user.exp > 0 && user.exp <= 100) {
      limitExp = 100;
    } else if (user.exp > 100 && user.exp <= 500) {
      limitExp = 500;
    } else if (user.exp > 500 && user.exp <= 800) {
      limitExp = 800;
    } else if (user.exp > 1200 && user.exp <= 5000) {
      limitExp = 5000;
    } else if (user.exp > 5000) {
      limitExp = 10000;
    }
  }
  

  //유사문제 추천 관련
  const questionData = [
    { pk: 1, title: "유사문제 1", img: "" },
    { pk: 2, title: "유사문제 2", img: "" },
    { pk: 3, title: "유사문제 3", img: "" },
    { pk: 4, title: "유사문제 4", img: "" },
    { pk: 5, title: "유사문제 5", img: "" },
  ];

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
                  tileContent={renderTileContent}
                />
              </div>
            </div>
          </div>
          <div className="mypage-right-space-wrapper">
            <div className="mypage-codingBadge-info-wrapper">
              <div className="mypage-codingBadge-info-background">
                <div className="mypage-codingBadge-info-contents">
                  <div className="mypage-codingBadge-info-img-box">
                    <div className="mypage-codingBadge-info-img">
                      <img src={user.imgUrl}></img>
                    </div>
                  </div>
                  <div className="mypage-codingBadge-info-box">
                    <div className="mypage-codingBadge-info-text-box">
                      <span className="mypage-codingBadge-info-text-badge-name">
                        {user.badgeName}
                      </span>
                      <span className="mypage-codingBadge-info-text-exp">
                        누적 경험치 : {user && user.exp !== null ? user.exp : 0}
                      </span>
                      <span className="mypage-codingBadge-info-text-remain-exp">
                        남은 경험치 : {user && user.exp !== null ?  limitExp - user.exp : 0}
                      </span>
                    </div>
                    <div className="mypage-codingBadge-info-exp-box">
                    <div className="mypage-codingBadge-info-exp-gage" style={user.exp ? { width: `${((user.exp / limitExp) * 100).toFixed(3)}%` } : {}}>
                        {user.exp && ((user.exp / limitExp) * 100).toFixed(3)}
                        {user.exp !== null ? "%" : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mypage-recommend-question-wrapper">
              <div className="mypage-recommend-question-background">
                <div className="mypage-recommend-question-contents">
                  <span className="mypage-recommend-question-title">
                    사용자 문제 추천
                  </span>
                  <div className="mypage-recommend-question-contents-wrapper">
                    Coming Soon~
                    {/* {questionData.map((value, index) => (
                      <RecommendComponent key={index} question={value} />
                    ))} */}
                  </div>
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
