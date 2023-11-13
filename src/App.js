import * as React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import Community from './components/community/Community';
import WriteEditor from './components/community/WriteEditor';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Chatbot from './components/Chatbot';
import SignUp from './components/SignUp';
import CTFLeague from './components/ctf/CTFLeague';
import CTFquestion from './components/ctf/CTFquestion';
import AdminMain from './components/AdminMain';
import MyPageMain from './components/MyPageMain';
import BoardDeatil from './components/community/BoardDetail';
import {useEffect, useState} from "react";
import axios from 'axios'; 
// import logo from './logo.svg';
import QuestionList from './components/question/QuestionList';

import CTFteam from './components/ctf/CTFteam';


function App() {

  const [auth,setAuth] = useState(false);
  useEffect(()=>{
    console.log('로그인 인증값',auth)
  },[auth])


  return (
    <BrowserRouter>
    <div className="App">
    <Header auth={auth} setAuth ={setAuth}/>
    
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/mypage" element={<MyPageMain />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/write" element={<WriteEditor />} />
        <Route path="/community/post" element={<BoardDeatil />} />
        <Route path="/signUp" element={<SignUp/>}/>
        <Route  path="/login" element={<Login setAuth ={setAuth}/>}/>
        <Route path="/question" element={<QuestionList/>}/>
        <Route path="ctfLeague" element={<CTFLeague/>}/>
        <Route path="ctfTeam" element={<CTFteam/>}/>
        <Route path="ctfquestion" element={<CTFquestion/>}/>

      </Routes>
      <Chatbot></Chatbot>
      <Footer/>
    </div>
  </BrowserRouter>
  );


  }
export default App;
