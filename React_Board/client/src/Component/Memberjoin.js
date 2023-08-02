import React, { useState, useEffect } from 'react'
import '../Style/board.css'

function Memberjoin() {
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const onsubmit = (e) => {
        e.preventDefault();
        if (userid === '') {
            return alert('아이디는 필수 입력사항입니다.');
        } else if (pwd === '') {
            return alert('비밀번호는 필수 입력사항입니다.');
        } else if (name === '') {
            return alert('이름은 필수 입력사항입니다.');
        } else {

        }
    }

    return (
        <div id="wrap">
            <form id="join-form">
                <fieldset>
                    <legend>회원가입 - 사용자 등록</legend>
                    <div><input type='text' placeholder='userid' value={userid} onChange={
                        (e) => {
                            setUserid(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='password' placeholder='password' value={pwd} onChange={
                        (e) => {
                            setPwd(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='text' placeholder='name' value={name} onChange={
                        (e) => {
                            setName(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='text' placeholder='phone' value={phone} onChange={
                        (e) => {
                            setPhone(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='text' placeholder='email' value={email} onChange={
                        (e) => {
                            setEmail(e.currentTarget.value);
                        }
                    } /></div>
                    <button onClick={
                        (e) => {
                            onsubmit(e);
                        }
                    }>회원 가입</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Memberjoin
