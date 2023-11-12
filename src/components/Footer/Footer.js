import '../../css/Footer.css';

const Footer = () =>{
    return(
        <footer className='footer_wrap'>
            <div className="footer_contents">
                <a href className='footer-coco'>제작 : CoCo</a>
                <a href className='footer-matter-source'>문제 출처 : 프로그래머스, 한국 정보 올림피아드, ICPC, ICPC Korea</a>
            </div>
        </footer>
    )
}
export default Footer