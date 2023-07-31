import React from 'react'
import './Test.css';
// Component 생성방식은 지금 사용하려는 함수형 방식이 있고, 예전 방식인 class 형 방식이 있음.
// 함수와 클래스의 형태로 다를 뿐, 태그를 리턴한다는 면에서 둘의 방식은 같은 기능을 갖음.

// React 컴포넌트 안에서 tag에 class 값을 부여할 때, className 이라는 속성명을 사용함.
function Test() {
  return (
    <div>
       <h1 className="Test">여기는 Test Commponent 이므니다.</h1>
    </div>
  )
}

export default Test
// 현재 파일에서 export 할 내용(컴포넌트 또는 다른 내용 등)이 두 개 이상이라면, 
// 중괄호로 묶어서 이름을 나열함. 그러면 그들이 export 됨.
// default는 export 될 내용이 하나 일 때 , 사용함.
// export { obj1, obj2 }
