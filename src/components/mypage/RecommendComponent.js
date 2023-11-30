import { Link ,useNavigate} from 'react-router-dom';
function getLevelImg(level) {
  if(level===1){
    return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%95%8C.jpg"
  }
  else if (level ===2){
    return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%95%84%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
  }
  else if(level ===3 ){
    return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%B4%88%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
  }
  else if(level ===4){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%82%AC%EC%B6%98%EA%B8%B0+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
  }
  else if(level ===5){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EB%8C%80%EB%94%A9+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
  }
  else if(level===6){
return "https://secodeverse-bucket2.s3.ap-northeast-2.amazonaws.com/coding_badge/%EC%84%9D%EB%B0%95%EC%82%AC+%EA%B9%8C%EB%A7%88%EA%B7%80.jpg"
  }

}
const RecommendComponent = ({question}) => {
  const navigate = useNavigate();
    function getProperty(obj) {
  
        if(typeof obj == undefined){
          const value =obj
          return value
        }
        else{
          return obj
        }
      }
      const goQuestion = () => {
        console.log("상세문제로 넘어가야지")
        navigate(`/question/detail/${question.pk}`);
      }
      
    
    return(
        <div className="recommend-user-wrapper" onClick={goQuestion}>
            <div className="recommend-user-img">
              <img src={getLevelImg(question.level)}/>
            </div>
            <span className="recommend-user-title">{getProperty(question.title).length> 10 ? `${getProperty(question.title).slice(0, 10)}...` : question.title}</span>
        </div>
    );
}

export default RecommendComponent;