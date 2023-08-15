import React, {useState, useEffect} from 'react'
import '../Style/login.css'
import '../Style/updateMember.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../Reducer/userSlice';

function UpdateMember() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let user = useSelector( (state)=>{ return state.user} );

    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk ] = useState('');
    const [nick, setNick] = useState('');
    const [phone, setPhone] = useState('');
    const [imgsrc, setImgsrc] = useState('');
    const [profilemsg, setProfilemsg] = useState('');
    
    useEffect(()=>{
        async function fetchData(){
            if(user.profileimg){
                setImgsrc(user.profileimg);
            }else{
                setImgsrc('http://localhost:5000/no-image.png');
            }
            setNick(user.nick);
            setPhone(user.phone);
            setProfilemsg(user.profilemsg);
        }
        fetchData();
    },[]);

    const onSubmit= async ()=>{
        if(user.provider=='local' && !password){return alert('password를 입력하세요');}
        if(user.provider=='local' && password!==passwordChk){return alert('password확인이 일치하지 않습니다');}
        if(!nick){return alert('nick-name을 입력하세요');}
        if(!phone){return alert('전화번호를 입력하세요');}

        await axios.post('/api/member/updateMember', { email:user.email, nick, password, phone, profilemsg, imgsrc, provider:user.provider });
        
        const updateUser = {email:user.email, uid:user.uid, nick, password, phone, profilemsg, profileimg:imgsrc, provider:user.provider};
        dispatch( loginAction(updateUser) );

        window.location.href='http://localhost:3000/mypage';
    }
    
    const profileimgUpload = async (e)=>{
        let formData = new FormData();
        formData.append('image', e.target.files[0]);
        const result = await axios.post('/api/member/imgup', formData );
        // console.log('filename :', `http://localhost:5000/${result.data.filename}`);
        setImgsrc( `http://localhost:5000/${result.data.filename}` );
    }

    return (
        <div id="wrap">
            <div className='title'>회원 정보 수정</div><br />

            <img src={imgsrc} className='profileimg'/>
            <br /><br /><input type="file" onChange={
                (e)=>{ profileimgUpload(e) }
            } style={{width:"30%", fontSize:"90%", height:"25px"}}/>

            <div className='lable'><label>E-mail</label></div><br />
            <div><input type="text" value={user.email} disabled /></div>
            
            
            {(user.provider==='local')?
            (<>
                <div className='lable'><label>password</label></div><br />
                <div><input type="password" onChange={
                    (e)=>{ setPassword(e.currentTarget.value)}
                }/></div>
                <div className='lable'><label>password re-type</label></div><br />
                <div><input type="password" onChange={
                    (e)=>{ setPasswordChk(e.currentTarget.value)}
                }/></div>
            </>):(<>
                <div className='lable'><label>password</label></div><br />
                <div><input type="password" disabled/></div>
                <div className='lable'><label>password re-type</label></div><br />
                <div><input type="password" disabled/></div>
            </>)}


            <div className='lable'><label>nick-name</label></div><br />
            <div><input type="text" value={nick} onChange={
                (e)=>{ setNick(e.currentTarget.value)}
            }/></div>
            <div className='lable'><label>phone</label></div><br />
            <div><input type="text" value={phone}  onChange={
                (e)=>{ setPhone(e.currentTarget.value)}
            }/></div>
            <div className='lable'><label>자기 소개</label></div><br />
            <div><input type="text" value={profilemsg}  onChange={
                (e)=>{ setProfilemsg(e.currentTarget.value)}
            }/></div>
            
            <div><button id='login' onClick={()=>{ onSubmit() }}>수정</button></div>
            <div><button id='join' onClick={()=>{navigate('/home')}}>되돌아가기</button></div>
        </div>
    )
}

export default UpdateMember
