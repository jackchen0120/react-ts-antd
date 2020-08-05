 /* 描述: 路由组件
 *  作者: Jack Chen
 *  日期: 2020-08-01
 */

import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router/index';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Routes></Routes>
      </Router>
    )
  }
}

export default App;
