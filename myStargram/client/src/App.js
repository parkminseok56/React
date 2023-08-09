import './Style/App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import Join from './Component/Join';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
}

export default App;
