const CommentComponent = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <tr key={comment.number}>
          <td className="comment-writer">{comment.writer}</td>
          <td className="comment-contents">{comment.content}</td>
          <td className="comment-date">{comment.date}</td>
          <td className="comment-modify">수정</td>
          <td className="comment-delete">삭제</td>
        </tr>
      ))}
    </>
  );
};

export default CommentComponent;
