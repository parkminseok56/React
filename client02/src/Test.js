import React,{useState} from 'react'
import './Test.css';

function Test() {
    const [temp,setTemp] = useState("Test");
    // state 값의 초기값은 어떤 형태의 값(bool,도 모두 사용할 수 있음.)

    return (
      <div className={temp}>
           <h1>{temp}Component 입니다.</h1>
      </div>
    )
  }

export default Test



