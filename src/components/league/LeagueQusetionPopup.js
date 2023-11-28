import "../../css/league/LeagueQuestionPopup.css";

const LeagueQuestionPopup = ({
  isSubmitted,
  onQuestionClick,
  onSubmitClick,
}) => {
  return (
    <div className="league-question-container">
      <div className="league-question-wrapper">
        <div className="league-question-top-wrapper">
          <span className="league-question-title">CTF 문제이름</span>
          <div
            className="league-question-cancel-img"
            onClick={onQuestionClick}
          ></div>
        </div>
        <div className="league-question-middle-wrapper">
          <div className="league-question-description">
            <img src="https://via.placeholder.com/800x400" alt="대충 이미지" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, justo eget sagittis ultrices, sapien tortor ullamcorper
              ipsum, nec varius felis nisi sed quam. Nunc convallis, ligula eu
              varius lacinia, lacus justo aliquam urna, ut ullamcorper elit odio
              at dolor.
            </p>

            <p>
              Proin et justo et elit bibendum luctus at in nisl. Maecenas
              tristique, leo eu dignissim feugiat, urna turpis ullamcorper
              felis, nec hendrerit odio risus eu tellus. Suspendisse eu augue
              vel quam tincidunt dignissim. Nullam convallis, ex nec fermentum
              pellentesque, velit lacus iaculis velit, vel fermentum mi lacus et
              justo.
            </p>
          </div>
        </div>
        {!isSubmitted && (
          <div className="league-question-bottom-wrapper">
            <textarea
              className="league-question-answer"
              placeholder="답안을 입력하세요."
            ></textarea>
            <button className="league-question-submit" onClick={onSubmitClick}>
              제출
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueQuestionPopup;
