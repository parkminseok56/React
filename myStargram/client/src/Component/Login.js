import React from 'react'
import '../Style/login.css'

function Login() {
    return (
        <div id="wrap">
            <div id="logo">MyStarGram</div>

            <div className='lable'><label>E-mail</label></div><br />
            <div><input type="text" /></div>
            <div className='lable'><label>password</label></div><br />
            <div><input type="text" /></div><br />
            <div><button>로그인</button></div>
            <div><button>회원가입</button></div>
            <div><button>카카오 회원가입 및 로그인</button></div>
            <div><button>네이버 회원가입 및 로그인</button></div>
            <div><button>Google 회원가입 및 로그인</button></div>
            <div><button>facebook 회원가입 및 로그인</button></div>
        </div>
    )
}

export default Login
