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

  const handleEditClick = (index) => {
    const selectedComment = commentList[index];

    if (selectedComment) {
      setEditedCommentIndex(index);
      setEditedCommentContent(selectedComment.content);
    }
  };

  const handleCancelClick = () => {
    setEditedCommentIndex(null);
    setEditedCommentContent("");
  };

  const handleSaveClick = (index, editedContent) => {
    // Implement the logic to save the edited comment content
    // You may want to make an API call to update the comment on the server
    const updatedCommentList = [...commentList];
    updatedCommentList[index].content = editedContent;

    setCommentList(updatedCommentList);
    handleCancelClick();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {commentList.map((comment, index) => (
        <tr key={index}>
          <td className="comment-writer">{comment.user.name}</td>
          <td className="comment-contents">
            {editedCommentIndex === index ? (
              <textarea
                value={editedCommentContent}
                onChange={(e) => setEditedCommentContent(e.target.value)}
              />
            ) : (
              comment.content
            )}
          </td>
          <td className="comment-date">{new Date(comment.createAt).toLocaleString()}</td>
          <td className="comment-modify">
            {editedCommentIndex === index ? (
              <>
                <button onClick={handleCancelClick}>취소</button>
                <button onClick={() => handleSaveClick(index, editedCommentContent)}>저장</button>
              </>
            ) : (
              <button onClick={() => handleEditClick(index)}>수정</button>
            )}
          </td>
          <td className="comment-delete">
            <button>삭제</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default CommentComponent;
