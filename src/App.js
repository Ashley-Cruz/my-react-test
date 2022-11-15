import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { router } from './routes/router';
import './scss/styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
  )
}

export default App;