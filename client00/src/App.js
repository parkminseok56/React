import logo from './logo.svg';
import './App.css';

// function App(){} <- component : 하나의 단위태그를 리턴해주는 함수.
function App() {
  return (  // return 명령의 입장에서는 return 되는 태그는 반드시 한 개 이여야 함.
  <>
     <div className="App">
      <header className="App-header">
         <h1>Hello React App#1~!!</h1>
         <h2>Welcome to my React World~#1!!</h2>
      </header>
    </div>
    <div className="App">
      <header className="App-header">
         <h1>Hello React App#2~!!</h1>
         <h2>Welcome to my React World~#2!!</h2>
      </header>
    </div>
    </>
    // <h2>Welcome to my React World~!!</h2>  리턴의 명령 밖에 태그 밖에 있으면 에러남.
  );
}

export default App;
