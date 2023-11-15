import '../../css/QuestionDetail.css';

const QuestionDetail = () => {
    return(
        <section>
            <div className="question-detail-total-container">
                <div className="question-detail-total-wrapper">
                    <div className="question-detail-upper-contents-wrapper">
                        <div className="question-detail-star-box">
                            <span className="question-detail-question-level">Lv 5</span>
                        </div>
                        <div className="question-detail-text-box">
                            <span className="question-detail-question-name">문제 이름</span>
                            <span className="question-detail-question-description">문제 설명</span>
                        </div>
                    </div>
                    <div className="question-detail-middle-contents-wrapper">
                        <div className="question-detail-left-contents-wrapper">
                            <div className="question-detail-code-box">
                            <span className='question-detail-code-text-bar'>Solution</span>
                            </div>
                            <div className="question-detail-result-box">
                                <span className='question-detail-result-text-bar'>실행 결과</span>
                            </div>
                        </div>
                        <div className="question-detail-right-contents-wrapper">
                            <div className="question-detail-description-box">
                                <span className='question-detail-description-text-bar'>문제 설명</span>
                            </div>
                        </div>
                    </div>
                    <div className="question-detail-bottom-contents-wrapper">
                        <div className="question-detail-button-result-check">채점 결과 확인</div>
                        <div className="question-detail-button-execute-code">코드 실행</div>
                        <div className="question-detail-button-change-language">언어 선택</div>
                        <div className="question-detail-button-reset-code">초기화</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuestionDetail;