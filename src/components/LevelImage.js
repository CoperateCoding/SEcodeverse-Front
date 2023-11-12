import React from 'react';
import grade_01 from '../img/grade_01.jpg';
import grade_02 from '../img/grade_02.jpg';
import grade_03 from '../img/grade_03.jpg';
import grade_04 from '../img/grade_04.jpg';
import grade_05 from '../img/grade_05.jpg';
import grade_06 from '../img/grade_06.jpg';

const LevelImage = ({ level }) => {
  console.log(typeof level)
let imagePath = null;

  // 난이도에 따라 이미지 경로 설정
  if (level === 1) {
    imagePath = grade_01
  } else if (level === 2) {
    imagePath = grade_02
  } else if (level === 3) {
    imagePath = grade_03
  } else if (level === 4) {
    imagePath = grade_04
  } else if (level === 5) {
    imagePath = grade_05
  } else if (level === 6) {
    imagePath = grade_06
  }

  if (imagePath) {
    return <img src={imagePath} alt={level} />;
  } else {
    return null; // level이 1에서 6 사이에 해당하지 않으면 null 반환 (이미지를 삽입하지 않음)
  }
}

export default LevelImage;