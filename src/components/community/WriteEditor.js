// WriteEditor.js
import React, { useState } from "react";
import "../../css/WriteEditor.css";
import EditorComponent from "./EditorComponent";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";

const WriteEditor = () => {
  const [type, setType] = useState("자유게시판");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isValidateUser,setIsValidateUser] = useState(false);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    console.log("selectedFiles", selectedFiles);
  };

  const navigate = useNavigate();

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  
  
  const handleRegisterClick = async () => {
    console.log("사용자가 올린 파일 수는", selectedFiles);
    var imgUrl = [];
    if (selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const uploadFile = selectedFiles[i];

        console.log(uploadFile);
        try {
          const presignedResponse = await axios.post(
            `${process.env.REACT_APP_DB_HOST}` + "/api/v1/s3/presigned",
            {
              imageName: uploadFile.name,
              folderName: "board",
            },
            {
              headers: {
                Authorization: localStorage.getItem("accessToken"),
              },
            }
          );

          const presignedUrl = presignedResponse.data.presigned_url;
          console.log("presignedUrl:", presignedUrl);
          console.log(uploadFile.type);
          console.log(uploadFile.name);

          const uploadResponse = await axios.put(presignedUrl, uploadFile, {
            headers: {
              "Content-Type": uploadFile.type,
            },
          });

          console.log("S3 업로드 성공", uploadResponse);

          const imageUrl = uploadResponse.request.responseURL;
          var fileName = "";
          if (uploadFile.type == "image/jpg") {
            fileName = imageUrl.substring(0, imageUrl.lastIndexOf(".jpg") + 4);
          } else if (uploadFile.type == "image/png") {
            fileName = imageUrl.substring(0, imageUrl.lastIndexOf(".png") + 4);
          } else if (uploadFile.type == "image/jpeg") {
            fileName = imageUrl.substring(0, imageUrl.lastIndexOf(".jpg") + 4);
          }
          console.log(imageUrl);
          console.log(fileName);
          imgUrl.push(fileName);
        } catch (error) {
          console.error("S3 업로드 실패", error);
        }
      }
    }
    var imgList = [];
    for (let i = 0; i < imgUrl.length; i++) {
      imgList.push({ imgUrl: imgUrl[i] });
      console.log("imgList넣을게");
    }
    console.log("imgUrl", imgUrl);
    console.log("imgList", imgList);
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
    if (imgUrl.length > 0) {
      data = {
        board: {
          categoryPk: pk,
          title: title,
          content: desc,
        },
        imgList,
      };
    } else {
      data = {
        board: {
          categoryPk: pk,
          title: title,
          content: desc,
        },
      };
    }

    if (title.trim() === "" || desc.trim() === "") {
      alert("제목과 내용을 입력해주세요.");
    } else {
      // 등록 처리
      console.log(pk);
      console.log(title);
      console.log(desc);
      axios
        .post( `${process.env.REACT_APP_DB_HOST}` +"/api/v1/board/", data, {
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
            <input
                className="write-editor-input-file"
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                multiple
                onChange={handleFileChange}
              />
            <div className="write-editor-middle-part">
              <EditorComponent value={desc} onChange={setDesc} />
            </div>
            <div className="write-editor-bottom-part">
              <div
                className="write-editor-check-button"
                onClick={handleRegisterClick}
              >
                등록
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

export default WriteEditor;
