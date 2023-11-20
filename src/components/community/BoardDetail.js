import "../../css/BoardDetail.css";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

const BoardDeatil = () => {
  const [content, setContent] = useState(""); // 에디터의 내용을 담을 상태

  const handleChange = (value) => {
    setContent(value); // 에디터 내용이 변경될 때마다 상태 업데이트
  };

  return (
    <section>
      <div className="board-detail-total-container">
        <div className="board-detail-total-wrapper">
          <div className="board-detail-background">
            <div className="board-detail-upper-part">
              <div className="board-detail-user-badge"></div>
              <div className="board-detail-info-wrapper">
                <span className="board-detail-category">자유게시판</span>
                <span className="board-detail-writer">242</span>
                <span className="board-detail-date">2022-10-29-18:00</span>
              </div>
            </div>
            <div className="board-detail-middle-part">
              <div className="board-detail-title-box">
                <span className="board-detail-title-text">제목입니까</span>
              </div>
              <div className="board-detail-contents-box">
                
              </div>
            </div>
            <div className="board-detail-menu-box"></div>
            <div className="board-detail-bottom-part">
              <table className="board-detail-comment-table">
                <thead>
                  <tr>
                    <th className="comment-writer"></th>
                    <th className="comment-contents"></th>
                    <th className="comment-date"></th>
                    <th className="comment-modify"></th>
                    <th className="comment-delete"></th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardDeatil;
