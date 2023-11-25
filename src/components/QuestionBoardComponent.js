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
    return (
      <>
        {posts.map((post) => (
        
          <div className="mypage-myBoard" onClick={() => goQuestionDetail(post.pk)}>
            <div className="myPage-myBoard-contents-group">
              <div className="myPage-myBoard-coding-grade"></div>
              <div className="myPage-board-upper-wrapper">
                <span className="myPage-board-name">{getCategory(post.categoryPk)}</span>
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
  