import React, { useEffect, useState } from "react";

const EditQuestion = ({onClose, question, img}) => {

const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("c1");
  const [desc, setDesc] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [level, setLevel] = useState("l1");
  const [testDesc,setTestDesc]= useState('');

  useEffect(() => {
    setTitle(question.title);
    setDescription(question.description);
    setCategory(question.category);
    setDesc(question.content);
    setLevel(question.level);
    setTestDesc(question.testDesc);
    setSelectedFiles(img);
  },[question])
 

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleTypeChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTypeLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleSubmit = () => {
    // 수정 로직 구현
    onClose();
  };

  return (
    <div className="enroll-question-popup-container">
      <div className="enroll-question-popup-wrapper">
        <div className="enroll-question-popup-title-box">
          <span className="enroll-question-popup-title">문제 수정</span>
          <div
            className="enroll-question-popup-cancel"
            onClick={onClose}
          ></div>
        </div>
        <div className="enroll-question-popup-contents-box">
          <div className="enroll-question-popup-contents-title-box">
            <span className="enroll-question-popup-contents-title">제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="enroll-question-popup-contents-title-input"
              type="text"
            />
          </div>
          <div className="enroll-question-popup-contents-description-box">
            <span className="enroll-question-popup-contents-description">
              문제 한줄 설명
            </span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="enroll-question-popup-contents-description-input"
              type="text"
            />
          </div>
          <div className="enroll-question-popup-contents-category-box-wrapper">
            <div className="enroll-question-popup-contents-level-box">
              <span className="enroll-question-popup-contents-level">레벨</span>
              <select
                className="enroll-popup-select-level"
                value={level}
                onChange={handleTypeLevelChange}
              >
                <option value="l1">1</option>
                <option value="l2">2</option>
                <option value="l3">3</option>
                <option value="l4">4</option>
                <option value="l5">5</option>
                <option value="l6">6</option>
              </select>
            </div>
            <div className="enroll-question-popup-contents-category-box">
              <span className="enroll-question-popup-contents-category">
                / 카테고리
              </span>
              <select value={category} onChange={handleTypeChange}>
                <option value="c1">자료구조</option>
                <option value="c2">네트워크</option>
                <option value="c3">수학</option>
              </select>
            </div>
          </div>
          <div className="enroll-question-popup-contents-question-box">
            <span className="enroll-question-popup-contents-question">
              [문제 내용]
            </span>
            <span className="enroll-question-popup-contents-testcase">
              [테스트케이스 설명]
            </span>
            <span className="enroll-question-popup-contents-input-testcase">
              [테스트케이스 입력]
            </span>
            <div className="enroll-question-text-area-wrap">
              <textarea
                type="text"
                className="enroll-question-popup-contents-text-box"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <textarea
                type="text"
                className="enroll-question-popup-contents-testcase-box"
                value={testDesc}
                onChange={(e) => setTestDesc(e.target.value)}
              />
              <div className="enroll-question-test-case">
                <table className="enroll-question-test-case-table">
                  <thead className="enroll-question-test-case-thead">
                    <tr>
                      <th className="enroll-question-test-case-input">
                        입력 값
                      </th>
                      <th className="enroll-question-test-case-result">
                        결과 값
                      </th>
                    </tr>
                  </thead>
                  <tbody className="enroll-question-test-case-tbody">
                    <tr>
                      <td className="enroll-question-test-case-input">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 1 입력"
                          className="testcase1input"
                        ></textarea>
                      </td>
                      <td className="enroll-question-test-case-result">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 1 결과"
                          className="testcase1output"
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="enroll-question-test-case-input">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 2 입력"
                          className="testcase2input"
                        ></textarea>
                      </td>
                      <td className="enroll-question-test-case-result">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 2 결과"
                          className="testcase2output"
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="enroll-question-test-case-input">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 3 입력"
                          className="testcase3input"
                        ></textarea>
                      </td>
                      <td className="enroll-question-test-case-result">
                        <textarea
                          type="text"
                          placeholder="테스트 케이스 3 결과"
                          className="testcase3output"
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <input
              className="enroll-question-popup-contents-file-input"
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div
          onClick={onClose}
          className="enroll-question-popup-yes"
        >
          수정
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
