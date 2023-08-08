import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../Style/main.css';
import '../Style/board.css';
import { useNavigate } from "react-router-dom";

function Main(props) {
    const [loginUser, setLoginUser] = useState({});
    const [boardList, setBoardList] = useState([]);
    const [paging, setPaging] = useState({});
    const [beginend, setBeginend] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 시작할 때
        window.addEventListener("scroll", handleScroll);
        // scroll 이벤트가 발생하면 handleScroll 함수를 호출해서 실행해주세요

        // 컴포넌트가 끝날 때 실행하는 명령
        return () => {
            // scroll event listender 해제
            window.removeEventListener("scroll", handleScroll);
        }
    });
    const handleScroll = () => {
        // Scroll 이벤트가 일어나면 실행될 함수
        const scrollHeight = document.documentElement.scrollHeight; //스크롤이 가능한 크기
        const scrollTop = document.documentElement.scrollTop; // 현재 위치
        const clientHeight = document.documentElement.clientHeight; // 내용물의 크기

        // 현재 위치값에 내용물 크기를 더한 값이 스크롤 크기(한계)를 넘어섰더면  -> 화면 밑에까지 끝까지 스크롤했다면,
        if (scrollTop + clientHeight >= scrollHeight) {
            onPageMove(Number(paging.page) + 1);
        }
    }
    useEffect(
        () => {
            async function fetchData() {
                const result1 = await axios.get('/api/members/getLoginUser');
                console.log(result1.data.loginUser)
                setLoginUser(result1.data.loginUser);

                const result2 = await axios.get('/api/boards/getBoardList/1');
                setBoardList([...result2.data.rows]);
                setPaging(result2.data.paging);

                const pageArr = [];
                for (let i = result2.data.paging.beginPage; i <= result2.data.paging.endPage; i++) {
                    pageArr.push(i);
                }
                setBeginend([...pageArr]);
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
        props.setBoardid(id);
        navigate('/boardView');
    }

    const onPageMove = async (p) => {
        // console.log(p);
        const result2 = await axios.get(`/api/boards/getBoardList/${p}`);
        // setBoardList([...result2.data.rows]);

        // 다음 페이지를 읽어와서 현재 게시물 아래에 추가함.
        // 별도의 배열을 생성해서
        let boards = [];
        // 현재 게시물의 리스트를 담고
        boards = [...boardList];
        // 새로 읽어온 페이지의 게시물과 합침.
        boards = [...boards, ...result2.data.rows];
        // merge 가 완료된 리스트를 보드리스트에 담음,
        setBoardList([...boardList]);

        setPaging(result2.data.paging);
        const pageArr = [];
        for (let i = result2.data.paging.beginPage; i <= result2.data.paging.endPage; i++) {
            pageArr.push(i);
        }
        setBeginend([...pageArr]);
    }

    const writeBoard = () => {
        navigate('/WriteBoard');
    }

    return (
        <>
            <div id='wrap'>
                <h2>{loginUser.userid}({loginUser.name})님 어서오세요. &nbsp;
                    <button onClick={() => { onMemberEdit(); }}>회원 정보 수정</button>&nbsp;
                    <button onClick={() => { onLogout(); }}>로그 아웃</button>&nbsp;
                    <button onClick={() => { writeBoard(); }}>글 작성</button></h2>
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
                                        <td id='subject' onClick={() => { goBoardView(board.id); }}>{board.subject}</td>
                                        <td id='writer'>{board.writer}</td>
                                        <td id='created_at'>{board.created_at ? board.created_at.substring(0, 10) : ''}</td>
                                        <td id='readCount'>{board.readCount}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <br />
                <div id="paging">
                    {
                        (paging.prev) ? (
                            <span
                                style={{ cursor: "default" }}
                                onClick={() => {
                                    onPageMove(paging.beginPage - 1);
                                }}
                            >
                                ◀&nbsp;
                            </span>
                        ) : null
                    }
                    {
                        beginend.map((p, idx) => {
                            return (
                                <span
                                    style={{ cursor: "default" }}
                                    key={idx}
                                    onClick={() => {
                                        onPageMove(p);
                                    }}
                                >
                                    &nbsp;{p}&nbsp;
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Main;
