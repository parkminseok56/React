import React from 'react'
import '../Style/head.css';
import '../Style/main.css';
function Join() {
    return (
        <div className='timeline'>
            <div id="join-form">
                <div className='input-group'>
                    <label for="join-email">이메일</label>
                    <input id="join-email" type='email' />
                </div>
                <div className='input-group'>
                    <label for="join-nick">닉네임</label>
                    <input id="join-nick" type='nick' />
                </div>
                <div className='input-group'>
                    <label for="join-password">비밀번호</label>
                    <input id="join-password" type='password' />
                </div>
                <button id="join-btn1" className='btn' onClick={
                    () => {

                    }
                }>회원가입</button>
                <button id="join-btn2" className='btn'>돌아가기</button>
            </div>


        </div>
    )
}

export default Join
