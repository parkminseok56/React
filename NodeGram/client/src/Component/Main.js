import React ,{useState, useEffect} from 'react';
import '../Style/head.css';
import '../Style/main.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main(props) {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);

    //const [ loginUser, setLoginUser] = useState({});
    //const [ login, setLogin ] = useState(false);
    //const [ follower, setFollower ] = useState([]);
    //const [ following, setFollowing ] = useState([]);

    const [content, setContent] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const [prevstyle, setPrevstyle ] = useState({});
    const [filename, setFilename] = useState("");

    const [ searchtag, setSearchtag ] = useState('');

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
                // 게시물리스트를 조회하는 동작
                let result = await axios.get('/api/post/getPostList');
                setPostList([...result.data]);  
                setPrevstyle( {display:"none"} ); // 이미지 미리보기 최초 상태 안보임
            }catch(err){  console.error(err);  }
        } 
        fetchData();
    } , [] );

    const imgUpload=(e)=>{
        let formData = new FormData();
        formData.append('image', e.target.files[0]);
        axios.post('/api/post/fileUpload', formData)
        .then((result)=>{
            setImgsrc( `http://localhost:5000${result.data.filename}` ); // 미리보기 img의 src
            setPrevstyle({display:"block"});  //  미리보기 img 의 display
            setFilename(result.data.filename);  // 게시글 작성시 전송될 파일 이름 state 변수
        }).catch(()=>{});        
    }

    const onSubmit= async ()=>{
        const result = axios.post('/api/post/writepost' , { userid:props.loginUser.id, content, img:filename });
        // 글쓰기를 완료한후 페이지를  reload 해서 postList를 갱신합니다
        window.location.reload();
    }

    const onSearchTag = ()=>{
        axios.post('/api/post/searchPostList', {searchtag})
        .then((result)=>{
            setPostList([...result.data.postList]);
            setSearchtag( result.data.searchtag );
        })
    }

    const follownow = async ( postUserid )=>{
        await axios.post('/api/user/follownow', {FollowingId:postUserid, FollowerId:props.loginUser.id});
        window.location.reload();
    }

    return (
        <div className="timeline">
            <div className="twits">
                <div id="hashtag-form">
                    <input type="text" placeholder="태그 검색" value={searchtag} onChange={
                        (e)=>{ setSearchtag( e.currentTarget.value ) }
                    }/>
                    <button className="btn" onClick={
                        ()=>{ onSearchTag() }
                    }>검색</button>
                    <button className="btn" onClick={
                        ()=>{  window.location.reload();}
                    }>검색초기화</button>
                </div>
            </div>

            {
                (props.login)?(
                    <div id="write-form" >
                        <div id="post-form">
                            <div className="input-group">
                                <textarea id="twit" name="content" onChange={
                                    (e)=>{ setContent( e.currentTarget.value ) }
                                }></textarea>
                            </div>

                            <div className="img-preview">
                                <img id="img-preview" src={imgsrc} style={prevstyle} width="250"/>
                            </div>
                            
                            <div>
                                <label >사진 업로드</label>
                                <input id="img" type="file" accept="image/*" onChange={
                                    (e)=>{ imgUpload(e);  }
                                }/>
                                <button className="btn" onClick={
                                    ()=>{ onSubmit(); }
                                }>포스팅</button>
                            </div>
                        </div>
                    </div>
                ):(null)
            }
            

            <div className="twits">
            {
                postList.map((post, idx)=>{
                    return (
                        <div className="twit" key={idx} >
                            <div className="twit-author" style={{fontWeight:"bold",fontFamily:"Verdana"}}>{post.id} &nbsp;-&nbsp;{post.nick}&nbsp;
                            {
                                ( !( props.following.some( (following)=>{ return following.followingid === post.UserId } ) ) && (post.UserId !== props.loginUser.id) && (props.login) )?
                                (<button className="btn" style={{float:"right"}} onClick={
                                    ()=>{ follownow(post.UserId) }
                                }>팔로우</button>):
                                (null)
                            }
                            </div><br />
                            <div className="twit-img">
                                <img src={`http://localhost:5000${post.img}`} width="500" />
                            </div>
                            <div className="twit-content" style={{fontWeight:"bold",fontFamily:"Verdana"}} ><pre>{post.content}</pre></div>
                        </div>
                    );
                })
            }
            </div>
        </div>
    )
}

export default Main
