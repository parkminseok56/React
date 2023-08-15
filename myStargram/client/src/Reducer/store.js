import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';

// 사고팔고자하는 저장소의 등록
export default configureStore({
    reducer: {
        user:userSlice,    // 외부에서 userSlice의 내용을 user 라는 이름으로 한번에 가져다 쓸수있게 설정
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
    }) // 경고성 에러내용 무시
})