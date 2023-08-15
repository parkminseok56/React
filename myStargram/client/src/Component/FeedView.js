import React, {useState, useEffect} from 'react';
import '../Style/menu.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function FeedView() {
    const [feed, setFeed] =useState({});
    const [imgList, setImgList] =useState([]);
    let user = useSelector( state=>state.user );

    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get('/api/feed/feedView');
            setFeed(result.data.feed);
            setImgList([...result.data.images])
        }   
        fetchData();
    },[])



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


    return (
        <div id="wrap">
            <div id='writer'>
                {(feed.profileimg)?(<img src={feed.profileimg} width="40" height="40" id="writerimg"/>):(<img src="http://localhost:5000/no-image.png" width="40" height="40" id="writerimg"/>)}&nbsp;&nbsp; {feed.nick} 
            </div><br />
            <div id="view" >
                <div id={feed.feedid} class='imgList'>
                {
                    imgList.map((img)=>{return (<img src={img.filename} width="700" height="500" className='playimg' />)})
                }
                </div>
                <div className='lbtn' onClick={
                    ()=>{
                        moveleft(feed.feedid, imgList.length);
                    }
                }></div>
                <div className='rbtn'  onClick={
                    ()=>{
                        moveright(feed.feedid, imgList.length);
                    }
                }></div>
            </div>
            <div id="title"><img src="http://localhost:5000/like.png" height="40"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://localhost:5000/reply.png" height="40"/><img src="http://localhost:5000/edit.png"  height="40" style={{float:"right"}} /></div>
            <div id="title">{feed.title}</div>
            <div id="content"><pre>{feed.content}</pre></div>
        </div>
    )
}

export default FeedView
