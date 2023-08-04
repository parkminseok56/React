import React from 'react'

function Heading() {
    return (
        <>
            <div className='input-group'>
                <label id="email">이메일</label>
                <input type='text' />
            </div>
            <div className='input-group'>
                <label for="password">비밀번호</label>
                <input type='password' />
            </div>
            <button>회원가입</button>
            <button className='btn'>로그인</button>
            <button className='btn'>카카오톡</button>
        </>
    )
}

export default Heading
