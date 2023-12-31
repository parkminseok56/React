import React, { useState } from 'react'

function Upload(props) {

  const [content, setContent] = useState("");
  // const [contentList, setContentList] = useState([]);

  const onSubmit = () => {
    let arr = [...props.ContentList];
    arr.push(content);
    props.setContentList([...arr]);
    setContent("");
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: "column",
      alignItems: "center"
    }}>
      <br />
      <h1> Upload 컴포넌트입니다.</h1>
      <input type='text' value={content} onChange={
        (e) => {
          setContent(e.currentTarget.value);
        }
      } />
      <button onClick={
        () => {
          onSubmit();
        }
      }>제출</button>
    </div>
  )
}

export default Upload
