import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import '@/styles/base.less';
import App from './App';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
