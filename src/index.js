import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Apidoc1 from './apidoc/apidoc1';
import Apidoc2 from './apidoc/apidoc2';
import Apidoc3 from './apidoc/apidoc3';
import Apidoc4 from './apidoc/apidoc4';
import Apidoc5 from './apidoc/apidoc5';
import Apidocdashboard from './apidoc/apidocdashboard';
import Apirouter from './apidoc/apirouter';
import Apidoclogin from './apidoc/apidoclogin';
import Nextstack1 from './NextStack/nextstack1';
import Nextstack2 from './NextStack/nextstack2';
import Nextstack12 from './NextStack/nextstack12';
import Nextstack3 from './NextStack/nextstack3';
import Nextstack4 from './NextStack/nextstack4';
import Nextstack5 from './NextStack/nextstack5';
import Nextstack345 from './NextStack/nextstack345';
import NextstackRouter from './NextStack/nextstackrouter';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Apirouter/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
