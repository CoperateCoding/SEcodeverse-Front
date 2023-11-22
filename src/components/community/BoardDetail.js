import "../../css/BoardDetail.css";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import CommentComponent from "./CommentComponent";
//다시보냄
const BoardDeatil = () => {
  const dummyData = [
    {
      writer: "John Doe",
      content: "This is the first comment.",
      date: "2023-11-20 18:00",
    },
    {
      writer: "Jane Smith",
      content: "Great post! Thanks for sharing.",
      date: "2023-11-21 18:00",
    },
    {
      writer: "Alice Johnson",
      content: "I have a question about this topic.",
      date: "2023-11-22 18:00",
    },
    {
      writer: "Bob Anderson",
      content: "Nice work! Keep it up.",
      date: "2023-11-23 18:00",
    },
    {
      writer: "Eva Brown",
      content: "Looking forward to more content like this.",
      date: "2023-11-24 18:00",
    },
  ];

  const [content, setContent] = useState(""); //글 작성한거
  const [writeComment, setWriteComment] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const editPost = () => {
    // 수정 로직을 여기에 추가
    alert("수정을 선택했습니다.");
    toggleMenu(); // 메뉴 닫기
  };

  const deletePost = () => {
    // 삭제 로직을 여기에 추가
    alert("삭제를 선택했습니다.");
    toggleMenu(); // 메뉴 닫기
  };

  const handleOutsideClick = (event) => {
    const menuDropdown = document.getElementById("menuDropdown");
    if (
      !event.target.closest(".board-detail-menu-box-menu") &&
      !event.target.closest(".board-detail-menu-dropdown")
    ) {
      setMenuVisible(false);
    }
  };

  // 컴포넌트가 마운트되면 클릭 이벤트를 추가
  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // 컴포넌트가 언마운트될 때 클릭 이벤트를 제거
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
                <span className="board-detail-title-text">제목</span>
              </div>
              <div className="board-detail-contents-box">
                <p>
                  가온누리 바나나 별하 옅구름 예그리나 아련 컴퓨터 아름드리
                  옅구름 사과 도서 안녕 바나나 아슬라 미쁘다 함초롱하다 도서
                  바람꽃 이플 옅구름 감사합니다 컴퓨터 미리내 도서 미쁘다 바람꽃
                  도르레 아련 비나리 다솜 바나나 미쁘다 책방 산들림 여우비 소솜
                  나래 그루잠 포도 미리내 비나리 나비잠 다솜 포도 늘품 아련 다솜
                  소록소록 나비잠 이플. 노트북 나비잠 나래 산들림 예그리나
                  미쁘다 함초롱하다 사과 바나나 달볓 감또개 사과 여우별 이플
                  별빛 아름드리 예그리나 책방 아슬라 예그리나 함초롱하다 이플
                  우리는 별하 사과 도르레 그루잠 여우비 컴퓨터 소록소록 감또개
                  도담도담 도담도담 비나리 도서관 아슬라 컴퓨터 도서관 우리는
                  이플 아리아 도서관 사과 사과 소솜 감또개 늘품 산들림 그루잠
                  옅구름. 이플 비나리 가온해 사과 아련 산들림 늘품 별하 별빛
                  가온누리 달볓 비나리 그루잠 그루잠 아슬라 우리는 산들림 늘품
                  소록소록 도서 도서관 별하 예그리나 산들림 아름드리 로운 여우비
                  곰다시 포도 옅구름 포도 다솜 곰다시 컴퓨터 비나리 그루잠
                  미쁘다 별하 바나나 포도 바나나 함초롱하다 가온누리 책방 나비잠
                  가온누리 별빛 미리내 비나리 그루잠.
                </p>
                <p>
                  가온누리 바나나 별하 옅구름 예그리나 아련 컴퓨터 아름드리
                  옅구름 사과 도서 안녕 바나나 아슬라 미쁘다 함초롱하다 도서
                  바람꽃 이플 옅구름 감사합니다 컴퓨터 미리내 도서 미쁘다 바람꽃
                  도르레 아련 비나리 다솜 바나나 미쁘다 책방 산들림 여우비 소솜
                  나래 그루잠 포도 미리내 비나리 나비잠 다솜 포도 늘품 아련 다솜
                  소록소록 나비잠 이플. 노트북 나비잠 나래 산들림 예그리나
                  미쁘다 함초롱하다 사과 바나나 달볓 감또개 사과 여우별 이플
                  별빛 아름드리 예그리나 책방 아슬라 예그리나 함초롱하다 이플
                  우리는 별하 사과 도르레 그루잠 여우비 컴퓨터 소록소록 감또개
                  도담도담 도담도담 비나리 도서관 아슬라 컴퓨터 도서관 우리는
                  이플 아리아 도서관 사과 사과 소솜 감또개 늘품 산들림 그루잠
                  옅구름. 이플 비나리 가온해 사과 아련 산들림 늘품 별하 별빛
                  가온누리 달볓 비나리 그루잠 그루잠 아슬라 우리는 산들림 늘품
                  소록소록 도서 도서관 별하 예그리나 산들림 아름드리 로운 여우비
                  곰다시 포도 옅구름 포도 다솜 곰다시 컴퓨터 비나리 그루잠
                  미쁘다 별하 바나나 포도 바나나 함초롱하다 가온누리 책방 나비잠
                  가온누리 별빛 미리내 비나리 그루잠.
                </p>
                <p>
                  가온누리 바나나 별하 옅구름 예그리나 아련 컴퓨터 아름드리
                  옅구름 사과 도서 안녕 바나나 아슬라 미쁘다 함초롱하다 도서
                  바람꽃 이플 옅구름 감사합니다 컴퓨터 미리내 도서 미쁘다 바람꽃
                  도르레 아련 비나리 다솜 바나나 미쁘다 책방 산들림 여우비 소솜
                  나래 그루잠 포도 미리내 비나리 나비잠 다솜 포도 늘품 아련 다솜
                  소록소록 나비잠 이플. 노트북 나비잠 나래 산들림 예그리나
                  미쁘다 함초롱하다 사과 바나나 달볓 감또개 사과 여우별 이플
                  별빛 아름드리 예그리나 책방 아슬라 예그리나 함초롱하다 이플
                  우리는 별하 사과 도르레 그루잠 여우비 컴퓨터 소록소록 감또개
                  도담도담 도담도담 비나리 도서관 아슬라 컴퓨터 도서관 우리는
                  이플 아리아 도서관 사과 사과 소솜 감또개 늘품 산들림 그루잠
                  옅구름. 이플 비나리 가온해 사과 아련 산들림 늘품 별하 별빛
                  가온누리 달볓 비나리 그루잠 그루잠 아슬라 우리는 산들림 늘품
                  소록소록 도서 도서관 별하 예그리나 산들림 아름드리 로운 여우비
                  곰다시 포도 옅구름 포도 다솜 곰다시 컴퓨터 비나리 그루잠
                  미쁘다 별하 바나나 포도 바나나 함초롱하다 가온누리 책방 나비잠
                  가온누리 별빛 미리내 비나리 그루잠.
                </p>
              </div>
            </div>

            <div className="board-detail-menu-box">
              <div className="board-detail-menu-box-heart-img"></div>
              <div className="board-detail-menu-box-heart-count">482</div>
              <div className="board-detail-menu-box-comment-img"></div>
              <div className="board-detail-menu-box-comment-count">482</div>
              <div className="board-detail-menu-box-write-date">
                0000-00-00 00:00
              </div>
              <div className="board-detail-menu-box-menu" onClick={toggleMenu}>
                메뉴
                {menuVisible && (
                <div id="menuDropdown" className="board-detail-menu-dropdown">
                  <div className="menu-option" onClick={editPost}>
                    수정
                  </div>
                  <div className="menu-option" onClick={deletePost}>
                    삭제
                  </div>
                </div>
              )}
              </div>
              
            </div>

            <div className="board-detail-bottom-part">
              <div className="board-detail-comment-input-wrapper">
                <input
                  className="board-detail-comment-input"
                  type="text"
                  value={writeComment}
                />
                <button className="board-detail-comment-input-button">
                  작성
                </button>
              </div>
              <table className="board-detail-comment-table">
                <thead className="board-detail-comment-table-thead">
                  <tr>
                    <th className="comment-writer">댓쓴이</th>
                    <th className="comment-contents">내용</th>
                    <th className="comment-date">작성 날짜</th>
                    <th className="comment-modify">수정</th>
                    <th className="comment-delete">삭제</th>
                  </tr>
                </thead>
                <tbody className="board-detail-comment-table-tbody">
                  <CommentComponent comments={dummyData}></CommentComponent>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardDeatil;
