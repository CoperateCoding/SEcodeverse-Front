import './Header.css';
import logo from '../img/SEcodeVerse_logo.png';
import Button from '@mui/material/Button';

const Header = () =>{
    return(
        <header>
            <div className='Top_Benner'>
                <div className='header_Benner_contents'>
                    <img className='header_logo' src={logo} alt="로고"/>
                    <h1 className='header_Benner_item'>커뮤니티</h1>
                    <h1 className='header_Benner_item'>문제풀기</h1>
                    <h1 className='header_Benner_item'>그룹</h1>
                    <h1 className='header_Benner_item'>마이페이지</h1>
                </div>
                <div className='header_text_btn'>
                    <Button className='header_login_btn' variant="text">로그인</Button>
                    <Button className='header_sign_btn' variant="text">회원가입</Button>
                </div>
            </div>
        </header>
    )
}

export default Header