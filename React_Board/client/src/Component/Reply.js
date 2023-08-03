import React, { useEffect, useState } from 'react'
import '../Style/board.css'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Reply(props) {
    const [reply, setReply] = useState("");
    const [loginUser, setLoginUser] = useState({});
    const [daytime, setDaytime] = useState('');
    const [replyList, setReplyList] = useState([]);

    useEffect(
        () => {
            axios.get('/api/members.getLoginUser')
                .then((result) => {
                    setLoginUser(result.data.loginUser);
                });

            const dt = new Date();
            setDaytime(`${dt.getMonth()}/${dt.getDate()}${dt.getHours()}:${dt.getMinutes()}`)

            axios.get(`/api/boards/getReplyList/${props.boardid}`)
                .then((result) => {
                    setReplyList(result.data);
                })

        }, []);

    const addReply = () => {
        axios.post('/api/boards/addReply', { writer: loginUser.userid, content: reply, boarnum: props.boardid });
        .then(() => {
            setReplyList('');
        })
        .catch((error) => { error });
}

return (
    <div id='wrap'>
        <table>
            <thead>
                <tr>
                    <th width="140" align='center'>작성일시</th>
                    <th width="90" align='center'>작성자</th>
                    <th width="400" align='center'>내용</th>
                    <th width="70" align='center'>&nbsp;</th>
                </tr>
                <tr>
                    <td align='center'>08-03</td>
                    <td align='center'>{loginUser.userid}</td>
                    <td>&nbsp;<input type='text' size="60" onChange={
                        (e) => {
                            setReply(e.currentTarget.value);
                        }
                    } /></td>
                    <td align='center'><button onClick={() => { addReply() }}>작성</button></td>
                </tr>
            </thead>
            <tbody>
                {
                    replyList.map((reply, idx) => {
                        return (
                            <tr>
                                <td align='center'>
                                    {reply.created_at.substring(5, 7) +
                                        "/" + reply.created_at.substring(8, 10) +
                                        " " + reply.created_at.substring(11, 13) +
                                        ":" + reply.created.substring(14, 16)
                                    }
                                </td>
                                <td>{reply.writer}</td>
                                <td>{reply.content}</td>
                                <td align='center'>
                                    {
                                        (loginUser.userid === reply.writer) ?
                                            <button>삭제버튼</button> : null

                                    }
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    </div >
)
}

export default Reply
