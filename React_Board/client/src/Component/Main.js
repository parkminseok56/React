import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../Style/main.css'
import '../Style/board.css'
import { useNavigate } from "react-router-dom";

function Main(props) {
    const [loginUser, setLoginUser] = useState({});
    const [boardList, setBoardList] = useState([]);
    const [paging, setPaging] = useState({});

    const navigate = useNavigate();

    useEffect(
        () => {
            async function fetchData() {
                const result1 = await axios.get('/api/members/getLoginUser');
                console.log(result1.data.loginUser)
                // console.log(result.data);  // 'scott' 출력
                setLoginUser(result1.data.loginUser);

                const result2 = await axios.get('/api/boards/getBoardList/1');
                setBoardList([...result2.data.rows]);
                setPaging(result2.data.paging);

            }
            fetchData();
        }, []
    );
    const onLogout = () => {
        axios.get('/api/members/logout')
            .then((result) => {
                navigate('/');
            })
            .catch((err) => {
            });
    }
    const onMemberEdit = () => {
        navigate('/updateMember');
    }

    const goBoardView = (id) => {
        // console.log(id);
        props.setBoardid(id);
        navigate('/boardView');
    }

    const writeBoard = () => {
        navigate('/WriteBoard');
    }

    return (
        <>
            <div id='wrap'>
                <h2>{loginUser.userid}({loginUser.name})님 어서오세요. &nbsp;
                    <button onClick={
                        () => {
                            onMemberEdit();
                        }
                    }>회원 정보 수정</button>&nbsp;
                    <button onClick={
                        () => {
                            onLogout();
                        }
                    }>로그 아웃</button>&nbsp;

                    <button onClick={
                        () => {
                            writeBoard();
                        }
                    }>글 작성</button></h2>
                <table align='center'>
                    <thead>
                        <tr>
                            <th width="100">
                                번호
                            </th>
                            <th width="400">
                                제목
                            </th>
                            <th width="100">
                                작성자
                            </th>
                            <th width="100">
                                작성 일자
                            </th>
                            <th width="100">
                                조회 수
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            boardList.map((board, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td id='boardnum'>{board.id}</td>
                                        <td id='subject' onClick={() => {
                                            goBoardView(board.id);
                                        }}>{board.subject}</td>
                                        <td id='writer'>{board.writer}</td>
                                        <td id='created_at'>{board.created_at ? board.created_at.substring(0, 10) : ''}</td>
                                        <td id='readCount'>{board.readCount}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Main
