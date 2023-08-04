import React, { useState, useEffect } from 'react'
import '../Style/board.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Reply(props) {
    const [reply, setReply] = useState("");
    const [loginUser, setLoginUser] = useState({});
    const [daytime, setDaytime] = useState('');
    const [replyList, setRiplyList] = useState([]);

    useEffect(
        () => {
            // 로그인유저를 조회해서 loginUser 변수에 넣으세요
            axios.get('/api/members/getLoginUser')
                .then((result) => {
                    setLoginUser(result.data.loginUser);
                });

            const dt = new Date();
            setDaytime(`${dt.getMonth()}/${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`)

            axios.get(`/api/boards/getReplyList/${props.boardid}`)
                .then((result) => {
                    setRiplyList(result.data);
                })
        }, []
    );

    const addReply = () => {
        axios.post('/api/boards/addReply', { writer: loginUser.userid, content: reply, boardnum: props.boardid })
            .then(() => {
                setReply('');
                axios.get(`/api/boards/getReplyList/${props.boardid}`)
                    .then((result) => { setRiplyList(result.data); })
                    .catch((err) => { });
            })
            .catch((err) => { });
    }
    const deleteReply = (replyid) => {
        axios.delete(`/api/boards/deleteReply/${replyid}`)
            .then(() => {
                axios.get(`/api/boards/getReplyList/${props.boardid}`)
                    .then((result) => { setRiplyList(result.data); })
                    .catch((err) => { });
            })
            .catch();
    }

    return (
        <div id="wrap">
            <table>
                <thead>
                    <tr>
                        <th width="140" align="center">작성일시</th>
                        <th width="90" align="center">작성자</th>
                        <th width="400" align="center">내용</th>
                        <th width="70" align="center">&nbsp;</th>
                    </tr>
                    <tr>
                        <td align="center">{daytime}</td>
                        <td align="center">{loginUser.userid}</td>
                        <td>&nbsp;<input type="text" size="60" value={reply} onChange={
                            (e) => {
                                setReply(e.currentTarget.value);
                            }
                        } /></td>
                        <td align="center">
                            <button onClick={() => { addReply() }}>작성</button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        replyList.map((reply, idx) => {
                            return (
                                <tr>
                                    <td align='center'>
                                        {
                                            reply.created_at.substring(5, 7) + "/" + reply.created_at.substring(8, 10) + " " + reply.created_at.substring(11, 13) + ":" + reply.created_at.substring(14, 16)
                                        }
                                    </td>
                                    <td align='center'>{reply.writer}</td>
                                    <td>{reply.content}</td>
                                    <td align='center'>
                                        {
                                            (loginUser.userid === reply.writer) ? <button onClick={() => { deleteReply(reply.id) }}>삭제</button> : null
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Reply
