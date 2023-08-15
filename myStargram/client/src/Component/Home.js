import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Style/home.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, logoutAction, setFollowings } from '../Reducer/userSlice';


function Home() {
    const navigate = useNavigate();
    const [ feedList, setFeedList ] = useState([]);
    const [ imageList, setImageList ] = useState([]);
    const [ likeList, setLikeList ] = useState([]);

    let temp1 = [];
    let temp2 = [];

    let user = useSelector(state=>state.user);
    const dispatch = useDispatch();


    useEffect(()=>{
        async function fetchData(){
            try{
                const result = await axios.get('/api/feed/getFeedList');              
                for(let i=0; i<result.data.length; i++){
                    const result2 = await axios.post('/api/feed/imgList', { feednum:result.data[i].feedid });
                    let arr = [];                   
                    for(let j = 0; j<result2.data.length; j++){
                        arr.push(result2.data[j].filename);
                    }
                    temp1.push(arr);
                    const result3 = await axios.post('/api/feed/likeList', { feednum:result.data[i].feedid });
                    temp2.push( result3.data.likeList );
                }
                setFeedList([...result.data] );
                setImageList([...temp1]);
                setLikeList([...temp2]);
            }catch(err){
                console.error('error:', err);
            }
        }
        fetchData();       
        
    }, []);

    

    const moveleft=(feedid, imglength)=>{
        
        let k = document.getElementById( feedid ).style.left;
        console.log('left :', Number(k));
        if(k!=0){
            k = String(k);
            let l = k.length;
            k =Number( k.substring(0, l-2)  );
        }else{
            k = Number(k);
        }
        if(k==0)return;
        console.log('숫자 :', k);
        k = k+700;
        document.getElementById( feedid ).style.left = k + 'px';
    }
    const moveright=(feedid, imglength)=>{
        console.log(imglength);
        let k = document.getElementById( feedid ).style.left;
        console.log('left :', Number(k));
        if(k!=0){
            k = String(k);
            let l = k.length;
            k =Number( k.substring(0, l-2)  );
        }else{
            k = Number(k);
        }
        if( k == (imglength-1)*-700 )return;
        console.log('숫자 :', k);
        k = k-700;
        document.getElementById( feedid ).style.left = k + 'px';
    }

    const onFollow=async (feedwriter)=>{
        await axios.post( '/api/member/follow', { FollowingId:feedwriter, FollowerId:user.uid });
        //window.location.reload();
        const result = await axios.get('/api/member/getFollowing');
        //props.setFollowing( [...result.data] );
        dispatch( setFollowings({id:user.uid, email:user.email, nick:user.nick}) );
    }


    const onlike= async (feedid) => {
        await axios.post('/api/feed/like', {feedid})
        //window.location.reload();
        temp2=[];
        for(let i=0; i<feedList.length; i++){
            const result3 = await axios.post('/api/feed/likeList', { feednum:feedList[i].feedid });
            temp2.push( result3.data.likeList );
        }
        setLikeList([...temp2]);
    }
    const onDelike= async (feedid) => {
        await axios.post('/api/feed/delike', {feedid})
        //window.location.reload();
        temp2=[];
        for(let i=0; i<feedList.length; i++){
            const result3 = await axios.post('/api/feed/likeList', { feednum:feedList[i].feedid });
            temp2.push( result3.data.likeList );
        }
        setLikeList([...temp2]);
    }

    return (
        <div id="wrap">
            <div id="feed">
                {
                    feedList.map((feed, k)=>{
                        return (
                            <div key={k}>
                                <div id='writer'>
                                    {(feed.profileimg)?(<img src={feed.profileimg} width="40" height="40" id="writerimg"/>):(<img src="http://localhost:5000/no-image.png" width="40" height="40" id="writerimg"/>)}
                                    &nbsp;&nbsp;
                                    {feed.nick} 
                                    {
                                        ( !user.following.some( (item)=>{return item.id == feed.writer} )  && feed.writer != user.uid  )?
                                        (<div id="follow" onClick={()=>{
                                            onFollow(feed.writer)
                                        }}>팔로우</div>):
                                        (null)                                        
                                    }

                                </div><br />
                                <div id="view" >
                                    <div id={feed.feedid} className='imgList'>
                                        {
                                            imageList[k].map((img, i)=>{return (<img key={i} src={img} width="700" height="500" className='playimg' />)})}
                                    </div>
                                    <div className='lbtn' onClick={
                                        ()=>{
                                            moveleft(feed.feedid, imageList[k].length);
                                        }
                                    }></div>
                                    <div className='rbtn'  onClick={
                                        ()=>{
                                            moveright(feed.feedid, imageList[k].length);
                                        }
                                    }></div>
                                </div>
                                <div id="title">
                                    {(likeList[k].some((likeuser)=>{return likeuser.likeid==user.uid}))?
                                    (<img src="http://localhost:5000/delike.png" height="40" onClick={()=>{ onDelike(feed.feedid) }}/>):
                                    (<img src="http://localhost:5000/like.png" height="40" onClick={()=>{ onlike(feed.feedid) }}/>)
                                    }
                                    
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <img src="http://localhost:5000/reply.png" height="40"/>
                                    <img src="http://localhost:5000/edit.png"  height="40" style={{float:"right"}} /></div>

                                {(likeList && likeList[k].length>=1)?
                                (<div style={{textAlign:"left", fontWeight:"bold", fontSize:"105%"}}>좋아요 {likeList[k].length}</div>):
                                (<div></div>)}<br />
                                
                                <div id="title">{feed.title}</div>
                                <div id="content"><pre>{feed.content}</pre></div>
                            </div>
                        )
                    })
                } 
            </div> <br /><br /><br /><br />             
        </div>
    )
}

export default Home
