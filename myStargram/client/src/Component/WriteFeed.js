import React, {useState} from 'react'
import '../Style/login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';

function WriteFeed( ) {
    const navigate=useNavigate();
    let user = useSelector( state=>state.user );

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const [ imgsrc1, setImgsrc1 ] = useState('');
    const [ imgsrc2, setImgsrc2 ] = useState('');
    const [ imgsrc3, setImgsrc3 ] = useState('');
    const [ imgsrc4, setImgsrc4 ] = useState('');
    const [ imgsrc5, setImgsrc5 ] = useState('');
    const [ imgsrc6, setImgsrc6 ] = useState('');
    const [ imgsrc7, setImgsrc7 ] = useState('');
    const [ imgsrc8, setImgsrc8 ] = useState('');
    const [ imgsrc9, setImgsrc9 ] = useState('');
    const [ imgsrc10, setImgsrc10 ] = useState('');
    // const [imgsrc, setImgsrc] = useState([]);

    const [style2, setStyle2]=useState({display:"none"});
    const [style3, setStyle3]=useState({display:"none"});
    const [style4, setStyle4]=useState({display:"none"});
    const [style5, setStyle5]=useState({display:"none"});
    const [style6, setStyle6]=useState({display:"none"});
    const [style7, setStyle7]=useState({display:"none"});
    const [style8, setStyle8]=useState({display:"none"});
    const [style9, setStyle9]=useState({display:"none"});
    const [style10, setStyle10]=useState({display:"none"});
    // const [style, setStyle] = useState([]);

    const [imgList, setImgList]  = useState([]);

    const imgUpload = async (e, x)=>{
        if(!e.target.files[0]){return;}
        let formData = new FormData();
        formData.append('image', e.target.files[0]);
        const result = await axios.post('/api/feed/imgup', formData );

        if(x===1){ 
            setStyle2({display:"inline-block"}); 
            setImgsrc1(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===2){ 
            setStyle3({display:"inline-block"}); 
            setImgsrc2(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===3){ 
            setStyle4({display:"inline-block"}); 
            setImgsrc3(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===4){ 
            setStyle5({display:"inline-block"}); 
            setImgsrc4(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===5){ 
            setStyle6({display:"inline-block"}); 
            setImgsrc5(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===6){ 
            setStyle7({display:"inline-block"}); 
            setImgsrc6(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===7){ 
            setStyle8({display:"inline-block"}); 
            setImgsrc7(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===8){ 
            setStyle9({display:"inline-block"}); 
            setImgsrc8(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===9){ 
            setStyle10({display:"inline-block"}); 
            setImgsrc9(`http://localhost:5000/images/${result.data.filename}`);
        }else if(x===10){
            setImgsrc10(`http://localhost:5000/images/${result.data.filename}`);
        } 

        // state 변수가 배열때 요소를 추가하는 방법
        let arr = [];
        arr = [...imgList];
        arr.push( `http://localhost:5000/images/${result.data.filename}` )
        setImgList( [...arr] );
        console.log(imgList);
    }

    const onSubmit = async ()=>{
        if(!title){return alert('제목을 입력하세요');}
        if(!content){return alert('내용을 입력하세요');}
        if(imgList.length===0) {return alert('이미지를 하나이상 입력하세요')}

        // feed 먼저 feeds 테이블에 업로드하고
        let result = await axios.post('/api/feed/write', {title, content, writer:user.id } );
        let feednum = result.data.feednum;
        console.log('num :', imgList.length);
        // 업로드된 레코드의 id 를 받아서, 이미지들을 images 테이블에 추가 . id 를 feednum 으로
        //imgList.map( async (img, idx)=>{
        for(let i=0; i<imgList.length; i++){
            await axios.post('/api/feed/writeimages', {feednum, img:imgList[i]} );
        }
        window.location.href='http://localhost:3000/home';
    }
    return (
        <div id="wrap">
            <div className='title'>게시물 작성</div><br />

            <div className='lable'><label>Title</label></div><br />
            <div><input type="text" onChange={
                (e)=>{ setTitle(e.currentTarget.value)}
            }/></div>

            <div className='lable'><label>Content</label></div><br />
            <div><textarea onChange={
                (e)=>{ setContent(e.currentTarget.value)}
            }></textarea></div><br />

            <div className='lable'><label>image</label></div><br />
            
            <div id='img1'><input type="file" onChange={
                (e)=>{ imgUpload(e, 1); }
            } /><img src={imgsrc1} height="50"/></div>

            <div id='img2' style={style2} ><input type="file" onChange={
                (e)=>{ imgUpload(e, 2); }
            } /><img src={imgsrc2} height="50"/></div>

            <div id='img3' style={style3}><input type="file" onChange={(e)=>{
                imgUpload(e, 3);
            }} /><img src={imgsrc3} height="50"/></div>

            <div id='img4' style={style4}><input type="file" onChange={(e)=>{
                imgUpload(e, 4);
            }} /><img src={imgsrc4} height="50"/></div>

            <div id='img5' style={style5}><input type="file" onChange={(e)=>{
                imgUpload(e, 5);
            }} /><img src={imgsrc5} height="50"/></div>

            <div id='img6' style={style6}><input type="file" onChange={(e)=>{
                imgUpload(e, 6);
            }} /><img src={imgsrc6} height="50"/></div>

            <div id='img7' style={style7}><input type="file" onChange={(e)=>{
                imgUpload(e, 7);
            }} /><img src={imgsrc7} height="50"/></div>

            <div id='img8' style={style8}><input type="file" onChange={(e)=>{
                imgUpload(e, 8);
            }} /><img src={imgsrc8} height="50"/></div>

            <div id='img9' style={style9}><input type="file" onChange={(e)=>{
                imgUpload(e, 9);
            }} /><img src={imgsrc9} height="50"/></div>

            <div id='img10' style={style10}><input type="file" onChange={(e)=>{
                imgUpload(e, 10);
            }} /><img src={imgsrc10} height="50"/></div>

            <div><button id='login' onClick={()=>{ onSubmit() }}>작성완료</button></div>
            <div><button id='join' onClick={()=>{navigate('/')}}>되돌아가기</button></div>
        </div>
    )
}

export default WriteFeed
