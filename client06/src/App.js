import './App.css';
import { Routes, Route } from "react-router-dom";

import Heading from "./Component/Heading";
import List from "./Component/List";
import Upload from "./Component/Upload";

// Heading 태그는 화면의 상단에 상단 게시됨. 나머지 두개의 태그는 링크(메뉴) 클릭에 따라 이동함.
function App() {
  return (
    <>
      <Heading />
      <Routes>
          <Route path="/list" element={<List/>}/>
          <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </>
  );
}

export default App;
