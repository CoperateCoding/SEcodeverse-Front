import "../css/Chatbot.css";
import React, { useState } from "react";
import axios from 'axios'
const Chatbot = () => {
  const [activateState, setactivateState] = useState(false); //chatbot popup
  const [messages, setMessages] = useState([
    { sender: "bot", text: "하잉, 저는 COCO 입니다! 무엇을 도와드릴까요?" }
  ]); //chatbot message
  const [userInput, setUserInput] = useState(""); //user input message
  const [formVisible, setFormVisible] = useState(false);
  const [fastQuestionVisible, setFastQuestionVisible] = useState(true);
  const chatBot = (value) => {
    const userMessage = { sender: "user", text: value };
    const updatedMessages = [...messages, userMessage];
  
    axios.get('api/v1/chatbot', {
      params: {
        input: value
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const botMessage = { sender: "bot", text: response.data.response };
      const updatedMessagesWithBot = [...updatedMessages, botMessage];
      setMessages(updatedMessagesWithBot);
    })
    .catch(error => {
      // 에러 처리
      console.error(error);
    });
  };
  
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      setMessages([...messages, { sender: "user", text: userInput }]);
      chatBot(userInput)
     
      setUserInput("");
    }
  };

  const handleQuickQuestionClick = (text) => {
    
    
    chatBot(text)

    
  };

  const handleMenuItemClick = () => {
    setFormVisible(true); // form 보이게 설정
    setFastQuestionVisible(false); // chatbot-popup-fast-question 숨김 설정
  };

  const handleGoBackClick = () => {
    setFormVisible(false); // form 숨김 설정
    setFastQuestionVisible(true); // chatbot-popup-fast-question 보이게 설정
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-circle-box">
        <div
          className="chatbot-circle-image"
          onClick={() => setactivateState(!activateState)}
        />
      </div>
      {activateState && (
        <div className="chatbot-popup-wrapper">
          <div className="chatbot-popup-background">
            <div className="chatbot-popup-upper-layer">
                <span className="chatbot-popup-main-text">Chat Bot</span>
              <div
                className="chatbot-popup-x-button"
                onClick={() => setactivateState(!activateState)}
              ></div>
            </div>
            <div className="chatbot-popup-chat-layer">
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.sender}`}
                    style={{
                      float: message.sender === "bot" ? "left" : "right",
                      clear: "both", // 각 메시지의 아래쪽에 다른 내용이 위치하지 않도록
                      marginTop: "10px", // 각 메시지 사이의 간격
                      marginBottom: "10px", // 각 메시지 사이의 간격
                    }}
                  >
                    <div className="message-content">{message.text}</div>
                  </div>
                ))}
              </div>
            </div>
            {fastQuestionVisible && (
            <div className="chatbot-popup-fast-question">
              <span className="chatbot-popup-fast-question-text">
                {" "}
                [빠른 질문하기]
              </span>
              <ul className="chatbot-popup-fast-question-list">
                <li className="chatbot-popup-fast-question-1"
                 onClick={() => handleQuickQuestionClick("내가 푼 문제는 어디서 확인해?")}>
                  내가 푼 문제는 어디서 확인해?
                </li>
                <li className="chatbot-popup-fast-question-2"
                 onClick={() => handleQuickQuestionClick("문제 등록은 어디서 해?")}>
                  문제 등록은 어디서 해?
                </li>
                <li className="chatbot-popup-fast-question-3"
                 onClick={() => handleQuickQuestionClick("티어에 대해 설명해줘")}>
                  티어에 대해 설명해줘
                </li>
                <li className="chatbot-popup-fast-question-4"
                 onClick={() => handleQuickQuestionClick("CTF가 뭐야?")}>CTF가 뭐야?</li>
               
                <li className="chatbot-popup-fast-question-6" onClick={handleMenuItemClick}>기타</li>
              </ul>
            </div>
            )}
            {formVisible && (
            <form onSubmit={handleSubmit} className="chatbot-input-user-form">
              <input
                className="chatbot-popup-user-input"
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="메시지를 입력하세요..."
              />
              <button className="chatbot-popup-user-submit" type="submit" >
                Send
              </button>
              <button className="chatbot-popup-user-menu" onClick={handleGoBackClick}>
                Menu
              </button>
            </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
