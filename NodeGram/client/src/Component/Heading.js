import React,{useState, useEffect} from 'react';
import '../Style/head.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Heading( props ) {
    const navigate = useNavigate();

    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    // 현재 로그인 한 사람의 정보를 저장할 state 변수
    //const [ loginUser, setLoginUser] = useState({});
    //const [ login, setLogin ] = useState(false);
    //const [ follower, setFollower ] = useState([]);
    //const [ following, setFollowing ] = useState([]);

    
    useEffect(()=>{
        async function fetchData() {
            try{
                /*
                let result = await axios.get('/api/auth/getLoginUser');
                if(result.data.loginUser){
                    setLoginUser( result.data.loginUser );
                    setLogin(true);
                    let result2=await axios.get(`/api/user/getFollowers/${result.data.loginUser.id}`)
                    setFollower([...result2.data]);  // loginuser를 follow 하는 사람들 
                    let result3=await axios.get(`/api/user/getFollowings/${result.data.loginUser.id}`);
                    setFollowing([...result3.data]);  // loginuser 가 follow 하는 사람들
                    console.log('follower', result2.data);
                    console.log('following', result3.data);
                }else{
                    setLoginUser({});
                    setLogin(false);
                }  
                */
            }catch(err){
                console.error(err);
            }
        } // useEffect 안에서 비동기함수를 동기식으로 전환하려면 async 함수에안에서 전환실행하고 그 async 함수를 호출할는 방식을 사용합니다
        fetchData();
    } , [] );
    

    const onLoginLocal = ()=>{
        axios.post('/api/auth/login', {email, password} )
        .then((result)=>{
            if( result.data.login === 'fail'){
                return alert(result.data.msg);
            }else{
                props.setLoginUser( result.data.loginUser );
                props.setLogin(true);
                window.location.reload();
            }   
        })
        .catch((err)=>{console.error(err)});
    }




    const onLoginKakao = ()=>{

        window.location.href='http://localhost:5000/api/auth/kakao';

        // 1. /api/auth/kakao -> kakao 서버로 -> 아이디비번 입력 로그인 -> kakako/callback -> 토큰키받아서 사용자정보 요청 -> 로그인 처리
        // axios 는 요청 후 응답이 바로 이루어져야 하므로 카카오 로그인 루틴에 부적합

        /*
        axios.get('/api/auth/kakao')
        .then((result)=>{
            setLoginUser( result.data.loginUser );
        })
        .catch((err)=>{ console.error(err);})
        */
    }

    const onLogout = ()=>{
        axios.post('api/auth/logout')
        .then((result)=>{
         })
        .catch((err)=>{})
        props.setLoginUser({});
        props.setLogin(false);
        window.location.reload();
    }
    
    return (
        <>
            <div className="container">
                <div className="profile-wrap">
                    <div className="profile">
                        {
                            (props.login)?
                            (
                                <>
                                    <div className="user-name">안녕하세요 {props.loginUser.nick}님</div>
                                    <div className="half"><div>팔로워</div>
                                        <div className="count follower-count">{props.follower.length}</div> 
                                    </div>
                                    <div className="half"><div>필로잉</div>
                                        <div className="count following-count">{props.following.length}</div> 
                                    </div>
                                    <button className="btn">내 프로필</button>
                                    <button className="btn" onClick={
                                        ()=>{
                                            onLogout();
                                        }
                                    }>로그아웃</button>
                                </>
                            ):(
                                <>
                                    <div className="input-group">
                                        <label >이메일</label>
                                        <input type="text" onChange={
                                            (e)=>{ setEmail( e.currentTarget.value ); }
                                        }/>
                                    </div>  

                                    <div className="input-group">
                                        <label >비밀번호</label>
                                        <input type="password"  onChange={
                                            (e)=>{ setPassword( e.currentTarget.value ); }
                                        }/>
                                    </div>

                                    <button className="btn" id="btn1" onClick={
                                        ()=>{
                                            navigate('/join');  // 회원 가입 화면으로 이동
                                        }
                                    }>회원가입</button>

                                    <button className="btn" id="btn2"  onClick={
                                        ()=>{
                                            onLoginLocal();  
                                        }
                                    }>로그인</button>

                                    <button className="btn" id="btn3"  onClick={
                                        ()=>{
                                            onLoginKakao();
                                        }
                                    }>카카오톡</button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Heading
