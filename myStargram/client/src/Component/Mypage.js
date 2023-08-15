import React, {useState, useEffect} from 'react';
import '../Style/menu.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, logoutAction, setFollowings } from '../Reducer/userSlice';

function Mypage(  ) {
    const navigate = useNavigate();
    let user = useSelector( state=>state.user);

    const [ feedList, setFeedList ] = useState([]);
    const [ imageList, setImageList ] = useState([]);
    let temp = [];

    useEffect(()=>{
        async function fetchData(){
            try{
                // 로그인 유저가 작성한 피드 검색
                const result = await axios.get('/api/feed/getFeedListmy');
                for(let i=0; i<result.data.length; i++){
                    const result2 = await axios.post( '/api/feed/imgList', {feednum:result.data[i].id});
                    temp.push(result2.data[0].filename);
                }
                setFeedList([...result.data] );
                setImageList([...temp]);
            }catch(err){console.error(err)}
        }
        fetchData();
    }, []);

    const onFeedView= async (feedid)=>{
        await axios.post('/api/feed/savefeedid', {feedid});
        navigate('/feedView');
    }

    return (
        <div id="wrap">
            <table  cellSpacing="5"  style={{width:"700px", fontWeight:"bold" }}>
                <tr height="50">
                    <td colSpan="4" style={{textAlign:"left", fontWeight:"bold", fontSize:"160%"}}>{user.nick}</td>
                </tr>
                <tr>
                    <td style={{width:"175px", textAlign:"left"}}>
                        {
                            (user.profileimg)?
                            (<img src={user.profileimg} id='mypageimg'/>):
                            (<img src="http://localhost:5000/no-image.png" id='mypageimg' />)
                        }
                    </td>
                    <td style={{width:"175px", fontSize:"120%"}}>feed<br />{feedList.length}</td>
                    <td style={{width:"175px", fontSize:"120%"}}>follower<br />{user.follower.length}</td>
                    <td style={{width:"175px", fontSize:"120%"}}>following<br />{user.following.length}</td>
                </tr>
                <tr bgColor="white" >
                    <td colSpan="4" style={{textAlign:"left", fontSize:"100%"}}><br />{user.profilemsg}<br /></td>
                </tr>
                <tr>
                    <td colSpan="4"><button style={{width:"330px"}} onClick={
                            ()=>{navigate('/updateMember')}
                        }>회원정보수정</button>&nbsp;&nbsp;<button style={{width:"330px"}}>정보공유</button><br /></td>
                </tr>
                <tr>
                    <td colSpan="4" style={{textAlign:"left", fontSize:"100%"}}>
                        {
                            (feedList.length==0)?
                            (<p>아직 작성된 피드가 없습니다</p>):
                            (
                                feedList.map((feed, idx)=>{
                                    return (
                                        <div key={idx} style={{float:"left"}} onClick={
                                            ()=>{onFeedView(feed.id)}
                                        }>
                                            <img src={imageList[idx]} style={{width:"172px", height:"172px"}} />
                                        </div>
                                    )
                                })
                            )
                        }
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Mypage
