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
function getCategory(num){
  if(num==1){
    return "자료구조"
  }else if(num==2){
    return "사칙연산"
  }else if(num==3){
    return "딥러닝"
  }else if(num==3){
    return "네트워크"
  }else if(num==3){
    return "프로그래밍"
  }else if(num==3){
    return "웹프"
  }
}


const QuestionBoardComponent = ({ posts }) => {
  const navigate = useNavigate();
const goQuestionDetail= (pk) => {
  console.log("넘어가는 pk",pk)
  navigate(`/question/detail/${pk}`);
}
const getImg = (level) => {
if(level===1){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%95%8C.jpg"
}
else if(level===2){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%95%84%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
}else if(level ===3){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%B4%88%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
}
else if(level===4){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%82%AC%EC%B6%98%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
}else if(level===5){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EB%8C%80%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
}
else if(level===6){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%84%9D%EB%B0%95%EC%82%AC+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
}

}
    return (
      <>
        {posts.map((post) => (
        
          <div className="mypage-myBoard" onClick={() => goQuestionDetail(post.pk)}>
            <div className="myPage-myBoard-contents-group">
              <div className="myPage-myBoard-coding-grade">
                <img src={getImg(post.levelPk)}></img>
              </div>
              <div className="myPage-board-upper-wrapper">
                <span className="myPage-board-name">{post.categoryName}</span>
                <span className="myPage-board-user">{post.userName}</span>
              </div>
              <span className="myPage-myBoard-post-title">{getProperty(post.title).length> 10 ? `${getProperty(post.title).slice(0, 10)}...` : post.title}</span>
              {/* <span className="myPage-myBoard-post-contents">{getProperty(post.intro).length > 10 ? `${getProperty(post.intro).slice(0, 10)}...` : post.intro}</span> */}
              <span className="myPage-myBoard-post-contents">{post.intro}</span>
           
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default QuestionBoardComponent;
  