import React, { useState } from 'react';
import './AdminMain.css';
import redButton from '../img/redButton.png';
import greenButton from '../img/greenButton.png';
import yellowButton from '../img/yellowButton.png';
import xButton from '../img/x.png';
import modify from '../img/modify.png';
import deleteButton from '../img/delete.png';
const CTFquestion = () => {
    const [isCreateQuestion, setIsCreateQuestion] = useState(false);
    const [isEditQuestion, setIsEditQuestion] = useState(false);

    const handleCreateQuestionClick = () => {
        setIsCreateQuestion(true);
    }

    const handleCancleClik = () => {
        setIsCreateQuestion(false);
        setIsEditQuestion(false);
    }
    
    const sucessCreateQuestionClick = () =>{
        setIsCreateQuestion(false);
    }

    const handleEditQuestionClick= () =>{
        setIsEditQuestion(true);
    }
    
    const succesEditQuestionClick =() => {
        setIsEditQuestion(false);
    }
    return (
        <><div className='right'>
            <h1 className='rightMain'>CTF 문제 관리</h1>
            <div className='topBar'>
                <select name='category'>
                    <option value="">최신순</option>
                    <option value="">점수 오름차순</option>
                </select>
                <div className='createQuestion'>
                    <h1 onClick={handleCreateQuestionClick}>문제 생성</h1>
                </div>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th className='Number'>No.</th>
                            <th className='questionName'>문제 이름</th>
                            <th className='Score'>점수</th>
                            <th className='Category'>카테고리</th>
                            <th className='modify'><img className='modify' src={modify} onClick={handleEditQuestionClick}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>
                        <tr>
                            <th className='Number'></th>
                            <th className='questionName'></th>
                            <th className='Score'></th>
                            <th className='Category'></th>
                            <th className='modify'><img className='modify' src={modify}></img></th>
                            <th className='delete'><img className='modify' src={deleteButton}></img></th>
                        </tr>

                    </thead>
                </table>
            </div>
            <h1 className='paging'>1 2 3 4 5</h1>
        </div>
        <div className='questionEdit' style={{ display: isCreateQuestion ? 'block' : 'none' }}>
                <img className='xButton' src={xButton} alt="xButton"  onClick={handleCancleClik} />
                <div className='questionOneLine'>
                    <h3>문제명</h3>
                    <input className='ctfQuestionName' />
                </div>
                <div className='questionOneLine'>
                    <h3>문제점수</h3>
                    <input className='ctfQuestionScore' />
                    <h3>카테고리</h3>
                    <select name='category'>
                        <option value="">컴퓨터 네트워크</option>
                        <option value="">웹</option>
                        <option value="">자료구조</option>
                        <option value="">SQL</option>
                        <option value="">JSP</option>
                        <option value="">컴퓨터 언어</option>
                        <option value="">운영체제</option>
                        <option value="">인공지능</option>
                        <option value="">UML</option>
                        <option value="">IoT</option>
                        <option value="">모바일</option>
                        <option value="">정보보안</option>
                        <option value="">빅데이터</option>
                        <option value="">기초지식</option>
                        <option value="">데이터베이스</option>

                    </select>
                    <input className='ctfRadio' type="radio" name="" value="" /><h4>객관식</h4>
                    <input className='ctfRadio' type="radio" name="" value="" /><h4>주관식</h4>
                </div>
                <div className='questionOneLine'>
                    <h3>문제 설명</h3>
                    <input className='questionExplan' />
                </div>
                <div className='questionOneLine'>
                    <div className='ctfImgs'></div>
                    <div className='imgplus'></div>
                </div>
                <div className='ctfquestionButton'  onClick={sucessCreateQuestionClick}>
                    <img src={redButton} alt="redButton" />
                    <h3>문제 등록</h3>
                </div>
            </div>
        <div className='questionEdit' style={{ display: isEditQuestion ? 'block' : 'none' }}>
                <img className='xButton' src={xButton} alt="xButton" onClick={handleCancleClik} />
                <div className='questionOneLine'>
                    <h3>문제명</h3>
                    <input className='ctfQuestionName' />
                </div>
                <div className='questionOneLine'>
                    <h3>문제점수</h3>
                    <input className='ctfQuestionScore' />
                    <h3>카테고리</h3>
                    <select name='category'>
                        <option value="">컴퓨터 네트워크</option>
                        <option value="">웹</option>
                        <option value="">자료구조</option>
                        <option value="">SQL</option>
                        <option value="">JSP</option>
                        <option value="">컴퓨터 언어</option>
                        <option value="">운영체제</option>
                        <option value="">인공지능</option>
                        <option value="">UML</option>
                        <option value="">IoT</option>
                        <option value="">모바일</option>
                        <option value="">정보보안</option>
                        <option value="">빅데이터</option>
                        <option value="">기초지식</option>
                        <option value="">데이터베이스</option>

                    </select>
                    <input className='ctfRadio' type="radio" name="" value="" /><h4>객관식</h4>
                    <input className='ctfRadio' type="radio" name="" value="" /><h4>주관식</h4>
                </div>
                <div className='questionOneLine'>
                    <h3>문제 설명</h3>
                    <input className='questionExplan' />
                </div>
                <div className='questionOneLine'>
                    <div className='ctfImgs'></div>
                    <div className='imgplus'></div>
                </div>
                <div className='ctfquestionButton' onClick={succesEditQuestionClick}>
                    <img src={redButton} alt="redButton" />
                    <h3 >수정 완료</h3>
                </div>
            </div></>
    );
};

export default CTFquestion;
