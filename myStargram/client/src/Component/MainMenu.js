import React, {useState, useEffect} from 'react';
import '../Style/menu.css';
import axios from "axios";

function MainMenu(props) {

    const onLogout = async ()=>{
        await axios.post('api/member/logout');
        window.location.href='http://localhost:3000/';
    }

    return (
        <div id="wrap_menu">
            <div id="topmenu">
                <img src="http://localhost:5000/home.png" id='home' />
                <img src="http://localhost:5000/write.png" id='write'/>
                {
                    (props.loginUser.profileimg)?
                    (<img src={props.loginUser.profileimg} id='my' />) :
                    (<img src="http://localhost:5000/no-image.png" id='my' />)
                }
                <img src="http://localhost:5000/logout.png" id='write' onClick={ ()=>{ onLogout(); } }/>
            </div>
        </div>
    )
}

export default MainMenu
