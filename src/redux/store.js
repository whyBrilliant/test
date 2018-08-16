// 第1步
// 使用 action 来描述“发生了什么”，使用action创建函数来返回action。
// 使用 reducers 来根据 action 更新 state 。
// 如何提交action？提交的时候，怎么才能触发reducers呢？

// store 就是把它们联系到一起的对象。store 有以下职责：
// 维持应用的 state；
// 提供 getState() 方法获取 state；
// 提供 dispatch(action) 触发reducers方法更新 state；
// 通过 subscribe(listener) 注册监听器;
// 通过 subscribe(listener) 返回的函数注销监听器。

// import { createStore } from 'redux'
// import combineReducers from './reducers.js'
// let store = createStore(combineReducers);
// export default store;


// npm install --save redux-thunk
// 第2步 action创建函数都是返回action对象，为了让action创建函数除了返回action对象外，还可以返回函数，我们需要引用redux-thunk。
// 简单的说，中间件就是action在到达reducer，先经过中间件处理。我们之前知道reducer能处理的action只有这样的{type:xxx}，所以我们使用中间件来处理
// 函数形式的action，把他们转为标准的action给reducer。这是redux-thunk的作用。

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';
let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
export default store;
