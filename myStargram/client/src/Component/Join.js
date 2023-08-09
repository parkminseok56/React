import React, {useState, useEffect } from 'react'
import '../Style/login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk ] = useState('');
    const [nick, setNick] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = async ()=>{
        if(!email){return alert('이메일을 입력하세요');}
        if(!password){return alert('password를 입력하세요');}
        if(password!==passwordChk){return alert('password확인이 일치하지 않습니다');}
        if(!nick){return alert('nick-name을 입력하세요');}
        if(!phone){return alert('전화번호를 입력하세요');}

        const result = await axios.post('/api/member/join', {email, password, nick, phone } );
        console.log('result : ', result);
        if( result.data.success == 'ok'){
            alert( result.data.message );
            navigate('/');
        }else{
            alert( result.data.message );
        }


    }
    const navigate = useNavigate();
    return (
        <div id="wrap">
            <div id="logo">MyStarGram</div>
            <div className='title'>일반 회원가입</div><br />
            <div className='lable'><label>E-mail</label></div><br />
            <div><input type="text" onChange={
                (e)=>{ setEmail(e.currentTarget.value)}
            }/></div>
            <div className='lable'><label>password</label></div><br />
            <div><input type="password" onChange={
                (e)=>{ setPassword(e.currentTarget.value)}
            }/></div><br />
            <div className='lable'><label>password re-type</label></div><br />
            <div><input type="password" onChange={
                (e)=>{ setPasswordChk(e.currentTarget.value)}
            }/></div><br />
            <div className='lable'><label>nick-name</label></div><br />
            <div><input type="text" onChange={
                (e)=>{ setNick(e.currentTarget.value)}
            }/></div>
            <div className='lable'><label>phone</label></div><br />
            <div><input type="text" onChange={
                (e)=>{ setPhone(e.currentTarget.value)}
            }/></div>
            
            <div><button id='login' onClick={()=>{ onSubmit() }}>회원가입</button></div>
            <div><button id='join' onClick={()=>{navigate('/')}}>되돌아가기</button></div>
        </div>
    )
}

export default Join
