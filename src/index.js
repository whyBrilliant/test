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
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import getRouter from './router/router';

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
  module.hot.accept('./router/router', () => {
    const getRouter = require('./router/router').default;
    renderWithHotReload(getRouter());
  });
}

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      {RootElement}
    </AppContainer>,
    document.getElementById('app')
  )
}