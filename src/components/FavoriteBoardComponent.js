function getProperty(obj) {
  if(typeof obj == undefined){
    const value =obj
    return value
  }
  else{
    return obj
  }
}

const FavoriteBoardComponent = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="mainPage-post-box">
          <div className="mainPage-post-name">{post.title}</div>
          <div className="mainPage-post-detail">
            <div className="mainPage-post-like-wrapper">
              <div className="mainPage-post-like-img"></div>
              <div className="mainPage-post-like-cnt">{post.likeCnt}</div>
            </div>
            <div className="mainPage-post-comment-wrapper">
              <div className="mainPage-post-comment-img"></div>
              <div className="mainPage-post-comment-cnt">{post.commentCnt}</div>
            </div>
            <div className="mainPage-post-createAt">{post.createAt}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FavoriteBoardComponent;
