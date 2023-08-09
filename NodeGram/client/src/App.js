import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Routes, Route } from "react-router-dom";
import Heading from './Component/Heading';
import Main from './Component/Main';
import Join from './Component/Join';

function App() {
    const [loginUser, setLoginUser] = useState({});
    const [login, setLogin] = useState(false);
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                let result = await axios.get('/api/auth/getLoginUser');
                if (result.data.loginUser) {
                    setLoginUser(result.data.loginUser);
                    setLogin(true);
                    let result2 = await axios.get(`/api/user/getFollowers/${result.data.loginUser.id}`)
                    setFollower([...result2.data]);  // loginuser를 follow 하는 사람들 
                    let result3 = await axios.get(`/api/user/getFollowings/${result.data.loginUser.id}`);
                    setFollowing([...result3.data]);  // loginuser 가 follow 하는 사람들
                    console.log('follower', result2.data);
                    console.log('following', result3.data);
                } else {
                    setLoginUser({});
                    setLogin(false);
                }
            } catch (err) { console.error(err); }
        }
        fetchData();
    }, []);
    return (
        <>
            {/* 여기에 layout.html 의 내용이 표시될 예정 */}
            <Heading
                loginUser={loginUser} setLoginUser={setLoginUser}
                login={login} setLogin={setLogin}
                follower={follower} setFollower={setFollower}
                following={following} setFollowing={setFollowing}
            />
            <Routes>
                {/* block content 에 해당한 페이지들이 표시될 예정 */}
                {/* <Route path="/" element={} /> */}
                <Route path="/" element={
                    <Main
                        loginUser={loginUser} setLoginUser={setLoginUser}
                        login={login} setLogin={setLogin}
                        follower={follower} setFollower={setFollower}
                        following={following} setFollowing={setFollowing}
                    />
                } />
                <Route path="/join" element={<Join />} />
            </Routes>
        </>
    );
}

export default App;
