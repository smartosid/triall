import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Page1 from './Upload';
import Page2 from './View';
import MainView from './MainView';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/mainview" element={<MainView/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
