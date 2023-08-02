import Login from './Component/Login';
import Main from './Component/Main';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        {<Route path='/main' element={<Main />} />}
      </Routes>
    </>
  );
}

export default App;