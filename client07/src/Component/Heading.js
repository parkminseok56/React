// 1. Heading에는 메인 메뉴를 구성함.(home, join, result)
// 2. 이 전 프로겢트처럼 메인 메뉴를 클릭하면 해당 페이지로 이동하게 하셈.
// 3. Join.js에 회원 가입폼을 만들되, join.css를 만들어서 적용함.
// 4. css 파일들은 css폴더에 넣어주셈.
// 5. Join.js에서 회원가입버튼을 클릭하면 입력한 정보가 공유된 probs의 리스트에 저장되고 
//    result를 누르면 회원가입 상황을 출력해주세요.
// 6. 회원가입 필드 : 아이디, 비번, 이름, 이메일
import React from 'react'
import { Link  } from "react-router-dom";

function Heading() {
  return (
    <div>
      <h1>Hello React~!!</h1>
      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
      }}>
        <Link to="/">home</Link>
        <Link to="/join">join</Link>
        <Link to="/result">result</Link>
      </div>
    </div>
  )
}

export default Heading
