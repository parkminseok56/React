import React, { useEffect, useState } from 'react'
import '../Style/board.css'
import axios from 'axios';

function BoardView(props) {
    const [boardid, setBoardid] = useState("");
    const [board, setBoard] = useState({});

    useEffect(() => {
        setBoardid(props.boardid);
        console.log(boardid);

        axios.get(`/api/boards/getboard/${boardid}`)
            .then((result) => {
                console.log(result.data);
                setBoard(result.data);
            })
            .catch((err) => { });
    }, [boardid]);
    return (
        <div id="wrap">
            <h1 style={{ textAlign: 'center' }}>게시글 내용</h1>
            <table>
                <tr>
                    <th width="150" align='center'>번호</th>
                    <td width="200" align='center'>
                        {boardid}<input type='hidden' id="boardnum" value="" /></td>
                    <th width="150" align='center'>작성자</th>
                    <td width="200" align='center'>{board.writer}</td>
                </tr>
                <tr>
                    <th align='center' width="150">제목</th>
                    <td colSpan="3">&nbsp;{board.subject}</td>
                </tr>
                <tr height="300">
                    <th align='center' width="150">내용</th>
                    <td colSpan="2" height="300" width="300"><pre>{board.content}</pre><br /></td>
                    <td width="150" align='center'><img src="" width="150" /></td>
                </tr>
            </table>
        </div>
    )
}

export default BoardView
