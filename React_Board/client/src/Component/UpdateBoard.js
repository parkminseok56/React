import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UpdateBoard(props) {
    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState({});
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const [imgstyle, setImgstyle] = useState({});
    const [filename, setFilename] = useState("");
    const [realfilename, setRealfilename] = useState("");

    useEffect(() => {
        async function fetchData() {
            const result1 = await axios.get('/api/members/getLoginUser');
            setLoginUser(result1.data.loginUser);

            const result2 = await axios.post(`/api/boards/getboard/${props.boardid}`);
            setSubject(result2.data.board.subject);
            setContent(result2.data.board.content);
            setFilename(result2.data.board.filename);
            setRealfilename(result2.data.board.realfilename);
        }
        fetchData();
        setImgstyle({ display: "none" });
    }, []);

    const onsubmit = () => {
        if (subject === '') {
            return alert('제목은 필수 입력사항입니다.');
        } else if (content === '') {
            return alert('내용은 필수 입력사항입니다.');
        } else {
            // 
            axios.post('/api/boards/updateBoard',
                {
                    id: props.boardid,
                    subject,
                    content,
                    filename,
                    realfilename
                }
            )
                .then((result) => {
                    navigate('/boardView');
                })
                .catch((error) => {
                    alert('등록이 실패하였습니다. 다시 시도해주세요.');
                });
        }
    };

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
            <h2>게시글 수정</h2>
            <table id='board-list'>
                <tr><th width='100'>제목</th>
                    <td width="600">&nbsp;<input type='text' value={subject} onChange={
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
                    <td width="600">&nbsp;<textarea rows="10" cols="95" value={content} onChange={
                        (e) => {
                            setContent(e.currentTarget.value);
                            console.log(content)
                        }
                    }></textarea></td>
                </tr>
                <tr><th width='100'>이미지</th>
                    <td width="500">
                        <img src={`http://localhost:5000${filename}`} width="50" /><input type='file' name='image' onChange={
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
                    }>수정하기</button>
                    <button>메인으로</button></td></tr>
            </table>
        </div>
    )
}

export default UpdateBoard
