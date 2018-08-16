// 1.尝试运行webpack   webpack --config webpack.dev.config.js 此指令在dist文件夹下生成bundle文件
// document.getElementById('app').innerHTML = 'webpack works'


// 2.尝试es6转义
// var func = str => {
//   document.getElementById('app').innerHTML = str;
// }

// func('现在升级使用了Babel');


// 3.尝试引入react
// import React from 'react';
// import ReactDom from 'react-dom';

// ReactDom.render(
//     <div>Hello React!</div>, document.getElementById('app'));


// 4.尝试引入Hello组件
// import React from 'react';
// import ReactDom from 'react-dom';
// import Hello from './component/Hello/Hello';

// ReactDom.render(
//     <Hello/>, document.getElementById('app'));



// 5.尝试引入react-router-dom
// import React from 'react';
// import ReactDom from 'react-dom';

// import getRouter from './router/router';

// ReactDom.render(
//     getRouter(), document.getElementById('app'));



// 6.引入热模块替换   "start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"
// import React from 'react';
// import ReactDom from 'react-dom';

// import getRouter from './router/router';

// if (module.hot) {
//     module.hot.accept();
// }

// ReactDom.render(
//     getRouter(), document.getElementById('app'));



// 7.由于react-hot-loader而做的修改
// import React from 'react';
// import ReactDom from 'react-dom';
// import { AppContainer } from 'react-hot-loader';

// import getRouter from './router/router';

// /*初始化*/
// renderWithHotReload(getRouter());

// /*热更新*/
// if (module.hot) {
//   module.hot.accept('./router/router', () => {
//     const getRouter = require('./router/router').default;
//     renderWithHotReload(getRouter());
//   });
// }

// function renderWithHotReload(RootElement) {
//   ReactDom.render(
//     <AppContainer>
//       {RootElement}
//     </AppContainer>,
//     document.getElementById('app')
//   )
// }


// npm install --save react-redux
// 8.所有容器组件都可以访问 Redux store，所以可以手动监听它。
// 一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。
// 建议的方式是使用指定的 React Redux 组件 来 魔法般的 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

// Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。
// connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。
import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';

import getRouter from 'router/router';

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}



