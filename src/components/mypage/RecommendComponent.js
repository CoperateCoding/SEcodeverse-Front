const RecommendComponent = ({question}) => {
    function getProperty(obj) {
        if(typeof obj == undefined){
          const value =obj
          return value
        }
        else{
          return obj
        }
      }
      
    return(
        <div className="recommend-user-wrapper">
            <div className="recommend-user-img"></div>
            <span className="recommend-user-title">{getProperty(question.title).length> 10 ? `${getProperty(question.title).slice(0, 10)}...` : question.title}</span>
        </div>
    );
}

export default RecommendComponent;