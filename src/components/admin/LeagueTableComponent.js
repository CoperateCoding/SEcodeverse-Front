import axios from 'axios'
const LeaugeTableComponent = ({index,isCreateLeague, toggleModifyLeague,value}) =>{
  const deleteLeague =() => {
    

  }
    return(
        <tr>
                <th className="leage-number">{index}</th>
                <th className="leage-name">{value.name}</th>
                <th className="leage-date">{value.openTime} ~ {value.closeTime}</th>
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
