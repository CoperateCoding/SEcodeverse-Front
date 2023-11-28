import { useState } from "react";

const CategoryComponent = (props) => {
    const [isClear, setIsClear] = useState(false);
    const { category } = props;

    const imageUrl = isClear ? "/images/ctf_clear.png" : "/images/ctf_none_clear.png";
  return (
    <div className="league-category-list-category-box">
      <div className="league-category-list-category-img"
      style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="league-category-list-category-text">
        <div>{category}</div>
      </div>
    </div>
  );
};

export default CategoryComponent;
