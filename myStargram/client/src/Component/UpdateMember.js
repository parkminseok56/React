import React, {useState, useEffect} from 'react'
import '../Style/login.css'
import '../Style/updateMember.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateMember(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk ] = useState('');
    const [nick, setNick] = useState('');
    const [phone, setPhone] = useState('');
    const [imgsrc, setImgsrc] = useState('');
    const [profilemsg, setProfilemsg] = useState('');
    

    useEffect(()=>{
        if(props.loginUser.profileimg){
            //console.log('pimg', props.loginUser.profileimg );
            setImgsrc(props.loginUser.profileimg);
        }else{
            setImgsrc('http://localhost:5000/no-image.png');
        }
        setNick(props.loginUser.nick);
        setPhone(props.loginUser.phone);
        setEmail(props.loginUser.email);
    },[]);

    const onSubmit= async ()=>{
        if(!password){return alert('password를 입력하세요');}
        if(password!==passwordChk){return alert('password확인이 일치하지 않습니다');}
        if(!nick){return alert('nick-name을 입력하세요');}
        if(!phone){return alert('전화번호를 입력하세요');}

        await axios.post('/api/member/updateMember', { email, nick, password, phone, profilemsg, imgsrc, provider:props.loginUser.provider })
        window.location.href='http://localhost:3000/home';
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
            <div><input type="text" value={email} disabled /></div>
            <div className='lable'><label>password</label></div><br />
            <div><input type="password" onChange={
                (e)=>{ setPassword(e.currentTarget.value)}
            }/></div>
            <div className='lable'><label>password re-type</label></div><br />
            <div><input type="password" onChange={
                (e)=>{ setPasswordChk(e.currentTarget.value)}
            }/></div>
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
