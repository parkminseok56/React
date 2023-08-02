import React, { useState, useEffect } from 'react'
import '../Style/board.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UpdateMember() {
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const onsubmit = (e) => {
        e.preventDefault();
    }


    return (
        <div>
            <form id="update-form">
                <fieldset>
                    <legend>사용자 정보 수정</legend>
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
                    }>회원 수정</button>
                </fieldset>
            </form>
        </div>
    )
}

export default UpdateMember
