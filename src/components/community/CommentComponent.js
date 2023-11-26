import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

// ... (다른 import 문들)

const CommentComponent = () => {
  const [commentList, setCommentList] = useState([]);
  const { commumityPk } = useParams();
  const [board, setBoard] = useState(null);
  const [imgList, setImgList] = useState([]);
  const [editedCommentIndex, setEditedCommentIndex] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `/api/v1/board/${commumityPk}`;

    axios.get(apiUrl)
      .then(response => {
        setBoard(response.data.board);
        setImgList(response.data.imgList);
      })
      .catch(error => {
        console.error('API 호출 중 에러:', error);
      });
  
    const apiUrl1 = `/api/v1/comment/${commumityPk}`;

    axios.get(apiUrl1)
      .then(response => {
        setCommentList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API 호출 중 에러:', error);
        setLoading(false);
      });
  }, [commumityPk]);
  const commentDelete = (pk) => {
    axios
      .delete(`/api/v1/comment/${pk}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
        
      })
      .catch((error) => {
        console.error("댓글 삭제하는중에 에러남", error);
      });
  }
  return (
    <>
      {commentList.map((comment, index) => (
        <tr key={index}>
          <td className="comment-writer">{comment.user.name}</td>
          <td className="comment-contents">{comment.content}</td>
          <td className="comment-date">{comment.createAt}</td>
          <td className="comment-modify">수정</td>
          <td className="comment-delete"onClick={() => {commentDelete(comment.pk)}}>삭제</td>
        </tr>
      ))}
    </>
  );
};

export default CommentComponent;
