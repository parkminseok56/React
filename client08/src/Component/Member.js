// Headling 에 member 메뉴 축가해주세요
// Member 컴포넌트가 화면에 나타나면 실행되는 useEffect 를 이용해서  회원을 조회하고, 화면에 자유로운 양식으로 출력해주세요. 
// state 변수를 이용해주세요
// 비동기실행 함수를 useEffect 안에서 동기실행으로 실행하려면
/*
useEffect(()=>{
    async function fetchData() {
        try{
            const response = await axios.GET('/api/members' , { text:'Hellow'} )
        }catch(err){

        }
    }
    fetchData();
    }, []
);

*/
import React, { useState, useEffect } from 'react'
import axios from "axios";

// 비동기함수를 동기식으로 바꾸는 동작이 useEffec에서 사용되어야 한다면 아래와 같이
function Member() {
    const [members, setMembers] = useState([]);
    useEffect(
        () => {
            async function fetchData() {
                try {
                    const result = await axios.get('/api/members');
                    console.log(result.data);
                    setMembers([...result.data]);
                } catch (err) {
                    console.error(err);
                }
            }
            fetchData();
        }, []
    );
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <table>
                <tr><th>id</th><th>이름</th><th>이메일</th><th>전화</th></tr>
                {
                    members.map(
                        (member, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{member.userid}</td><td>{member.name}</td><td>{member.email}</td><td>{member.phone}</td>
                                </tr>
                            );
                        }
                    )
                }
            </table>

        </div>
    )
}

export default Member
