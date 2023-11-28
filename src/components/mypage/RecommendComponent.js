import { Link ,useNavigate} from 'react-router-dom';
const RecommendComponent = ({question}) => {
  const navigate = useNavigate();
    function getProperty(obj) {
      console.log("인공지능 비밋한 문제 추천 부분에서 문제 pk",question.pk)
      console.log("인공지능 비슷한 문제 추천 title",question.title)
      console.log("인공지능 비슷한 문제 추천 level",question.levelPk)
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
            <div className="recommend-user-img"></div>
            <span className="recommend-user-title">{getProperty(question.title).length> 10 ? `${getProperty(question.title).slice(0, 10)}...` : question.title}</span>
        </div>
    );
}

export default RecommendComponent;