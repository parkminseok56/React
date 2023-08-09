import React, { useState, useEffect } from 'react'
import '../Style/home.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Home(props) {

    const navigate = useNavigate();

    const onLogout = () => {
        axios.post('api/member/logout');
        props.setLoginUser({});
        props.setLogin(false);
        navigate('/');
    }

    return (
        <div id='wrap'>
            <div>
                {
                    (props.loginUser.prfileimg) ?
                        (<img src={`http://localhost:5000/${props.loginUser.prfileimg}`} id='profileimg' />) :
                        (<img src='http://localhost:5000/no-image.png' id='profileimg' />)
                }
                {props.loginUser.nick}
            </div>
            <h1>{props.loginUser.nick} 님 어서오세요.</h1>
            <button>회원 정보 수정</button>
            <button onClick={() => { onLogout(); }}>로그 아웃</button>
        </div>
    )

    export default Home
