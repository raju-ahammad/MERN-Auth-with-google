import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataProvider from './Components/redux/store';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App/>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

