import { Link ,useNavigate} from 'react-router-dom';


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
  const navigate = useNavigate();
  
  const handleNavigation = (pk) => {
    console.log("넘어가는 pk",pk)
    navigate(`/community/post/${pk}`);
  };


  return (
    <>
      {posts.map((post) => (
        <div className="mypage-myBoard" onClick={() => handleNavigation(post.pk)}>
          <div className="myPage-myBoard-contents-group">
            <div className="myPage-myBoard-coding-grade">
              <img src={post.badgeImgUrl}></img>
            </div>
            <div className="myPage-board-upper-wrapper">
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
