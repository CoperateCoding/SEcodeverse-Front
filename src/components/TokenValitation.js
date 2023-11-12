import axios from "axios";
export const tokenValitation = (accessToken)=>{
    axios.get('api/v1/token/validate',{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        // 응답 처리
        console.log(response.data);
     
      })
      .catch(error => {
        // 오류 처리
        console.error(error);
      });
}