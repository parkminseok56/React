import React from 'react';
import '../Style/head.css';
import { useNavigate } from "react-router-dom";

function Heading() {
    const navigate = useNavigate();
    return (
        <>
            <div className="container">
                <div className="profile-wrap">
                    <div className='profile'>
                        <div className='input-group'>
                            <label id="email">이메일</label>
                            <input type='text' />
                        </div>
                        <div className='input-group'>
                            <label for="password">비밀번호</label>
                            <input type='password' />
                        </div>
                        <button className='btn' id="btn1" onClick={
                            () => {
                                navigate('/join')
                            }
                        }>회원가입</button>
                        <button className='btn' id="btn2">로그인</button>
                        <button className='btn' id="btn3">카카오톡</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Heading
