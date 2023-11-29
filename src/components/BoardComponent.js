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
  const getLevl = (level) =>{
    // console.log("포스트 정보들",posts[0])
    // console.log("레벨 찾아요",level)
    if (level === 1) {
      return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%95%8C.jpg";
    } else if (level === 2) {
      return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%95%84%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg";
    } else if (level === 3) {
      return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%B4%88%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg";
    } else if (level === 4) {
      return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%82%AC%EC%B6%98%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg";
    } else if (level === 5) {
      return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EB%8C%80%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg";
    } else if (level === 6) {
      return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%84%9D%EB%B0%95%EC%82%AC+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg";
    }
  }

  return (
    <>
      {posts.map((post) => (
        <div className="mypage-myBoard" onClick={() => handleNavigation(post.pk)}>
          <div className="myPage-myBoard-contents-group">
            <div className="myPage-myBoard-coding-grade">
              <img src={getLevl(post.levelPk)}></img>
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
