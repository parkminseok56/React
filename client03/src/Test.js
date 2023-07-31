import React,{useState} from 'react'
import './Test.css';

// '숨기기' 버튼을 클릭하면 "Test 컴포넌트이므니다." 구문이 화면에서 사라짐.
// 버튼의 문구는 '보이기'로 바뀌고 다시'보이기' 버튼을 누르면 구문이 구분이 다시 나타남.\


function Test() {
    const [temp, setTemp ] = useState(true);
    // temp 값이 참이면 h1 tag를 보여주고
    // temp 값이 거짓이면 h1 tag를 감출 예정
    // button을 클릭할 때 마다 temp 값이 변경됨. 
  return (
    <div>
      {temp ? <h1 className="test">Test 컴포넌트이므니다.</h1> : null }
      <button onClick={
        ()=>{
            setTemp( !temp );
        }
      }> {temp ? "숨기기" : "보이기"}</button>
    </div>
  )
}

export default Test

/*
1. 거의 모든 문법이 자바스크립트와 비슷한 문법을 사용함.
2. Camel 케이스 사용
3. 자바스크립트 문법이나 변수를 사용하기 위해서는 {}로 감쌓아서 사용함.
4. css나 style을 표현할 때는 {{}}로 감쌓아서 사용함
   - <h1 className="" style={{color:"red", fontSize:"100%"}}
   - font-size는 {{]}} 안에서 변수의 연산식으로 인식 될 수 있으므로 fonstSize 라고 표현함.
   - 속성명 : "값"으로 표현.  속성들끼리는 ','로 구분
5. 외부의 css 파일을 임포트하여 사용할 수 있음.
6. 가정문 : if else, switch
7. 반복문 : for, map
   let Arr[1,2,3];
   Arr.map((element. idx)=>{
     return <p>{element}</p>
   })
8. return() 안에서 if else 는 사용이 불가능함.
   return(
        <div>
                 { if( ){}else{}  }  //  X 불가능함.
        </div>
   )
   그래서 위 처럼 return 안 에서는 삼한 연산 ( )?( ):( )를 쓰거나, switch case 문을 사용함.

9. 컴포넌트 내에서 그래도 if를 쓰고 싶다면

   if( ){
       return ( )
   }else{
       return ( )
   }
   는 가능함.
*/