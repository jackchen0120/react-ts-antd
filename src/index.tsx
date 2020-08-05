 /* 描述: 主文件入口
 *  作者: Jack Chen
 *  日期: 2020-08-01
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import '@/styles/base.less';
import App from './App';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate persistor={ persistor }>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
