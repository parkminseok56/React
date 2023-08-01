import React, { useState } from 'react'
import './css/join.css';

function Join() {
  return (
    <div id="wrap" align="center">
      <form>
        <table>
          <tr><th>아이디</th><td><input type="text" /></td></tr>
          <tr><th>암호</th><td><input type="password" /></td></tr>
          <tr><th>이름</th><td><input type="text" />*</td></tr>
          <tr><th>이메일</th><td><input type="text" />*</td></tr>
        </table>
        <input type="button" value="회원가입" />
      </form>
    </div>
  )
}

export default Join
