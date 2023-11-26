import "../../css/QuestionBoard.css";
import "../../css/EnrollQuestion.css";
import React, { useState, useEffect } from "react";
import QuestionBoardComponent from "../QuestionBoardComponent";
import axios from "axios";

const QuestionList = () => {
  //페이징
  const [questionList, setQuestionList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);
  const [popupState, setPopupState] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("c1");
  const [desc, setDesc] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [level, setLevel] = useState("l1");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    console.log("selectedFiles", selectedFiles);
  };

  function getSearch() {
    const validation = document.getElementById("searchInput").value;
    setSearch(validation);
    console.log(validation);
  }

  useEffect(() => {
    const apiUrl = "/api/v1/question";
    const params = {
      page: 1,
    };
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const url = `${apiUrl}?${queryString}`;

    axios
      .get(url)
      .then((response) => {
        setQuestionList(response.data.list);
        console.log(response.data.list);
        setTotalpages(
          response.data.cnt % 8 > 0
            ? response.data.cnt / 8 + 1
            : response.data.cnt / 8
        );
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  }, []);

  function getCategoryNum(num) {
    if (num == "Category A") {
      return 1;
    } else if (num == "Category B") {
      return 2;
    }
  }
  function getSort(sort) {
    if (sort == "ascending") {
      return "RECENT";
    } else {
      return "LAST";
    }
  }

  function getCategoryArr(categorys) {
    let newCategorys = [];
    for (let i = 0; i < categorys.length; i++) {
      newCategorys.push(getCategoryNum(categorys[i]));
    }
    return newCategorys;
  }
  const optionList = (paging) => {
    const apiUrl = "/api/v1/question";
    const sort = getSort(sortingOption);
    const categoryPks = getCategoryArr(categoryOptions);
    const levelPks = difficultyOptions;
    const categoryPk = [];
    const levelPk = [];
    const params = {};
    const pages = paging;
    console.log("!categoryPk", categoryPk);
    console.log("sort", sort);
    console.log("level", difficultyOptions);
    if (sort !== null) {
      params.sort = sort;
    }
    if (categoryPks !== null && categoryPks) {
      for (let i = 0; i < categoryPk.length; i++) {
        categoryPk.push(categoryPks[i]);
      }
      params.categoryPk = categoryPks;
    }
    if (levelPks !== null) {
      for (let i = 0; i < categoryPk.length; i++) {
        levelPk.push(levelPks[i]);
      }
      params.levelPk = levelPks;
    }
    if (search != null) {
      params.q = search;
    }

    params.page = pages;
    console.log(params);

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const url = `${apiUrl}?${queryString}`;

    axios
      .get(url)
      .then((response) => {
        setQuestionList(response.data.list);
        console.log(response.data);
        setTotalpages(
          response.data.cnt % 8 > 0
            ? response.data.cnt / 8 + 1
            : response.data.cnt / 8
        );
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  };

  const onSearchClick = () => {
    const keyword = search;
    const apiUrl = "/api/v1/question";
    const sort = getSort(sortingOption);
    const categoryPks = getCategoryArr(categoryOptions);
    const levelPks = difficultyOptions;
    const categoryPk = [];
    const levelPk = [];
    const params = {};
    console.log("categoryPk", categoryPk);
    console.log("sort", sort);
    console.log("level", difficultyOptions);
    if (sort !== null) {
      params.sort = sort;
    }
    if (categoryPks !== null) {
      for (let i = 0; i < categoryPk.length; i++) {
        categoryPk.push(categoryPks[i]);
      }
      params.categoryPk = categoryPks;
    }
    if (levelPks !== null) {
      for (let i = 0; i < categoryPk.length; i++) {
        levelPk.push(levelPks[i]);
      }
      params.levelPk = levelPks;
    }
    params.q = search;

    console.log(params);

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const url = `${apiUrl}?${queryString}`;

    axios
      .get(url)
      .then((response) => {
        setQuestionList(response.data.list);
        console.log("검색 데이터 개수", response.data.cnt);
        setTotalpages(
          response.data.cnt % 8 > 0
            ? response.data.cnt / 8 + 1
            : response.data.cnt / 8
        );
        console.log("검색 패이징 개수", response.data.cnt / 8);
      })
      .catch((error) => {
        console.error("API 호출 중 에러:", error);
      });
  };

  const [optionState, setoptionState] = useState(false);

  const [difficultyOptions, setDifficultyOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [sortingOption, setSortingOption] = useState("ascending");

  const handleDifficultyChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDifficultyOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setDifficultyOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
    }
  };
  const handleOtopionState = () => {
    //초기화
    setDifficultyOptions([]);
    setCategoryOptions([]);
    setSortingOption("ascending");
    setoptionState(!optionState);
  };
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCategoryOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setCategoryOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
    }
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      optionList(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };
  const buttonClick = (n) => {
    setCurrentPage(n);

    optionList(n);
  };
  const handleTypeChange = (e) => {
    setCategory(e.target.value);
  };
  const handleTypeLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      optionList(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = (event) => {
    setoptionState(false);
    event.preventDefault();
    alert(
      `난이도 선택: ${difficultyOptions.join(
        ", "
      )}\n카테고리 선택: ${categoryOptions.join(
        ", "
      )}\n정렬 방식: ${sortingOption}`
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfMaxVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => buttonClick(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleRegisterClick = async () => {
    const parseCategory = parseInt(category.replace(/[^\d]/g, ""));
    const parseLevel = parseInt(level.replace(/[^\d]/g, ""));
    const testCase1input =
      document.getElementsByClassName("testcase1input")[0].value;
    const testCase1output =
      document.getElementsByClassName("testcase1output")[0].value;
    const testCase2input =
      document.getElementsByClassName("testcase2input")[0].value;
    const testCase2output =
      document.getElementsByClassName("testcase2output")[0].value;
    const testCase3input =
      document.getElementsByClassName("testcase3input")[0].value;
    const testCase3output =
      document.getElementsByClassName("testcase3output")[0].value;
    console.log(parseCategory);
    console.log(parseLevel);
    console.log(testCase1input);
    console.log(testCase1output);
    console.log(testCase2input);
    console.log(testCase2output);
    console.log(testCase3input);
    console.log(testCase3output);
    console.log(title);
    console.log(desc);
    console.log(description);
    console.log("사용자가 올린 파일 수는", selectedFiles);
    var imgUrl = [];
    if (selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const uploadFile = selectedFiles[i];

        console.log(uploadFile);
        try {
          const presignedResponse = await axios.post(
            "/api/v1/s3/presigned",
            {
              imageName: uploadFile.name,
              folderName: "question",
            },
            {
              headers: {
                Authorization: localStorage.getItem("accessToken"),
              },
            }
          );

          const presignedUrl = presignedResponse.data.presigned_url;
          console.log("presignedUrl:", presignedUrl);
          console.log(uploadFile.type);
          console.log(uploadFile.name);

          const uploadResponse = await axios.put(presignedUrl, uploadFile, {
            headers: {
              "Content-Type": uploadFile.type,
            },
          });

          console.log("S3 업로드 성공", uploadResponse);

          const imageUrl = uploadResponse.request.responseURL;
          var fileName = "";
          if (uploadFile.type === "image/jpg") {
            fileName = imageUrl.substring(0, imageUrl.lastIndexOf(".jpg") + 4);
          } else if (uploadFile.type === "image/png") {
            fileName = imageUrl.substring(0, imageUrl.lastIndexOf(".png") + 4);
          } else if (uploadFile.type === "image/jpeg") {
            fileName = imageUrl.substring(0, imageUrl.lastIndexOf(".jpg") + 4);
          }
          console.log(imageUrl);
          console.log(fileName);
          imgUrl.push(fileName);
        } catch (error) {
          console.error("S3 업로드 실패", error);
        }
      }
    }
    const img = [];

    for (let i = 0; i < imgUrl.length; i++) {
      const imageUrl = imgUrl[i];
      img.push({ imgUrl: imageUrl });
    }
    const testCase = [
      {
        input: testCase1input,
        output: testCase1output,
      },
      {
        input: testCase2input,
        output: testCase2output,
      },
      {
        input: testCase3input,
        output: testCase3output,
      },
    ];

    var data = [];
    if (imgUrl.length > 0) {
      data = {
        question: {
          categoryPk: parseCategory,
          levelPk: parseLevel,
          title: title,
          intro: desc,
          content: desc,
          language: "java/python/c++/c",
        },
        img,
        testCase,
      };
    } else {
      data = {
        question: {
          categoryPk: parseCategory,
          levelPk: parseLevel,
          title: title,
          intro: desc,
          content: desc,
          language: "java/python/c++/c",
        },
        testCase,
      };
    }

    if (title.trim() === "" || desc.trim() === "") {
      alert("제목과 내용을 입력해주세요.");
    } else {
      // 등록 처리

      axios
        .post("/api/v1/question/post", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((response) => {
          console.log(localStorage.getItem("access"));
          console.log(response.data);
        })
        .catch((error) => {
          console.error("API 호출 중 에러:", error);
        });

      // 등록 처리
      setTitle("");
      setDescription("");
      setCategory("카테고리1"); // 등록 후에 type을 다시 기본값으로 설정합니다.
      setDesc("");
      setPopupState(false);
      setSelectedFiles([]);
    }
  };

  return (
    <section>
      <div className="question-board-container">
        <div className="question-board-wrapper">
          <div className="question-board-top-wrapper">
            <input
              id="searchInput"
              className="question-board-input-box"
              placeholder="검색어를 입력하세요"
              onChange={getSearch}
            ></input>
            <div className="question-board-search" onClick={onSearchClick}>
              검색
            </div>
            <div
              className="question-board-option"
              onClick={() => handleOtopionState()}
            >
              옵션
            </div>
            <div
              className="question-board-enroll-question"
              onClick={() => setPopupState(!popupState)}
            >
              문제등록
            </div>
          </div>
          <div className="question-board-middle-wrapper">
            {optionState && (
              <div className="question-board-option-box">
                <form onSubmit={handleSubmit}>
                  <div className="question-board-option-boxes">
                    <div className="question-board-option-box1">
                      <label className="question-board-option-difficult">
                        난이도 선택 :
                        <input
                          type="checkbox"
                          value="1"
                          onChange={handleDifficultyChange}
                        />{" "}
                        1
                        <input
                          type="checkbox"
                          value="2"
                          onChange={handleDifficultyChange}
                        />{" "}
                        2
                        <input
                          type="checkbox"
                          value="3"
                          onChange={handleDifficultyChange}
                        />{" "}
                        3
                        <input
                          type="checkbox"
                          value="4"
                          onChange={handleDifficultyChange}
                        />{" "}
                        4
                        <input
                          type="checkbox"
                          value="5"
                          onChange={handleDifficultyChange}
                        />{" "}
                        5
                        <input
                          type="checkbox"
                          value="6"
                          onChange={handleDifficultyChange}
                        />{" "}
                        6
                      </label>
                    </div>
                    <div className="question-board-option-box2">
                      <label className="question-board-option-category">
                        카테고리 선택 :
                        <br />
                        <input
                          type="checkbox"
                          value="Category A"
                          onChange={handleCategoryChange}
                        />{" "}
                        자료구조
                        <br />
                        <input
                          type="checkbox"
                          value="Category B"
                          onChange={handleCategoryChange}
                        />{" "}
                        사칙연산
                        <br />
                      </label>
                    </div>
                    <div className="question-board-option-box3">
                      <label className="question-board-option-sort">
                        정렬 방식 선택 :
                        <input
                          type="radio"
                          value="ascending"
                          checked={sortingOption === "ascending"}
                          onChange={handleSortingChange}
                        />{" "}
                        오름차순
                        <input
                          type="radio"
                          value="descending"
                          checked={sortingOption === "descending"}
                          onChange={handleSortingChange}
                        />{" "}
                        내림차순
                      </label>
                    </div>
                  </div>
                  <button
                    className="question-board-option-submit-btn"
                    type="submit"
                    onClick={() => optionList(1)}
                  >
                    선택
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="question-board-bottom-wrapper">
            <div className="question-board-contents-wrapper">
              <QuestionBoardComponent posts={questionList} />
            </div>
          </div>
        </div>

        <div className="question-list-paging">
          <button onClick={handlePrevClick}>&lt;</button>
          {renderPageNumbers()}
          <button onClick={handleNextClick}>&gt;</button>
        </div>
        {popupState && (
          <div className="enroll-question-popup-container">
            <div className="enroll-question-popup-wrapper">
              <div className="enroll-question-popup-title-box">
                <span className="enroll-question-popup-title">문제 등록</span>
                <div
                  className="enroll-question-popup-cancel"
                  onClick={() => setPopupState(!popupState)}
                ></div>
              </div>
              <div className="enroll-question-popup-contents-box">
                <div className="enroll-question-popup-contents-title-box">
                  <span className="enroll-question-popup-contents-title">
                    제목
                  </span>
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
                    <span className="enroll-question-popup-contents-level">
                      레벨
                    </span>
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
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
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
                onClick={handleRegisterClick}
                className="enroll-question-popup-yes"
              >
                등록
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionList;
