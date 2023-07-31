import React,{useState} from 'react'
import './Test.css';

function Test() {
    const [temp,setTemp] = useState("Test");
    // state 값의 초기값은 어떤 형태의 값(bool,도 모두 사용할 수 있음.)

    // 변수이름도 변경이 가능하고, 변수 이름이 변경되면 자동으로 setter 변수도 변경됨.
    // 아래와 같이 배열로도 초기화가 가능함.
    // const [tempArr, setTempArr] = useState([1,2,3]);
 
    // 반드시 배열의 값이 하나 이상 존재하는 배열은 아니어도 됨.
   const [tempArr, setTempArr] = useState([1]);
   const [number, setNumber] = useState(0);
 
   // state 변수와 onClick 이벤트를 한꺼번에 사용한 예
   return (
      <div className={temp}>
           <h1>{temp}Component 입니다.</h1>
           <h3>{tempArr}</h3>
           <button onClick={
            ()=>{
                // setTempArr(tempArr.push(5))
                let arr = []; // 빈 배열에
                arr = [ ... tempArr ]; // 기존 배열을 옮겨 담고
                setNumber( number + 1);
                arr.push(number);   // 요소하나를 추가하고
                setTempArr([...arr] ); // 그리고 setter를 사용함.
                }
            }>변경하기</button>
      </div>
    )
  }
 // state 변수값을 변경하려면 setState 함수를 사용해야 하지만 
 // setState 함수는 배열에 요소를 추가하는 기능이 없음.
 // 값을 교체하기 때문에 [1,2,3] 배열이 위 문자 실행 후 [4]로 변경됨.
 // 그리고 요소가 하나밖에 안 남은 배열은 이미 배열로 인식되지 않아서,
 // push 메서드도 동작되지 않음. 이를 위해 위와 같은 방법을 사용함.




export default Test



