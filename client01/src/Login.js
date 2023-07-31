import React from 'react'

function Login() {
    console.log('Login Component가 render됨.')
    return (
      <div>
         <form>
            아이디: <input type='text' /> <br/>
            패스워드: <input type='password'/> <br/>
            <button>로그인</button>
         </form>
      </div>
    )
  }
  

export default Login
