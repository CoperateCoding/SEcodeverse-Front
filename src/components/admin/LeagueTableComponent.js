import axios from 'axios'
const LeaugeTableComponent = ({index,isCreateLeague, toggleModifyLeague,value}) =>{
  const deleteLeague =() => {
    const apiUrl = `${process.env.REACT_APP_DB_HOST}`+`/api/v1/admin/ctf/league/${value.leaguePk}`;
      axios.delete(apiUrl,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
        .then(response => {
          console.log(response.data)
          window.location.reload();
        
        
        })
        .catch(error => {
          console.error('리그 삭제 중 에러:', error);
        });



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
                  <div className="admin-league-table-delete-img" onClick={deleteLeague}></div>
                </th>
              </tr>
    );
}

export default LeaugeTableComponent;
