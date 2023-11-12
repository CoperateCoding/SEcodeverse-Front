function getProperty(obj) {
  if(typeof obj == undefined){
    const value =obj
    return value
  }
  else{
    return obj
  }
}
const BoardComponent = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="mypage-myBoard">
          <div className="myPage-myBoard-contents-group">
            <div className="myPage-myBoard-coding-grade"></div>
            <div className="myPage-board-upper-wrapper">
              <span className="myPage-board-name">{post.categoryPk}</span>
              <span className="myPage-board-user">{post.writerNickname}</span>
            </div>
            <span className="myPage-myBoard-post-title">{getProperty(post.title).length> 10 ? `${getProperty(post.title).slice(0, 10)}...` : post.title}</span>
            
            <div className="myPage-under-wrapper">
              <div className="myPage-heart"></div>
              <span className="myPage-heart-count">{post.likeCnt}</span>
              <div className="myPage-comment"></div>
              <span className="myPage-comment-count">{post.commentCnt}</span>
              <span className="myPage-date">{post.createAt}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BoardComponent;
