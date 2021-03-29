import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DataProvider from './Components/redux/store';

ReactDOM.render(
    <DataProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </DataProvider>,
  document.getElementById('root')
);

