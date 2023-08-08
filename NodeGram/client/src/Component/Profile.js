import React, { useState, useEffect } from 'react';
import '../Style/head.css';
import '../Style/main.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile(props) {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='twit-author profile' style={{ fontWeight: "bold", fontFamily: "Verdana" }}>
                이메일 : {props.loginUser.email}<br />
                nick :{props.loginUser.nick}<br />
                provider:{props.loginUser.provider}<br />
                {(props.loginUser.provider === 'kakao') ? ('sisid : ' + props.loginUser.snsid) : (null)}
                <button className='btn' onClick={() => { navigate('/') }}>메인으로</button>
            </div>
            <hr /><br /><br />
            <div className='twit-author profile' style={{ fontWeight: "bold", fontFamily: "Verdana" }}>
                <div className='follwing half'>
                    <h2>팔로잉 목록</h2>
                    {
                        props.following.map((foll1, idx) => {
                            return (<div key={idx}>{foll1.followingid} - {foll1.nick} - {foll1.email}</div>)
                        })
                    }
                </div>
                <div className='follwers half'>
                    <h2>팔로워 목록</h2>
                    {
                        props.follower.map((foll1, idx) => {
                            return (<div key={idx}>{foll1.followerid} - {foll1.nick} - {foll1.email}</div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;