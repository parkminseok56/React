import React, { useState } from 'react';

// 아이디, 비번, 비번확인, 이름, 이메일을 입력받는 join 컴포넌트를 만들고,
// 회원가입을 누르면 폼 아래에 입력 내용이 제목들과 함께 출력되게 만드시오.

function Join() {
  const [content, setContent ] = useState("");   // 하나의 단어를 저장할 변수
    const [contentList, setContentList ] = useState([]); // 단어들을 배열로 저장할 변수
    const onSubmit=()=>{
      let tempArr=[...contentList]; // 이 전 배열 복사
      tempArr.push( content ); // 현재 단어 추가
      setContentList([...tempArr]); // 배열을 contentList 로 복사
      setContent(""); // 입력란 비움
    }
  return (
    <div>
      <form>
        아이디:<input type='text' /> <br/>
        비밀번호:<input type='password' /> <br/>
        비밀번호 확인:<input type='password' /> <br/>
        이름:<input type='text' /> <br/>
        이메일:<input type='text' /> <br/>
        <button>회원가입</button>
      </form>
      {
        
      }
    </div>
  )
}

// 
export default Join
