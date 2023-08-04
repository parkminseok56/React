import React, { useState, useEffect } from 'react'
import '../Style/board.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Reply from './Reply';

function BoardView(props) {
    const navigate = useNavigate();

    const [board, setBoard] = useState({});
    useEffect(() => {
        console.log(props.boardid);
        axios.get(`/api/boards/getboard/${props.boardid}`)
            .then((result) => {
                console.log(result.data);
                setBoard(result.data[0]);
            })
            .catch()
    }, []);

    const onDeleteBoard = () => {
        let a = window.confirm('정말로 삭제하시겠습니까?');
        if (a) {
            axios.delete(`api/boards/deleteBoard/${props.boardid}`)
                .then((result) => {
                    navigate('/main');
                })
                .catch((err) => { });
        }
    }

    return (
        <>
            <div id="wrap">
                <h1>게시글 내용</h1>
                <table>
                    <tr>
                        <th width="100" align="center">번호</th>
                        <td width="250" align="center">
                            {props.boardid}<input type="hidden" id="boardnum" value="" />
                        </td>
                        <th width="150" align="center">작성자</th>
                        <td width="200" align="center">{board.writer}</td>
                    </tr>
                    <tr>
                        <th align="center" width="150">제목</th>
                        <td colSpan="3">&nbsp;{board.subject}</td>
                    </tr>
                    <tr height="300">
                        <th align="center" width="150">내용</th>
                        <td colSpan="2" height="300" width="300"><pre>{board.content}</pre><br /></td>
                        <td width="150" align="center">
                            <img src={`http://localhost:5000${board.filename}`} width="150" /></td>
                    </tr>
                    <tr><td colSpan="4">
                        <button onClick={() => { navigate('/updateBoard'); }}>수정</button>
                        <button onClick={() => { onDeleteBoard(); }}>삭제</button>
                        <button onClick={() => { navigate('/main'); }}>메인으로</button>
                    </td></tr>
                </table>
            </div>
            <Reply boardid={props.boardid} setBoardid={props.setBoardid} />
        </>
    )
}
export default BoardView
