import React, { useEffect, useState} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../../css/Header.css';
import logo from '../../img/SEcodeVerse_logo.png';

const Header = ({auth, setAuth}) => {
 
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login')
  }
  return (
  
      <header>
        <div className='top_Benner'>
          <div className='header_Benner_contents'>
            <Link to="/"><img className='header_logo' src={logo} alt="로고" /></Link>
            <div className='header_Benner_wrapper'>
              <ul className='header_Bennrer'>
                <li className='header_Benner_item'><Link to="/community">커뮤니티</Link></li>
                <li className='header_Benner_item'><Link to="/question">문제풀기</Link></li>
                <li className='header_Benner_item'>CTF</li>
                <li className='header_Benner_item'><Link to="/mypage">마이페이지</Link></li>
              </ul>
            </div>
            <div className='header_text_btn'>
              <span className='header_login_btn' variant="text" >
                {
                  auth ? 
                  <span onClick={()=>setAuth(false)}>로그아웃</span>:
                  <span onClick={()=>goToLogin()}>로그인</span>
                }
              </span>
              <span className='header_sign_btn' variant="text"><Link to='/signUp'>회원가입</Link></span>
            </div>
          </div>
        </div>
      </header>
   
  );
};

export default Header;
