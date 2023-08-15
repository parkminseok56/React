import React, {useState, useEffect} from 'react';
import '../Style/menu.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../Reducer/userSlice';

function MainMenu() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    let user = useSelector( (state)=>{ return state.user} );


    const onLogout = async ()=>{
        await axios.post('api/member/logout');
        dispatch(logoutAction()); // 로그아웃과 함께 redux 내용도 비움
        window.location.href='http://localhost:3000/';
    }

    return (
        <div id="wrap_menu">
            <div id="topmenu">
                <img src="http://localhost:5000/home.png" id='home' onClick={
                    ()=>{ navigate('/home')}
                }/>
                <img src="http://localhost:5000/write.png" id='write' onClick={
                    ()=>{ navigate('/writeFeed')}
                }/>
                <img id="logout" src="http://localhost:5000/search.png" onClick=""/>
                {
                    (user.profileimg)?
                    (<img src={user.profileimg} id='my' onClick={()=>{navigate('/mypage')}}/>) :
                    (<img src="http://localhost:5000/no-image.png" id='my' onClick={()=>{navigate('/mypage')}}/>)
                }
                
                <img id="logout" src="http://localhost:5000/logout.png" onClick={ ()=>{ onLogout(); } }/>
            </div>
        </div>
    )
}

export default MainMenu
