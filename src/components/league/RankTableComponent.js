const RankTableComponent = ({rankData, isYou}) => {
  return (
    <tr className={ isYou ? 'highlighted-row' : ""}>
      <td className="league-result-table-rank">{rankData.rank}</td>
      <td className="league-result-table-name">{rankData.teamName}</td>
      <td className="league-result-table-score">{rankData.score}</td>
    </tr>
  );
};

export default RankTableComponent