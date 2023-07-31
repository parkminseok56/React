import React, { useState } from 'react'
// state 변수를 사용하기 위해서는 react에서 useState를 꺼내와야 사용 할 수 있음.

import './Test.css';
// Component 생성방식은 지금 사용하려는 함수형 방식이 있고, 예전 방식인 class 형 방식이 있음.
// 함수와 클래스의 형태로 다를 뿐, 태그를 리턴한다는 면에서 둘의 방식은 같은 기능을 갖음.

// state의 사용 목적 : 페이지 내에서 사용할 수 있는 전역 변수 정도의 변수임.
// state 변수의 값이 바뀔 때, 화면을 재렌더링 하지 않아도 바뀐 값을 사용할 수 있는 변수.

// React 컴포넌트 안에서 tag에 class 값을 부여할 때, className 이라는 속성명을 사용함.
function Test() {
    // setState 함수가 실행되서 state 변수가 변경되면, 자연스럽게 그 변수를 소유한 컴포넌트가 다시 render됨.
    console.log('Test 컴포넌트에서 render됨.')

   // 현재 위치에서 useState라는 함수를 이용해서 state 변수를 만듦.
   const [temp, setTemp] = useState( 0 );
   // useState 함수의 사용
   // 1.첫 번째 인자 : 사용할 변수 이름
   // 2.두 번째 인자 : temp 변수값을 변경할 수 있는 함수 
   //   temp = 10; 이런 동작이 가능하지만, setTemp(10); 이라는 함수를 사용함. 
   //   그래야 변경된 값이 현재 페이지에 바로 적용됨.
   // 3.함수 전달 인수 : 변수의 초기값 및 type
   
  return (
    <div>
       <h1 className="Test">여기는 Test Commponent 이므니다.</h1>
       <h2>
           temp 변수 값 :{temp} &nbsp;
           <button onClick={()=>{ setTemp(temp + 1)}}>증가</button>
       </h2>
    </div>
  )
}
// state 사용 규칙
// 1. 값을 변경하기 위해서는 반드시 setState(setTemp)로 지정한 함수를 사용함.
// 2. setState 함수를 html 태그의 onClick 같은 속성에서 사용하려면 반드시 function(){},()=>{} 으로 감쌓아서 사용함.

// 자바 스크립트에서 사용하던 변수값이 연산들이 태그안에서 사용될때 { } 묶어서 사용함.

export default Test
// 현재 파일에서 export 할 내용(컴포넌트 또는 다른 내용 등)이 두 개 이상이라면, 
// 중괄호로 묶어서 이름을 나열함. 그러면 그들이 export 됨.
// default는 export 될 내용이 하나 일 때 , 사용함.
// export { obj1, obj2 }
