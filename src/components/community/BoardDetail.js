import "../../css/BoardDetail.css";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import CommentComponent from "./CommentComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
const BoardDeatil = () => {
  const [board, setBoard] = useState();
  const [imgList, setImgList] = useState();
  const { commumityPk } = useParams();
  const [commetntList, setCommentList] = useState([]);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    console.log(commumityPk);
    console.log("pk", commumityPk);
    const apiUrl = `/api/v1/board/${commumityPk}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("처음 게시글 정보", response.data.board);
        console.log(response.data.imgList);
        setBoard(response.data.board);
        setImgList(response.data.imgList);
      })
      .catch((error) => {
        console.error("처음 게시글 정보 가져오는 중 에러남:", error);
      });

    const apiUrl1 = `/api/v1/comment/${commumityPk}`;

    axios
      .get(apiUrl1)
      .then((response) => {
        console.log("처음 댓글 정보", response.data);
        setCommentList(response.data);
      })
      .catch((error) => {
        console.error("처음 댓글 정보 가져오는 중 에러남:", error);
      });
  }, []);

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
    if (localStorage.getItem("access") != null) {
      const accessToken = localStorage.getItem("access");
      console.log(accessToken);

      axios
        .get("api/v1/token/validate", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // 응답 처리
          console.log(response.data);
          if (response.data.isTokenValid === true) {
            const apiUrl = `/api/v1/board/${commumityPk}`;
            console.log("token이 유효합니다");
            axios
              .delete(apiUrl, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              })
              .then((response) => {
                console.log("게시글삭제됨");
              })
              .catch((error) => {
                console.error("게시글 삭제 에러:", error);
              });
          } else {
            alert("로그인 후 이용 부탁드립니다.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("로그인 후 이용 바랍니다");
    }
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

  const likeHandler = () => {
    console.log("like클릭함");
    if (localStorage.getItem("access") != null) {
      const accessToken = localStorage.getItem("access");
      console.log(accessToken);

      axios
        .get("api/v1/token/validate", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // 응답 처리
          console.log(response.data);
          if (response.data.isTokenValid === true) {
            const apiUrl = `/api/v1/likes/${commumityPk}`;
            console.log("token이 유효합니다");

            if (isLike === false) {
              setIsLike(true);
              axios
                .post(apiUrl, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                  },
                })
                .then((response) => {
                  console.log("like누름");
                })
                .catch((error) => {
                  console.error("API 호출 중 에러:", error);
                });
            } else {
              setIsLike(false);
              axios
                .delete(apiUrl, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                  },
                })
                .then((response) => {
                  console.log("like취소됨");
                })
                .catch((error) => {
                  console.error("API 호출 중 에러:", error);
                });
            }
          } else {
            alert("로그인 후 이용 부탁드립니다.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("로그인 후 이용 바랍니다");
    }
  };

  const commentRegister = () => {
    console.log("like클릭함");
    if (localStorage.getItem("access") != null) {
      const accessToken = localStorage.getItem("access");
      console.log(accessToken);

      axios
        .get("api/v1/token/validate", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // 응답 처리
          console.log(response.data);
          if (response.data.isTokenValid === true) {
            const data = {
              boardPK: commumityPk,
              content: writeComment,
            };
            axios
              .post("/api/v1/comment", data, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              })
              .then((response) => {
                console.log(response.data);
                setWriteComment("");

                //작성한 후에 새로운 댓글 목록 가져와서 업데이트 해보는 부분!
                const apiUrl = `/api/v1/comment/${commumityPk}`;
                axios
                  .get(apiUrl)
                  .then((response) => {
                    console.log("새로운 댓글 목록", response.data);
                    setCommentList(response.data);
                  })
                  .catch((error) => {
                    console.error("댓글 목록 가져오는 중 에러남:", error);
                  });
              })
              .catch((error) => {
                console.error("API 호출 중 에러:", error);
              });
          }
        });
    } else {
      alert("로그인 후 이용 바랍니다");
    }
    setWriteComment("");
  };

  const handleCommentChange = (e) => {
    setWriteComment(e.target.value);
  };

  return (
    <section>
      <div className="board-detail-total-container">
        <div className="board-detail-total-wrapper">
          <div className="board-detail-background">
            <div className="board-detail-upper-part">
              <div className="board-detail-user-badge">
                {imgList && imgList.map((img) => <img src={img}></img>)}
              </div>
              <div className="board-detail-info-wrapper">
                <span className="board-detail-category">
                  {board && board.category.name}
                </span>
                <span className="board-detail-writer">
                  {board && board.writer}
                </span>
              </div>
            </div>

            <div className="board-detail-middle-part">
              <div className="board-detail-title-box">
                <span className="board-detail-title-text">
                  {board && board.title}
                </span>
              </div>
              <div className="board-detail-contents-box" dangerouslySetInnerHTML={{ __html: board && board.content }}>
              </div>
            </div>

            <div className="board-detail-menu-box">
              <div
                className="board-detail-menu-box-heart-box"
                onClick={likeHandler}
              >
                <div className="board-detail-menu-box-heart-img"></div>
                <div className="board-detail-menu-box-heart-count">
                  {board && board.likeCnt}
                </div>
              </div>

              <div className="board-detail-menu-box-comment-img"></div>
              <div className="board-detail-menu-box-comment-count">
                {board && board.commentCnt}
              </div>
              <div className="board-detail-menu-box-write-date">
                {board && board.createAt}
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
                  onChange={handleCommentChange}
                />
                <button
                  className="board-detail-comment-input-button"
                  onClick={commentRegister}
                >
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
                  <CommentComponent comments={commetntList}></CommentComponent>
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
