import React, { Component } from 'react';

// 测试Home页面
// export default class Home extends Component {
//     render() {
//         return (
//             <div>
//                 this is home~
//             </div>
//         )
//     }
// }

// 测试 当模块热替换的时候，state会重置
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                this is home~`123456<br />
                当前计数：{this.state.count}<br />
                <button onClick={() => this._handleClick()}>自增</button>
            </div>
        )
    }
}