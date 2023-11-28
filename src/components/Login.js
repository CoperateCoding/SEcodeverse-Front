import React, { useCallback,createContext, useState } from 'react';
import '../css/Login.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setAuth}) => {

    const navigate = useNavigate();
    const [inputID, setinputID] = useState('');
    const [inputPW, setinputPW] = useState('');
    const[accessToken,setAccessToken]= useState('');
    const[refreshToken,setRefreshToken]=useState('');
  
    
    
    const performInput = () => {
        setinputID('');
        setinputPW('');
    };
  
    const handleInputChange = (event) => {
        setinputID(event.target.value);
    };

    const handleInputChangePW = (event) => {
        setinputPW(event.target.value);
    }
  
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            performInput();
        }
    };

    const handleLogin = () => {
      
        axios.post('/api/v1/user/login', {
          id: inputID,
          pw: inputPW,
          
        } ,{
            headers: {
              'Content-Type': 'application/json',
            }
          })
        .then(response => {
          const accessToken =response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          setAccessToken(accessToken)
          setRefreshToken(refreshToken)
          console.log("로그인 테스트",localStorage.getItem('access'));
          localStorage.setItem('access',accessToken)

          setAuth(true)
          navigate('/');
  
        })
        .catch(error => {
          console.error('API 호출 중 에러:', error);
        });

      };

      
    return(
        <section>
            <div className='login-page-container'>
                <div className='login-page-wrapper'>
                    <div className='login-page-login-box'>
                        <div className='login-page-login-text'>
                            <span>LOGIN</span>
                        </div>
                        <div className='login-page-login-input-box-wrapper'>
                            <div className='login-page-login-input-box'>
                                <div className='login-page-login-input-box-total-wrapper'>
                                    <div className='login-page-id-input-wrapper'>
                                        <span className='login-page-id-text'>ID</span>
                                        <input type='text' value={inputID} className='login-page-id-input-box' placeholder="아이디를 입력하세요" onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                                    </div>
                                    <div className='login-page-pw-input-wrapper'>
                                        <span className='login-page-pw-text'>PW</span>
                                        <input type="password" value={inputPW} className='login-page-pw-input-box' placeholder="비밀번호를 입력하세요" onChange={handleInputChangePW} onKeyDown={handleKeyDown}></input>
                                    </div>
                                </div>
                                <button className='login-page-login-check-box' onClick={handleLogin}>LOGIN</button>
                            </div>
                        </div>
                        <div className='login-page-deco-wrapper'>
                            <div className='login-page-deco'></div>
                            <div className='login-page-deco'></div>
                            <div className='login-page-deco'></div>
                        </div>
                    </div>
                    <div className='login-page-sub-button-wrapper'>
                        <Link to="/signUp"><div className='login-pate-sign-up-btn'>회원가입</div></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login