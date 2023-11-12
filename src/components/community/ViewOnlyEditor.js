import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ViewOnlyEditor = ({ savedContent }) => {
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    if (savedContent) {
      setReadOnly(true); // 저장된 내용을 불러왔을 때, 에디터를 읽기 전용으로 설정
    }
  }, [savedContent]);

  return (
      <ReactQuill
        value={savedContent}
        readOnly={readOnly} // 읽기 전용 속성 적용
      />
  );
};

export default ViewOnlyEditor;
