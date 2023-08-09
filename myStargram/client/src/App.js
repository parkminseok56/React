import React, {useState, useEffect} from 'react'
import {  Routes, Route } from "react-router-dom";
import axios from "axios";

import Login from './Component/Login';
import Join from './Component/Join';
import Home from './Component/Home';
import UpdateMember from './Component/UpdateMember';
import MainMenu from './Component/MainMenu';

function App() {
    const [ loginUser, setLoginUser] = useState({});
    const [ login, setLogin ] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            try{  
                let result = await axios.get('/api/member/getLoginUser');
                if(result.data.loginUser){
                    setLoginUser( result.data.loginUser );
                    setLogin(true);
                }
            }catch(err){  console.error(err);  }
        }
        fetchData();
    }, []);

    return (
        <>
            {
                (login)?
                (<MainMenu 
                    loginUser={loginUser} setLoginUser={setLoginUser}
                    login={login} setLogin={setLogin}
                />):
                (null)
            }
            <Routes>
                <Route path="/" element={
                    <Login 
                        loginUser={loginUser} setLoginUser={setLoginUser}
                        login={login} setLogin={setLogin}
                    />
                } /> 
                <Route path="/join" element={<Join />} /> 
                <Route path="/Home" element={
                    <Home 
                        loginUser={loginUser} setLoginUser={setLoginUser}
                        login={login} setLogin={setLogin}
                    />
                } /> 

                <Route path="/updateMember" element={
                    <UpdateMember 
                        loginUser={loginUser} setLoginUser={setLoginUser}
                        login={login} setLogin={setLogin}
                    />
                } />     
            </Routes>
            
        </>
    );
}

export default App;
