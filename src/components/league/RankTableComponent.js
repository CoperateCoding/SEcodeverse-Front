const RankTableComponent = ({rank, rankData, isYou}) => {
  return (
    <tr className={ isYou ? 'highlighted-row' : ""}>
      <td className="league-result-table-rank">{rank+1}</td>
      <td className="league-result-table-name">{rankData.name}</td>
      <td className="league-result-table-score">{rankData.score}</td>
    </tr>
  );
};

export default RankTableComponent