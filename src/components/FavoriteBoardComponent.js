import { Link ,useNavigate} from 'react-router-dom';
// function getProperty(obj) {
//   if(typeof obj == undefined){
//     const value =obj
//     return value
//   }
//   else{
//     return obj
//   }
// }



const FavoriteBoardComponent = ({ posts }) => {
  const navigate = useNavigate();
  const onClick  = (pk) => {
    navigate(`/community/post/${pk}`);
  }
  
  return (
    <>
      {posts.map((post) => (
        <div className="mainPage-post-box" onClick={()=>{onClick(post.boardPk)}}>
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
