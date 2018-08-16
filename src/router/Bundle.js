// 我们现在看到，打包完后，所有页面只生成了一个build.js,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的js了哦。
// 在 react-router 2.0时代， 按需加载需要用到的最关键的一个函数，就是require.ensure()，它是按需加载能够实现的核心。
// 在4.0版本选择了一个更加简洁的处理方式。

import React, {Component} from 'react'

class Bundle extends Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        return this.props.children(this.state.mod)
    }
}

export default Bundle;