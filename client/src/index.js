import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataProvider from './Components/redux/store';

ReactDOM.render(
    <DataProvider>
      <App/>
    </DataProvider>,
  document.getElementById('root')
);

