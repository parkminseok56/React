import React, { useEffect, useState } from 'react'
import '../Style/board.css'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Reply(props) {
    const [reply, setReply] = useState("");
    const [loginUser, setLoginUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                // 로그인 유저를 조회해서 loginUser 변수에 넣으세요
                const result1 = await axios.get('/api/members/getLoginUser');
                setLoginUser(result1.data.loginUser);
                console.log(result1.data.loginUser);

                // userid를 props로부터 가져온다면 아래 코드를 사용할 수 있습니다.
                // setUserid(props.userid);
                // console.log(props.userid);

                // 로그인 유저의 게시글을 가져와서 board 상태를 설정하세요
                const result2 = await axios.post(`/api/boards/getboard/${result1.data.loginUser.userid}`);
                console.log(result2.data);
                setBoard({ ...result2.data.board });
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);
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
                        <td align='center'><button>작성</button></td>
                    </tr>
                </thead>
            </table>
        </div >
    )
}

export default Reply
