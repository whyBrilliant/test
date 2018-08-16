// 第1步
// import counter from './reducers/counter'
// import userInfo from './reducers/userInfo';

// export default function combineReducers(state = {}, action) {
//   return {
//     counter: counter(state.counter, action), //1.测试redux
//     userInfo: userInfo(state.userInfo, action) // 2.测试不同的请求状态
//   }
// }

// 第2步， 使用redux提供的combineReducers函数合并reducer,不用自己合并
import {combineReducers} from "redux";

import counter from './reducers/counter';
import userInfo from './reducers/userInfo';


export default combineReducers({
    counter,
    userInfo
});
