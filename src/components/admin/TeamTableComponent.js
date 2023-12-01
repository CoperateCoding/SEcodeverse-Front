const TeamTableComponent = ({index, value}) =>{
    return(
        <tr>
            <th className="team-number">{index}</th>
            <th className="team-name">{value.name}</th>
            <th className="team-score">{value.totalScore}</th>
        </tr>
    );
}

export default TeamTableComponent;
