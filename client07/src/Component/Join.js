import React, { useState } from 'react'
import '../css/join.css';

function Join(probs) {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

        <tr><th>이름</th><td>       <input type="text" value={name} onChange={
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
