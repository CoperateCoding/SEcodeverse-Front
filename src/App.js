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
import AdminMain from './components/AdminMain';
import MyPageMain from './components/MyPageMain';
import BoardDeatil from './components/community/BoardDetail';
import {useEffect, useState} from "react";
import QuestionList from './components/question/QuestionList';
import QuestionDetail from './components/question/QuestionDetail';
import LeagueMain from './components/league/LeagueMain';
import LeagueCategoryList from './components/league/LeagueCategoryList';
import LeagueCategoryDetail from './components/league/LeagueCategoryDetail';
import LeagueResult from './components/league/LeagueResult';


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
        <Route path="/community/post/:pk" element={<BoardDeatil />} />
        <Route path="/signUp" element={<SignUp/>}/>
        <Route  path="/login" element={<Login setAuth ={setAuth}/>}/>
        <Route path="/question" element={<QuestionList/>}/>
        <Route path="/question/detail" element={<QuestionDetail/>}/>
        <Route path="/admin" element={<AdminMain/>}/>
        <Route path="/league" element={<LeagueMain/>}/>
        <Route path="/league/category" element={<LeagueCategoryList/>}/>
        <Route path="/league/category-detail/:category" element={<LeagueCategoryDetail/>}/>
        <Route path="/league/result" element={<LeagueResult/>}/>
      </Routes>
      <Footer/>
    </div>
  </BrowserRouter>
  );


  }
export default App;
