// Heading에 member 메뉴를 추가하시오.
// Member 컴포넌트가 화면에 나타나면 실행되는 useEffect 를 이용해서 회원을 조회하고.
// 화면에 자유로운 양식으로 출력하시오.
// state 변수를 이용하시오
// 비동기 실행 함수를 useEffect 안에서 동기 실행으로 실행하려면
/*
useEffect(()=>{
    async function fetchData(){
        try{
            const respnse = await axios.GEt('/api/members',{text:";"Hello"})
        }catch(err){

        }
    }
    fetchData();
},[]
);






*/
import React, { useState, useEffect } from 'react'
import axios from "axios";

// 비동기 함수를 동기식으로 바꾸는 동작이 useEffect에서 사용되어야 한다면 아래와 같이 작성.
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
        <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: "center"
        }}>
            {
                members.map(
                    (members, idx) => {
                        return (
                            <div key={idx}>
                                {members.userid} -
                                {members.name} -
                                {members.email} -
                                {members.phone
                                } -
                            </div>
                        );
                    }
                )
            }

        </div>
    )
}

export default Member
