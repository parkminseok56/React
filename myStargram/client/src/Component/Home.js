import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Style/home.css';

function Home( props ) {
    const navigate = useNavigate()
    
    useEffect(()=>{
        console.log(props.login)
        console.log(props.loginUser.profileimg);
    }, []);

    const onLogout = async ()=>{
        await axios.post('api/member/logout');
        window.location.href='http://localhost:3000/';
    }
    return (
        <div id="wrap">
                <div id='profile'>
                    <h3>
                        {
                            (props.loginUser.profileimg)?
                            (<img src={props.loginUser.profileimg} id='profileimg' />) :
                            ( <img src="http://localhost:5000/no-image.png" id='profileimg' />)
                        }
                        &nbsp;&nbsp;{props.loginUser.nick}<br /><br /> 
                        {props.loginUser.profilemsg}
                        {/* <br /><button className='edit' onClick={
                            ()=>{ navigate('/updateMember'); }
                        }>회원정보 수정</button>
                        &nbsp;&nbsp;<button className='edit' onClick={ ()=>{ onLogout(); } }>로그아웃</button> */}
                    </h3>
                </div>
            
        </div>
    )
}

export default Home
