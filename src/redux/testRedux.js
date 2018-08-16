import { increment, decrement, reset } from './actions/counter'
import store from './store'

// 打印初始状态
console.log(store.getState())

// 每次state更新，打印日志
// 注意 subscribe()返回一个函数来注销监听器
let unsbuscribe = store.subscribe(() =>
  console.log(store.getState())
);

// 发起一系列action
store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(reset())

// 停止监听state更新
unsbuscribe()




// 1.当前文件夹执行命令 webpack testRedux.js build.js
// 竟然在当前文件下生成了build.js文件
// node build.js
