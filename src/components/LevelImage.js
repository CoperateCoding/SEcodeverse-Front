import React from 'react';

const LevelImage = ({ level }) => {
  let imagePath = null;

  // 난이도에 따라 이미지 경로 설정
  switch (level) {
    case 1:
      imagePath = '/images/grade_01.jpg';
      break;
    case 2:
      imagePath = '/images/grade_02.jpg';
      break;
    case 3:
      imagePath = '/images/grade_03.jpg';
      break;
    case 4:
      imagePath = '/images/grade_04.jpg';
      break;
    case 5:
      imagePath = '/images/grade_05.jpg';
      break;
    case 6:
      imagePath = '/images/grade_06.jpg';
      break;
    default:
      imagePath = null;
  }

  if (imagePath) {
    return <img src={imagePath} alt={level} />;
  } else {
    return null; // level이 1에서 6 사이에 해당하지 않으면 null 반환 (이미지를 삽입하지 않음)
  }
}

export default LevelImage;
