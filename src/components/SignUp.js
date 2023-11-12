import React, { useState } from 'react';
import '../css/SignUp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [inputID, setinputID] = useState('');
    const [inputPW, setinputPW] = useState('');
    const [inputNickname, setinputNickname] = useState('');
    const [inputName, setinputName] = useState('');
    const[checkPW,setCheckPW] = useState('');
    const[message,setmessage]=useState('');
    const performInput = () => {
        setinputID('');
        setinputPW('');
        setinputNickname('');
        setinputName('');
    };

    const handleInputChange = (event) => {
        setinputID(event.target.value);
    };

    const handleInputChangePW = (event) => {
        setinputPW(event.target.value);
    }

    const handleInputChangeNickname = (event) => {
        setinputNickname(event.target.value);
    };

    const handleInputChangeName = (event) => {
        setinputName(event.target.value);
    }

    const handleInputCheckPW = (event) => {
        setCheckPW(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            performInput();
        }
    };
    const handleSignUp = () => {
        
        axios.post('/api/v1/user/signup', {
          id: inputID,
          pw: inputPW,
          name: inputName,
          nickname: inputNickname,
          
        } ,{
            headers: {
              'Content-Type': 'application/json',
            }
          })
        .then(response => {
          console.log(response.data); 
          navigate('/login');
    
        })
        .catch(error => {
          console.error('API 호출 중 에러:', error);
        });
      };

    return (
        <section>
            <div className='signUp-page-container'>
                <div className='signUp-page-wrapper'>
                    <div className='signUp-page-signUp-box'>
                        <div className='signUp-page-signUp-text'>
                            <span>Sign Up</span>
                        </div>
                        <div className='signUp-page-signUp-input-box-wrapper'>
                            <div className='signUp-page-signUp-input-box'>
                                <div className='signUp-page-signUp-input-box-total-wrapper'>
                                    <div className='signUp-page-id-input-wrapper'>
                                        <span className='signUp-page-id-text'>ID</span>
                                        <input type='text' value={inputID} className='signUp-page-id-input-box' placeholder="아이디를 입력하세요" onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                                        <div className='id-check-button'>중복 확인</div>
                                    </div>
                                    <div className='signUp-page-pw-input-wrapper'>
                                        <span className='signUp-page-pw-text'>PW</span>
                                        <input type="password" value={inputPW} className='signUp-page-pw-input-box' placeholder="비밀번호를 입력하세요" onChange={handleInputChangePW} onKeyDown={handleKeyDown}></input>
                                    </div>
                                    <div className='signUp-page-checkPw-input-wrapper'>
                                        <span className='signUp-page-checkPw-text'>PW 확인</span>
                                        <input type="password" value={checkPW} className='signUp-page-checkPw-input-box' placeholder="비밀번호를 입력하세요" onChange={handleInputCheckPW}  ></input>
                                    </div>
                                    <div className='signUp-page-nickName-input-wrapper'>
                                        <span className='signUp-page-nickName-text'>닉네임</span>
                                        <input type="text" value={inputNickname} className='signUp-page-nickName-input-box' placeholder="닉네임을 입력하세요" onChange={handleInputChangeNickname} onKeyDown={handleKeyDown}></input>
                                        <div className='nickName-check-button'>중복 확인</div>
                                    </div>
                                    <div className='signUp-page-name-input-wrapper'>
                                        <span className='signUp-page-name-text'>이름</span>
                                        <input type="text" value={inputName} className='signUp-page-name-input-box' placeholder="이름을 입력하세요" onChange={handleInputChangeName} onKeyDown={handleKeyDown}></input>
                                    </div>
                                </div>
                                <div className='signUp-page-input-button-wrapper'>
                                    <div className='signUp-page-input-button' onClick={handleSignUp}>확인</div>
                                </div>
                            </div>
                        </div>
                        <div className='signUp-page-deco-wrapper'>
                            <div className='signUp-page-deco'></div>
                            <div className='signUp-page-deco'></div>
                            <div className='signUp-page-deco'></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default SignUp;