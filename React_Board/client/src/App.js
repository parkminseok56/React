import { useState } from 'react';
import Login from './Component/Login';
import Main from './Component/Main';
import Memberjoin from './Component/Memberjoin';
import UpdateMember from './Component/UpdateMember';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [message, setMessage] = useState();

  return (
    <>
      <Routes>
        <Route path='/' element={<Login message={message} setMessage={setMessage} />
        } />
        <Route path='/main' element={<Main />} />

        <Route path='/memberjoin' element={<Memberjoin message={message} setMessage={setMessage} />
        } />
        <Route path='/updateMember' element={<UpdateMember message={message} setMessage={setMessage} />
        } />
      </Routes>
    </>
  );
}

export default App;