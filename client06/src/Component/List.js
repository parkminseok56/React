import React from 'react'

function List(probs) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1>
        {/* contenList에 있는 단어들을 하나 씩 출력합니다*/}
        {
          probs.contenList.map((content, idx) => {
            return <div key={idx}>{content}</div>;
          }
          )
        }
      </h1>
    </div>
  )
}

export default List
