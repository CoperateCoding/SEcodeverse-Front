import LevelImage from "../LevelImage";

const BoardInfoComponent = ({info}) => {

  return (
    <>
      <div className="board-detail-user-badge"><LevelImage level={info.level}/></div>
      <div className="board-detail-info-wrapper">
        <span className="board-detail-category">{info.category}</span>
        <span className="board-detail-writer">{info.writer}</span>
        <span className="board-detail-date">{info.date}</span>
      </div>
    </>
  );
};

export default BoardInfoComponent;
