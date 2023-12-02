// WriteEditor.js
import React, { useState, useEffect } from "react";
import "../../css/WriteEditor.css";
import EditorComponent from "./EditorComponent";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

const PostEditor = () => {
  const [board, setBoard] = useState();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isValidateUser,setIsValidateUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const { commumityPk } = useParams();

  useEffect(() => {
    console.log("수정들어옴");
    console.log(commumityPk);
    console.log("pk", commumityPk);
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/board/${commumityPk}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("수정 게시글 정보", response.data.board);
        setBoard(response.data.board);
        setTitle(response.data.board.title);
        setDesc(response.data.board.content);
        setType(response.data.board.category.name);
      })
      .catch((error) => {
        console.error("수정 게시글 정보 가져오는 중 에러남:", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  
  
  const handleRegisterClick = async () => {
 
    let pk;
    if (type == "자유게시판") {
      pk = 1;
    } else if (type == "공지사항") {
      pk = 2;
    } else if (type == "코딩게시판") {
      pk = 3;
    } else if (type == "취업게시판") {
      pk = 4;
    } else if (type == "공모전게시판") {
      pk = 5;
    }
    console.log(pk);
    var data = [];

      data = {
        board: {
          categoryPk: pk,
          title: title,
          content: desc,
        },}
   

    if (title.trim() === "" || desc.trim() === "") {
      alert("제목과 내용을 입력해주세요.");
    } else {
      // 등록 처리
      console.log(pk);
      console.log(title);
      console.log(desc);
      axios
        .patch(`${process.env.REACT_APP_DB_HOST}`+`/api/v1/board/${commumityPk}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((response) => {
          console.log(localStorage.getItem("access"));
          console.log(response.data);
          navigate("/community");
        })
        .catch((error) => {
          console.error("API 호출 중 에러:", error);
        });

      setTitle("");
      setDesc("");
      setType("자유게시판"); // 등록 후에 type을 다시 기본값으로 설정합니다.
      setSelectedFiles([])
    }
  };

  const goToCommunity = () => {
    navigate("/community");
  };

  return (
    <section>
      <div className="write-editor-wrapper">
        <div className="write-editor-container">
          <div className="write-editor-background">
            <div className="write-editor-upper-part">
              <input
                className="write-editor-title"
                type="text"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="write-editor-select"
                value={type}
                onChange={handleTypeChange}
              >
                <option value="자유게시판">자유게시판</option>
                <option value="공지사항">공지사항</option>
                <option value="코딩게시판">코딩게시판</option>
                <option value="취업게시판">취업게시판</option>
                <option value="공모전게시판">공모전게시판</option>
              </select>
            </div>
            <div className="write-editor-middle-part">
              <EditorComponent value={desc} onChange={setDesc} />
            </div>
            <div className="write-editor-bottom-part">
              <div
                className="write-editor-check-button"
                onClick={handleRegisterClick}
              >
                수정
              </div>
              <div
                className="write-editor-cancel-button"
                onClick={goToCommunity}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostEditor;
