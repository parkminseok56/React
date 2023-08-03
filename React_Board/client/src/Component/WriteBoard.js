import React, { useState, useEffect } from 'react'
import axios from 'axios';

function WriteBoard() {
    const [loginUser, setLoginUser] = useState({});
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const [imgstyle, setImgstyle] = useState({});

    const [filename, setFilename] = useState("");
    const [realfilename, setRealfilename] = useState("");

    useState(() => {
        setImgstyle({ display: "none" });
    });

    const onsubmit = () => {

    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('/api/members/getLoginUser');
            setLoginUser(result.data.loginUser);
        }
        fetchData();
    }, []);

    const fileUpload = (e) => {
        console.log(e.target.files);
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        axios.post('/api/boards/fileUpload', formData)
            .then((result) => {
                // console.log(result.data.filename, result.data.realfilename);
                setImgsrc(`http://localhost:5000${result.data.filename}`);
                setImgstyle({ display: "block" });

                setFilename(result.data.filename);
                setRealfilename(result.data.realfilename);

            })
            .catch(() => { });
    }

    return (
        <div id="wrap">
            <h2>게시글 등록</h2>
            <table id='board-list'>
                <tr><th width='100'>제목</th>
                    <td width="600">&nbsp;<input type='text' onChange={
                        (e) => {
                            setSubject(e.currentTarget.value);
                        }
                    } /></td>
                </tr>
                <tr>
                    <th width='100'>작성자</th>
                    <td width="600"><input type='text' value="{loginUser.userid}" disabled /></td>
                </tr>
                <tr><th width='100'>내용</th>
                    <td width="600">&nbsp;<textarea rows="10" cols="95" onChange={
                        (e) => {
                            setContent(e.currentTarget.value);
                            console.log(content)
                        }
                    }></textarea></td>
                </tr>
                <tr><th width='100'>이미지</th>
                    <td width="500">&nbsp;<input type='file' name='image' onChange={
                        (e) => {
                            fileUpload(e);
                        }
                    } />

                        <div class="img-preview">
                            <img src={imgsrc} Style={{ imgstyle }} width="250" alt="미리보기" />
                        </div>

                    </td>
                </tr>
                <tr height="80"><td align='center' colSpan="2">
                    <button onClick={
                        () => {
                            onsubmit();
                        }
                    }>글쓰기</button>
                    <button>메인으로</button></td></tr>
            </table>
        </div>
    )
}

export default WriteBoard
