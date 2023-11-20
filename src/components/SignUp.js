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
    const[idSentence,setIDsentence] = useState('중복확인  후 회원가입을 시도해주세요')
    const[nickNameSentence,setNickNameSentence] = useState('중복확인  후 회원가입을 시도해주세요')
    const[buttonSentence,setButtonSentence] = useState('아이디와 닉네임 중복확인 후 시도해주세요')
    const[isExistenceId,setisExistenceId]= useState(true)
    const[isExistenceNickName,setisExistenceNickName]= useState(true)
    const[isNotify,setIsNotyfy]=useState(false)
    //아이디 중복검사까지만 함
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

    const isIDExistence = () => {
        const id = inputID;
      
        axios
          .get(`api/v1/user/id/${id}/exists`)
          .then((response) => {
            console.log(response.data);
            if (response.data.exists === true) {
              setIDsentence('이미 존재하는 아이디입니다.');
              setisExistenceId(true);
            } else {
              setisExistenceId(false);
              setIDsentence('사용 가능한 아이디입니다.');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const isNickNamExistence = () => {
        const nickName = inputNickname
        axios
      .get(`api/v1/user/nickname/${nickName}/exists`)
      .then((response) => {
        console.log(response.data)
      
        if(response.data.exists == true){
            setNickNameSentence('이미 존재하는 닉네임입니다.')
            setisExistenceNickName(true)
        }
        else{
            setisExistenceNickName(false)
            setNickNameSentence('사용가능한 닉네임입니다.')
        }
       
      })
      .catch((error) => {
        console.error(error);
      });
    }

    const handleSignUp = () => {
        console.log(isExistenceId)
        console.log(isExistenceNickName)
        if(isExistenceId== true || isExistenceNickName == true){
            setIsNotyfy(true)
        }else{
        axios.post('/api/v1/user/signup', {
          id: inputID,
          pw: inputPW,
          name: inputName,
          nickname: inputNickname,
          
        })
        .then(response => {
          console.log(response.data); 
          navigate('/login');
    
        })
        .catch(error => {
          console.error('API 호출 중 에러:', error);
        });
    }
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
                                        <div className='id-check-button' onClick={isIDExistence}>중복 확인</div>
                                        <h1>{idSentence}</h1>
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
                                        <div className='nickName-check-button' onClick={isNickNamExistence}>중복 확인</div>
                                        <h1>{nickNameSentence}</h1>
                                    </div>
                                    <div className='signUp-page-name-input-wrapper'>
                                        <span className='signUp-page-name-text'>이름</span>
                                        <input type="text" value={inputName} className='signUp-page-name-input-box' placeholder="이름을 입력하세요" onChange={handleInputChangeName} onKeyDown={handleKeyDown}></input>
                                    </div>
                                </div>
                                {isNotify && <h1 className="signUp-buttonSentence">{buttonSentence}</h1>}

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