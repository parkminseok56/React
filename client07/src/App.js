import logo from './logo.svg';
import './css/App.css';
import React ,{ useState } from 'react'

import { Routes, Route } from "react-router-dom";
import Heading from "./Component/Heading";
import Join from "./Component/Join";
import Result from "./Component/Result";

function App() {
  return (
    <>
     <Heading/>
     <Routes>
        <Route path='/join' element={<Join/>} />
        <Route path='/result' element={<Result/>} />
     </Routes>

    </>
  );
}

export default App;
