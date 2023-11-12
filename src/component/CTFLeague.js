
import './AdminMain.css';
import redButton from '../img/redButton.png';
import greenButton from '../img/greenButton.png';
import yellowButton from '../img/yellowButton.png'
import modify from '../img/modify.png'
import deleteButton from '../img/delete.png'
const CTFLeague = () => {

    return (
        <div className='right'>
                        <h1 className='rightMain'>CTF 리그 관리</h1>
                        <div className='topBar'>
                            <select name='category'>
                                <option value="">최신순</option>
                                <option value="">점수 오름차순</option>
                            </select>
                            <div className='createQuestion'>
                                <h1>리그 생성</h1>
                            </div>
                        </div>
                        <div className='Leaguetable'>
                            <table>
                                <th className='Number'>No.</th>
                                <th className='LeagueName'>리그 이름</th>
                                <th className='LeagueDate'>리그 기간</th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                <tr>
                                <th className='Number'></th>
                                <th className='LeagueName'></th>
                                <th className='LeagueDate'></th>
                                <th className='modify'><img className='modify' src={modify}></img></th>
                                <th className='delete'><img className='modify' src={deleteButton}></img></th>
                                </tr>
                                
                                
                            </table>
                        </div>
                        <h1 className='paging'>1 2 3 4 5</h1>
                    </div>
         


    )
};

export default CTFLeague