const LeaugeTableComponent = ({isCreateLeague, toggleModifyLeague}) =>{
    return(
        <tr>
                <th className="leage-number"></th>
                <th className="leage-name"></th>
                <th className="leage-date"></th>
                <th className="admin-league-table-modify" onClick={toggleModifyLeague}>
                  <div className="admin-league-table-modify-img"></div>
                </th>
                <th className="admin-league-table-delete">
                  <div className="admin-league-table-delete-img"></div>
                </th>
              </tr>
    );
}

export default LeaugeTableComponent;
