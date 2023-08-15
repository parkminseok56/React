import { createSlice } from '@reduxjs/toolkit'

// 이곳은 공동의 변수가 생성되고, 그들의 값을 변경할수 있는 함수가 제작되어서 export 되는 곳입니다.
// export된 함수는 store에서 import 해서 등록하고, 일반 컴포넌트에서 import해서 사용됩니다.

// Slice : 자바와는 형식이 약간 다른 클래스라고 생각하면 쉽습니다.
// 이 안에는 변수와 함수가 만들어집니다
export const userSlice = createSlice({
    name:'user',    // 슬라이스의 이름
    initialState :{     // 사용하고 초기화될 변수
        nick:'',
        uid:'',
        email:'',
        provider:'',
        profileimg:'',
        profilemsg:'',
        phone:'',
        follower:[],
        following:[],        
    },
    reducers:{    // 변수값 조작을 위한 함수들
        // state : 함수에서 위(initialState)에 선언한 변수들에 접근하기위한 객체 이름.
        // action : 회부에서 loginAction을 호출하면서 전달해준 전달인수를 받는 매개변수
        loginAction:(state, action)=>{
            state.nick = action.payload.nick;
            state.uid = action.payload.id;
            state.email = action.payload.email;
            state.provider=action.payload.provider;
            state.profileimg=action.payload.profileimg;
            state.profilemsg=action.payload.profilemsg;
            state.phone=action.payload.phone;
        },
        logoutAction:(state)=>{
            state.nick='';
            state.uid='';
            state.email='';
            state.provider='';
            state.profileimg='';
            state.profilemsg='';
            state.phone='';
        },
        setFollowers:(state, action)=>{
            // action:추가하려는 팔로워의 정보가 객체형식으로 전달
            const newFollower = action.payload;
            if( state.follower.some( (item)=>{return item.id == newFollower.id} ) ) return;
            state.follower.push(
                {
                    id:newFollower.id,
                    nick:newFollower.nick,
                    email:newFollower.email,
                }
            );
        },
        setFollowings:(state, action)=>{
            const newFollowing = action.payload;
            state.following.push(
                {
                    id:newFollowing.id,
                    nick:newFollowing.nick,
                    email:newFollowing.email,
                }
            );
        },
        removeFollowers:(state, action)=>{
            // action : 삭제하려는 팔로워의 아이디가 전달
            const id = action.payload;
            // 전달된 id 와 같은 팔로워는 필터링해서 버리고, 전달된 id와 다른 나머지를 취하여 배열을 갱신
            state.follower = state.follower.filter( (item)=>{return  item.id != id } );
        },
        removeFollowings(state, action) {
            const id = action.payload;
            state.following = state.following.filter((item) =>{return item.id !== id } );
        },
    }
})

// 생성한 각 함수를 별도의 이름으로  export 해서 개별적으로 사용되게 합니다.
export const { loginAction, logoutAction, setFollowers, setFollowings, removeFollowers, removeFollowings  } = userSlice.actions

export default userSlice.reducer