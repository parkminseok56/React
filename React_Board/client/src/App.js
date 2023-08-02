import Login from './Component/Login';
import Main from './Component/Main';
import Memberjoin from './Component/Memberjoin';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/memberjoin' element={<Memberjoin />} />
      </Routes>
    </>
  );
}

export default App;