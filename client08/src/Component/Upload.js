import React, { useState } from 'react'

function Upload(props) {
  const [content, setContent] = useState('')
  // const [contentList, setContentList] = state([])
  const onSubmit = () => {
    let tempArr = [...props.contentList]
    tempArr.push(content)
    props.setContentList([...tempArr])
    setContent('')
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <br />
      <input type='text' value={content} onChange={(e) => {
        setContent(e.target.value)
      }} />
      <button onClick={() => {
        onSubmit()
      }}>제출</button>
    </div>
  )
}

export default Upload
