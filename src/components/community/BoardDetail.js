import "../../css/BoardDetail.css";
import React, { useState,useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import CommentComponent from "./CommentComponent";
import axios from 'axios'
import { useParams } from 'react-router-dom';
//다시보냄
const BoardDeatil = () => {
  const[board,setBoard]=useState();
  const[imgList,setImgList]=useState();
  const { pk } = useParams();
  const [commetntList, setCommentList] = useState([]);

  useEffect(() => {
   console.log("useEffect")
   console.log(pk);
   console.log("pk",pk)
  const apiUrl = `/api/v1/board/${pk}`;

  axios.get(apiUrl)
    .then(response => {
      console.log(response.data.board)
      console.log(response.data.imgList)
      setBoard(response.data.board)
      setImgList(response.data.imgList)

    
    })
    .catch(error => {
      console.error('API 호출 중 에러:', error);
    });
  
  const apiUrl1 = `/api/v1/comment/${pk}`

  axios.get(apiUrl1)
  .then(response => {
    console.log(response.data)
    setCommentList(response.data)
  })
  .catch(error => {
    console.error('API 호출 중 에러:', error);
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

  const commentRegister =() =>{
    const data = {
      boardPK:pk,
      content:writeComment
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
          setWriteComment("")
      
        })
        .catch((error) => {
          console.error("API 호출 중 에러:", error);
        });
  }

  const handleChange = (value) => {
    setContent(value); // 에디터 내용이 변경될 때마다 상태 업데이트
  };
  const handleCommentChange = (e) => {
    setWriteComment(e.target.value);
    console.log(writeComment)
  };
  return(
 <section>
      <div className="board-detail-total-container">
        <div className="board-detail-total-wrapper">
          <div className="board-detail-background">
            <div className="board-detail-upper-part">
              <div className="board-detail-user-badge"></div>
              <div className="board-detail-info-wrapper">
                <span className="board-detail-category">{board && board.category.name}</span> 
                <span className="board-detail-writer">{board &&board.writer}</span>
                <span className="board-detail-date">{board &&board.createAt}</span>
              </div>
            </div>

            <div className="board-detail-middle-part">
              <div className="board-detail-title-box">
                <span className="board-detail-title-text">{board &&board.title}</span>
              </div>
              <div className="board-detail-contents-box">
               {board &&board.content}
              </div>
            </div>

            <div className="board-detail-menu-box">
              <div className="board-detail-menu-box-heart-img"></div>
              <div className="board-detail-menu-box-heart-count">{board &&board.likeCnt}</div>
              <div className="board-detail-menu-box-comment-img"></div>
              <div className="board-detail-menu-box-comment-count">{board &&board.commentCnt}</div>
              <div className="board-detail-menu-box-write-date">
              {board &&board.createAt}
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
                <button className="board-detail-comment-input-button" onClick={commentRegister}>
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
  )
 
};

export default BoardDeatil;