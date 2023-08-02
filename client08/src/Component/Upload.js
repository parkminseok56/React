import React, { useState } from 'react'

function Upload(props) {

  const [content, setContent] = useState("");
  // const [contentList, setContentLsit ] = useState([]);

  const onSubmit = () => {
    let arr = [...props.ContentList];
    arr.push(content);
    props.setContentList([...arr]);
    setContent("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <br />
      <input type="test" value={content} onChange={
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
