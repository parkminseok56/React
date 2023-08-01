import './App.css';

import React, { useState } from 'react'

import { Routes, Route } from "react-router-dom";
import Heading from "./Component/Heading";
import List from "./Component/List";
import Upload from "./Component/Upload";
import Join from "./Component/Join";
import Member from "./Component/Member";

// Heading 태그는 화면의 상단에 상단 게시됨. 나머지 두개의 태그는 링크(메뉴) 클릭에 따라 이동함.
function App() {
  // 컴포넌트 간의 state 변수를 공유하려면 그들을 함께 컨트롤하고 있는 상위 컨포넌트(app.js) 에서 변수값을 공유하도록 함
  const [contentList, setContentList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/list" element={
          <List
            ContentList={contentList}
            setContentList={setContentList} />
        } />
        <Route path="/upload" element={
          <Upload
            ContentList={contentList}
            setContentList={setContentList}
          />
        } />
        <Route path="/join" element={
          <Join />
        }

        />
        <Route path="/members" element={
          <Member />
        }

        />
      </Routes>
    </>
  );
}

export default App;
