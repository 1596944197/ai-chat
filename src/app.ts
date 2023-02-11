import { Component, PropsWithChildren } from 'react';
import './app.less';
import 'ossaui/dist/style/index.scss'
import './utils/ws-client';

class App extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
