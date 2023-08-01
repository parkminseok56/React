import './css/App.css';
import React, { useState } from 'react'

import { Routes, Route } from "react-router-dom";
import Heading from "./Component/Heading";
import Join from "./Component/Join";
import Result from "./Component/Result";

function App() {
  const [contentList, setContentList] = useState([]);
  return (
    <>
      <Heading />
      <Routes>
        <Route path='/join' element={
          <Join contentList={contentList}
            setContentList={setContentList} />
        } />
        <Route path='/result' element={
          <Result contentList={contentList}
            setContentList={setContentList} />
        } />
      </Routes>

    </>
  );
}

export default App;
