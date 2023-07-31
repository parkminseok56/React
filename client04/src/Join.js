import React, { useState } from 'react';

// 아이디, 비번, 비번확인, 이름, 이메일을 입력받는 join 컴포넌트를 만들고,
// 회원가입을 누르면 폼 아래에 입력 내용이 제목들과 함께 출력되게 만드시오.

function Join() {
    const [id, setId ] = useState("");   
    const [pwd, setPwd ] = useState(""); 
    const [pwdchk, setPwdchk ] = useState("");     
    const [name, setName ] = useState("");   
    const [email, setEmail ] = useState("");   

    const [contentList, setContentList1 ] = useState([]);

    const onSubmit = ()=>{
      if( pwd !== pwdchk){
         setContentList1(['비밀번호가 일치하지 않습니다.'])
         return
      } 
      let arr = [];
      arr.push('아이디 : ' + id);
      arr.push('비밀번호 : ' + pwd);
      arr.push('이름 : ' + name);
      arr.push('이메일 : ' + email);
      setContentList1([...arr]);
      setId("");
      setPwd("");
      setPwdchk("");
      setName("");
      setEmail("");
    };
   return (
    <div>
      아이디:<input type='text' value={id} onChange={
          (e)=>{
            setId(e.currentTarget.value);
          }
        }/> <br/>
       비밀번호:<input type='password' value={pwd} onChange={
          (e)=>{
            setPwd(e.currentTarget.value);
          }
        }/> <br/>
       비밀번호 확인:<input type='password' value={pwdchk} onChange={
          (e)=>{
            setPwdchk(e.currentTarget.value);
          }
        }/> <br/>
        이름:<input type='text' value={name} onChange={
          (e)=>{
            setName(e.currentTarget.value);
          }
        }/> <br/>
        이메일:<input type='text' value={email} onChange={
          (e)=>{
            setEmail(e.currentTarget.value);
          }
        }/> <br/>
        <button onClick={()=>{ onSubmit()}}>회원가입</button>
         {
          contentList.map(
           (con,idx)=>{
               return <div key={idx}>{con}</div>;
          })
       }
      
    </div>
  )
}

// 
export default Join
