import { useState } from 'react';
import Login from './Component/Login';
import Main from './Component/Main';
import Memberjoin from './Component/Memberjoin';
import UpdateMember from './Component/UpdateMember';
import { Routes, Route } from 'react-router-dom';
import BoardView from './Component/BoardView';
import WriteBoard from './Component/WriteBoard';
import UpdateBoard from './Component/UpdateBoard';
import Reply from './Component/Reply';

function App() {
  const [message, setMessage] = useState();
  const [boardid, setBoardid] = useState();

  return (
    <>
      <Routes>
        <Route path='/' element={<Login message={message} setMessage={setMessage} />
        } />
        <Route path='/main' element={<Main boardid={boardid} setBoardid={setBoardid} />} />

        <Route path='/boardview' element={<BoardView boardid={boardid} setBoardid={setBoardid} />} />


        <Route path='/memberjoin' element={<Memberjoin message={message} setMessage={setMessage} />
        } />
        <Route path='/updateMember' element={<UpdateMember message={message} setMessage={setMessage} />
        } />

        <Route path='/writeBoard' element={<WriteBoard />} />

        <Route path='/updateBoard' element={<UpdateBoard boardid={boardid} setBoardid={setBoardid} />} />

        <Route path='/reply' element={<Reply boardid={boardid} setBoardid={setBoardid} />} />

      </Routes>
    </>
  );
}

export default App;