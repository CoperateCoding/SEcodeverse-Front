
import React, { useState } from 'react';
import '../css/MyPage.css';
import circle from '../img/circle.png';
import codingBadge from '../img/codingBadge.png';
import MyWrongQuestion from './MyWrongQuestion';
import MyQuestion from './MyQuestion';
import SolveQuestion from './SolveQuestion';
import MyBorde from './MyBorde';
const MyPageMain = () => {
    const [currentScreen, setCurrentScreen] = useState('codingBadge');
    const handleButtonClick = (screen) => {
        setCurrentScreen(screen);
    }
    return (
        <>

            <body>
                <div className='user'>
                    <div className='badge'>
                        <img className='mypageCircle' src={circle}></img>
                        <img className='codingBadge' src={codingBadge}></img>
                    </div>
                    <div className='myPageName'>
                        <h1 className='name'>242</h1>
                        <h1 className='classRoom'>컴퓨터소프트웨어공학과</h1>
                    </div>
                    
                </div>
                <div className='mypageHeader'>
                    <button onClick={() => handleButtonClick('codingBadge')}>코딩 뱃지 확인</button>
                    <button onClick={() => handleButtonClick('wrongQuestion')}>틀린 문제</button>
                    <button onClick={() => handleButtonClick('solveQuestion')}>풀었던 문제</button>
                    <button onClick={() => handleButtonClick('createQuestion')}>만든 문제</button>
                    <button onClick={() => handleButtonClick('myBord')}>내 게시글</button>
                    
                </div>
                {currentScreen === 'codingBadge' && <codingBadge />}
                {currentScreen === 'wrongQuestion' && <MyWrongQuestion />}
                {currentScreen === 'solveQuestion' && <SolveQuestion />}
                {currentScreen === 'createQuestion' && <MyQuestion />}
                {currentScreen === 'myBord' && <MyBorde />}
            </body>
            <footer>저희는 코코입니다</footer>
        </>


    )
};

export default MyPageMain