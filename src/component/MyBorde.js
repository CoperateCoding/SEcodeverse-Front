
import '../css/MyPage.css';
import codingBadge from '../img/codingBadge.png';
import hart from '../img/hart.png'
import comment from '../img/comment.png'
const MyBorde = () => {

    return (
        <><div className='mypageMain'>
            <div className='questionOneLins'>
                <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>게시글 제목</h1>
                        <div className='myBorderBottom'>
                            <img className='hart'src={hart}></img>
                            <h3 className='hartCount'>50</h3>
                            <img className='comment' src={comment}></img>
                            <h3 className='commentCount'>100</h3>
                            <h3 className="borderCreateDate">2023-10-18</h3>

                        </div>
                    </div>
                    
                </div>
                <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>게시글 제목</h1>
                        <div className='myBorderBottom'>
                            <img className='hart'src={hart}></img>
                            <h3 className='hartCount'>50</h3>
                            <img className='comment' src={comment}></img>
                            <h3 className='commentCount'>100</h3>
                            <h3 className="borderCreateDate">2023-10-18</h3>

                        </div>
                    </div>
                    
                </div>
                
                
            </div>
            <div className='questionOneLins'>
                <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>게시글 제목</h1>
                        <div className='myBorderBottom'>
                            <img className='hart'src={hart}></img>
                            <h3 className='hartCount'>50</h3>
                            <img className='comment' src={comment}></img>
                            <h3 className='commentCount'>100</h3>
                            <h3 className="borderCreateDate">2023-10-18</h3>

                        </div>
                    </div>
                    
                </div>
                <div className='wrongQuestion'>
                    <img className='myPagequestionImg' src={codingBadge}>
                        
                    </img>
                    <div className='myPageQuestionContent'>
                        <h1 className='myPageQuestionName'>게시글 제목</h1>
                        <div className='myBorderBottom'>
                            <img className='hart'src={hart}></img>
                            <h3 className='hartCount'>50</h3>
                            <img className='comment' src={comment}></img>
                            <h3 className='commentCount'>100</h3>
                            <h3 className="borderCreateDate">2023-10-18</h3>

                        </div>
                    </div>
                    
                </div>
                
                
            </div>
         
        </div><h1 className='paging'></h1></>

    )
};

export default MyBorde;