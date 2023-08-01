import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import A from "./Component/A";
//import B from "./Component/B";
//import C from "./Component/C";

//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
      {/*<Routes>
          <Route path="/" element={<App />} />
          <Route path="/A" element={<A />} />
          <Route path="/B" element={<B />} />
          <Route path="/C" element={<C />} />
        </Routes>
      */}
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
