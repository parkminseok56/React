// import logo from './logo.svg';
import './App.css';          // css 파일을 단순 import해서 적용함
import Test from './Test';  // import 해서 그 파일이 export 한 내용을 변수에 저장함.(js 파일은 파일 종류 생략가능)
import Login from './Login';
// import 한 Test 컴포넌트를 Test 변수에 저장하면 아래와 같이 태그처럼 사용해서 해당위치에 내용을 삽입함.
function App() {
  return (
    <div className="App">
       <h1>Hello, React~!!</h1>
       <Test />   
       <Login />
    </div>
  );
}

// Login 컴포넌트를 간단히 만들어서 Test 밑에 삽입하세요
export default App;
