import './App.css';
import A from "./Component/A";
import B from "./Component/B";
import C from "./Component/C";
import {  Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path="/" element={<A />} />
        <Route path="/B" element={<B />} />
        <Route path="/C" element={<C />} />
    </Routes>
  );
}

export default App;
