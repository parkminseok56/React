import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../css/join.css';
import { useNavigate } from "react-router-dom";

function Join(probs) {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // react 꺼내와서 내용을 채우고,  같이 넣어준 조건에 맞을때 자동으로 호출되는 함수
  /*
  useEffect(
      ()=>{
          alert("업로드컴포넌트가 나타났습니다"); // 컴포넌트가 나타날때 실행

          return ()=>{
              alert("업로드컴포넌트가 사라집니다");
          } // 컴포넌트가 사라질때 실행

      },
      [  ]  //useEffect 가 실행될 조건. 안쓰면 1번만 실행
  );
  */
  useEffect(
    () => {
      console.log("id 바뀌었습니다");
    }, [id]
  )


  // 개발자가 만들고 개발자가 필요시 호출해서 사용하는 함수
  const onSubmit = () => {
    axios.post('/api/join', { id, pwd, name, email, phone: '010-1234-1234' })
      .then((result) => {
        //if( result.data.success === 'ok' ){
        alert('회원가입 성공');
        navigate('/');
        //}
      })
      .catch((err) => {
        console.error(err);
        navigate('/');
      });

  }

  return (
    <div id="wrap" align="center">
      <table>
        <tr><th>아이디</th><td><input type="text" value={id} onChange={
          (e) => {
            setId(e.currentTarget.value);
          }
        } /></td></tr>
        <tr><th>암호</th><td><input type="password" value={pwd} onChange={
          (e) => {
            setPwd(e.currentTarget.value);
          }
        } /></td></tr>
        <tr><th>이름</th><td><input type="text" value={name} onChange={
          (e) => {
            setName(e.currentTarget.value);
          }
        } /> *</td></tr>
        <tr><th>이메일</th><td><input type="text" value={email} onChange={
          (e) => {
            setEmail(e.currentTarget.value);
          }
        } /> *</td></tr>
      </table>
      <button onClick={
        () => {
          onSubmit();
        }
      }>회원가입</button>
    </div>
  )
}

export default Join
