import React, { useEffect, useState} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../../css/Header.css';
import axios from 'axios';
const Header = ({auth, setAuth}) => {
 
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login')
  }
  const gotoLogout = () => {
      console.log("로그아웃할시 가지고 있는 토큰은",localStorage.getItem("accessToken"))
      if(localStorage.getItem('access')!=null){
        axios.post(`${process.env.REACT_APP_DB_HOST}`+'/api/v1/user/logout', {

      
        } ,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          })
        .then(response => {
         
          console.log(response.data)
          setAuth(false)
          localStorage.removeItem('access');
          localStorage.removeItem('roleType')
          console.log(localStorage.getItem('access'))
          navigate('/')
        })
        .catch(error => {
          console.error('로그아웃 시 에러', error);
        });
      }
      

  };
  const goMyPage = () =>{
    if(localStorage.getItem('access')===null){
     alert("로그인 후 이용 가능한 서비스 입니다.")
    }
    else{
      if(localStorage.getItem('roleType')==="USER"){
        navigate('/mypage')
      }
      else{
        navigate('/admin')
      }
      
    }
  }
  return (
  
      <header>
        <div className='top_Benner'>
          <div className='header_Benner_contents'>
            <Link to="/"><div className='header_logo' alt="로고"></div></Link>
            <div className='header_Benner_wrapper'>
              <ul className='header_Bennrer'>
                <li className='header_Benner_item'><Link to="/community">커뮤니티</Link></li>
                <li className='header_Benner_item'><Link to="/question">문제풀기</Link></li>
                <li className='header_Benner_item'><Link to="/league">CTF</Link></li>
                <li className='header_Benner_item' onClick={ goMyPage}>마이페이지</li>
              </ul>
            </div>
            <div className='header_text_btn'>
              <span className='header_login_btn' variant="text" >
                {
                  auth ? 
                  <span onClick={()=>gotoLogout()}>로그아웃</span>:
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
