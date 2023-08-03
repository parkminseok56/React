import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function WriteBoard() {

    const navigate = useNavigate();

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
        // 작성된 내용을 boards 테이블에 레코드로 추가하고, /main으로 되돌아가도록 제작하시오.
        // 서버의 라우터 '/api/boards/writeboard'
        if (subject === '') {
            return alert('제목은 필수 입력사항입니다.');
        } else if (content === '') {
            return alert('내용은 필수 입력사항입니다.');
        } else {
            // 
            axios.post('/api/boards/Writeboard',
                {
                    userid: loginUser.userid,
                    subject,
                    content,
                    filename,
                    realfilename
                }
            )
                .then((result) => {
                    navigate('/main');
                })
                .catch((error) => {
                    alert('등록이 실패하였습니다. 다시 시도해주세요.');
                });
        }
    };

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
                    <td width="600"><input type='text' value={loginUser.userid} disabled /></td>
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
                            <img src={imgsrc} Style={imgstyle} width="250" />
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
