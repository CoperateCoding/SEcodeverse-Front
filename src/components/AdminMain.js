
import React, { useState } from 'react';
import '../css/AdminMain.css';
import redButton from '../img/redButton.png';
import greenButton from '../img/greenButton.png';
import yellowButton from '../img/yellowButton.png'
import xButton from '../img/x.png';
import modify from '../img/modify.png';
import deleteButton from '../img/delete.png';
import CTFquestion from '../components/ctf/CTFquestion';
import CTFLeague from '../components/ctf/CTFLeague';
import CTFteam from '../components/ctf/CTFteam';

const AdminMain = () => {
    const [currentScreen, setCurrentScreen] = useState('CTFQuestion');
    const handleButtonClick  =(screen) => {
        setCurrentScreen(screen);
    };

    return (
        <>
            <section>
                <div className='mainBoard'>
                    <div className='left'>
                        <div className='menu_contents'>
                            <img src={redButton}></img>
                            <h1 className='CTFQ' onClick={() => handleButtonClick('CTFQuestion')}>CTF 문제관리</h1>
                            <h1 className='CTFT' onClick={() => handleButtonClick('CTFT')}>CTF 팀관리</h1>
                            <h1 className='ctfRig' onClick={() => handleButtonClick('ctfRig')}>CTF 리그관리</h1>
                            <img src={yellowButton} className='yelloButton'></img>

                            <img src={greenButton} ></img>

                        </div>
                    </div>
                    {currentScreen === 'CTFQuestion' && <CTFquestion />}
                    {currentScreen === 'CTFT' && <CTFteam />}
                    {currentScreen === 'ctfRig' && <CTFLeague />}
                </div>
            </section>
        </>
    )
};

export default AdminMain