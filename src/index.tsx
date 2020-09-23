import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BusinessProvider } from '@/components/Provider/BusinessProvider/BusinessProvider';
import { WebSocket } from '@/components/WebSocket/WebSocket';
import { wsList, config } from '@/config/websocketConfig';
import { PageProvider } from './components/Provider/PageProvider/PageProvieder';
import './index.less';

ReactDOM.render(
  <PageProvider>
    <BusinessProvider>
      <WebSocket wsList={wsList} config={config} >
        <App />
      </WebSocket>
    </BusinessProvider>
  </PageProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
