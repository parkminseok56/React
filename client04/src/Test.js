import React, {useState} from 'react'
import './Test.css';

// input 테그로 입력란 만들고,  입력란에 단어를 입력하고 버튼을 누르면, 입력한 단어가 배열(state변수)에 차곡 차곡 쌓이게 할 예정입니다. 이또한 화면에 추가할때마다 보여지게 합니다

function Test() {
    const [content, setContent ] = useState("");   // 하나의 단어를 저장할 변수
    const [contentList, setContentList ] = useState([]);  // 단어들을 배열로 저장할 변수
    const onSubmit=()=>{
        let tempArr=[...contentList]; // 이전 배열 복사
        tempArr.push( content );   // 현재 단어 추가
        setContentList([...tempArr]);  // 배열을 contentList 로 복사
        setContent("");   // 입력란 비움
    }
    return (
        <div>
            <input type="text" value={content}  onChange={
                (e)=>{
                    // 현재 이벤트가 일어난 자신을 가르키는 변수 e 를 사용합니다
                    setContent( e.currentTarget.value );
                }
            } />
            <button onClick={ 
                ()=>{ 
                    onSubmit(); 
                } 
            } >제출</button>
            <br />
            {
                contentList.map( 
                    (con, idx)=>{
                        return <div key={idx}>{con}</div>;
                    }
                )
            }
        </div>
    )
}
// 반복실행문이나 map 함수를 이용해서 같은 종류의 태그가 연속해서 같은위치에 등장한다면 각태그들에 key라는 속성을 부여해서 서로 다른 값으로 구분되게 합니다.

export default Test
