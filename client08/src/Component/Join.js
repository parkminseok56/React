import React, { useState, useEffect } from "react";
import '../css/join.css';
import axios from 'axios';
import { usenavigate } from "react-router-dom";

function Join(probs) {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = usenavigate;

  // useEffect : react에서 꺼내와서 내용을 채우고, 같이 넣어준 조건에 맞을 때 자동으로 호출되는 함수

  // useEffect(
  //   () => {
  //     alert("업로드 컴포넌트가 나타났읍니다.") // 컴포넌트가 나타날 때 실행

  //     return () => {
  //       alert("업로드 컴포넌트가 사라지므니다.")
  //     } // 컴포넌트가 사라질 때 실행.
  //   }, [ /*useEffect가 실행될 조건. 안 쓰면 1번만 실행 */]
  // );
  useEffect(
    () => {
      console.log("id가 바뀌었습니다.");
    },
    [id]
  )


  // onSubmit: 개발자가 만들고 개발자가 필요 시 호출해서 사용하는 함수
  const onSubmit = () => {
    let arr = [];
    arr.push(`아이디: ${id}`);
    arr.push(`비밀번호: ${pwd}`);
    arr.push(`성명: ${name}`);
    arr.push(`이메일: ${email}`);

    probs.setContentList([...arr]);

    setId("");
    setPwd("");
    setName("");
    setEmail("");

    axios.post('/api/join', { id, pwd, name, email, phone: '010.1234.1234' })
      .then((result) => {
        alert('회원가입 성공')
        location.href('/');
      })
      .catch((err) => {
        console.error(err);
        location.href('/');
      })
      .finally(() => { })
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
        } />*</td></tr>

        <tr><th>이메일</th><td><input type="text"
          value={email} onChange={
            (e) => {
              setEmail(e.currentTarget.value);
            }
          } />*</td></tr>
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
