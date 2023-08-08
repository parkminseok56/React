import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Routes, Route } from "react-router-dom";
import Heading from './Component/Heading';
import Main from './Component/Main';
import Join from './Component/Join';
import Profile from './Component/Profile'; // 수정: '/' 대신 './'를 사용해야 합니다.

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
                    setFollower([...result2.data]);
                    let result3 = await axios.get(`/api/user/getFollowings/${result.data.loginUser.id}`);
                    setFollowing([...result3.data]);
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
            <Heading
                loginUser={loginUser} setLoginUser={setLoginUser}
                login={login} setLogin={setLogin}
                follower={follower} setFollower={setFollower}
                following={following} setFollowing={setFollowing}
            />
            <Routes>
                <Route path="/" element={
                    <Main
                        loginUser={loginUser} setLoginUser={setLoginUser}
                        login={login} setLogin={setLogin}
                        follower={follower} setFollower={setFollower}
                        following={following} setFollowing={setFollowing}
                    />
                } />
                <Route path="/join" element={<Join />} />
                <Route path="/profile" element={
                    <Profile
                        loginUser={loginUser} setLoginUser={setLoginUser}
                        login={login} setLogin={setLogin}
                        follower={follower} setFollower={setFollower}
                        following={following} setFollowing={setFollowing}
                    />
                } />
            </Routes>
        </>
    );
}

export default App;