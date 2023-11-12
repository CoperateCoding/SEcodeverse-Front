
import '../css/MyPage.css';
import codingBadge from '../img/codingBadge.png';

const MyWrongQuestion = () => {

    return (
        <><div className='mypageMain'>
            <div className='questionOneLins'>
                <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>문제이름</h1>
                        <h5 className='myPageQUestionContent'>문제설명</h5>
                    </div>
                </div>
                <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>문제이름</h1>
                        <h5 className='myPageQUestionContent'>문제설명</h5>
                    </div>
                </div>
            </div>
            <div className='questionOneLins'>
            <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>문제이름</h1>
                        <h5 className='myPageQUestionContent'>문제설명</h5>
                    </div>
                </div>
                <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>문제이름</h1>
                        <h5 className='myPageQUestionContent'>문제설명</h5>
                    </div>
                </div>
            </div>
        </div><h1 className='paging'></h1></>

    )
};

export default MyWrongQuestion;