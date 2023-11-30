import "../../css/BoardDetail.css";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import CommentComponent from "./CommentComponent";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const BoardDeatil = () => {
  const [board, setBoard] = useState();
  const [imgList, setImgList] = useState();
  const { commumityPk } = useParams();
  const [commetntList, setCommentList] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [content, setContent] = useState("");
  const [writeComment, setWriteComment] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [isModifyCommunity,setIsModifyCommunity] = useState(false)

  useEffect(() => {
    console.log("useEffect");
    console.log(commumityPk);
    console.log("pk", commumityPk);
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/board/${commumityPk}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("처음 게시글 정보", response.data.board);
        console.log("처음 이미지 정보", response.data.imgList);
        setBoard(response.data.board);
        setImgList(response.data.imgList);
        console.log("현제 내 닉네임:",localStorage.getItem('nickName'))
        console.log("글쓴이",response.data.board.writer)
        if(localStorage.getItem('nickName') === response.data.board.writer){
          setIsModifyCommunity(true)
          console.log("게시글 수정 권한 줄거임")
        }
        
        console.log("게시글 수정 권한",isModifyCommunity)
      })
      .catch((error) => {
        console.error("처음 게시글 정보 가져오는 중 에러남:", error);
      });

    const apiUrl1 = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/comment/${commumityPk}`;

    axios
      .get(apiUrl1)
      .then((response) => {
        console.log("처음 댓글 정보", response.data);
        setCommentList(response.data.imgUrl);
      })
      .catch((error) => {
        console.error("처음 댓글 정보 가져오는 중 에러남:", error);
      });
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const editPost = () => {
    toggleMenu(); // 메뉴 닫기
    navigate("/community/wrtite");
  };

  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/board/${commumityPk}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/community");
      })
      .catch((error) => {
        console.error("게시글 삭제 중 에러", error);
      });
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
///
  // 컴포넌트가 마운트되면 클릭 이벤트를 추가
  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // 컴포넌트가 언마운트될 때 클릭 이벤트를 제거
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const likeHandler = () => {
    axios
      .get(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/likes/${commumityPk}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === false) {
          axios
            .post(
              `${process.env.REACT_APP_DB_HOST}`+ `/api/v1/likes/${commumityPk}`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error("좋아요 누르는중 에러남", error);
            });
        } else {
          axios
            .delete(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/likes/${commumityPk}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error("좋아요 취소하는중에 에러남", error);
            });
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("좋아요 목록 확인 중 에러남", error);
      });
  };

  const commentRegister = () => {
    const data = {
      boardPK: commumityPk,
      content: writeComment,
    };
    axios
      .post(`${process.env.REACT_APP_DB_HOST}`+"/api/v1/comment", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWriteComment("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
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
              <div className="board-detail-user-badge"></div>
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
              <div className="board-detail-contents-box">
                {board && board.content && (
                  <div dangerouslySetInnerHTML={{ __html: board.content }} />
                )}
                {imgList &&
                  imgList.map((img, index) => (
                    <div key={index}>
                      <img src={img.imgUrl} alt={`이미지 ${index}`} />
                    </div>
                  ))}
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
              {isModifyCommunity && <div className="board-detail-menu-box-menu" onClick={toggleMenu}>
                메뉴
                {menuVisible && (
                  <div id="menuDropdown" className="board-detail-menu-dropdown">
                    <Link  to={`/community/edit/${commumityPk}`}>
                      <div className="menu-option">
                      수정
                      </div>
                    </Link>
                    <div className="menu-option" onClick={deletePost}>
                      삭제
                    </div>
                  </div>
                )}
              </div>}
              
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
