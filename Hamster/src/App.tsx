import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exchange from './screen/exchange';
import MinePage from './screen/mine';
import Friend from './screen/friend';
import YouTubeEmbed from './screen/youtube';
import YouTubePage from './screen/youtubepage';
import RegisterAccount from './screen/Register/Register';
import LoginAccount from './screen/Login/Login';
import Setting from './screen/Setting';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterAccount />} />
           <Route path="/" element={<LoginAccount />} />
          <Route path='/Exchange' element={<Exchange />} />
          <Route path='/mine-page' element={<MinePage />} />
          <Route path='/friend-page' element={<Friend />} />
          <Route path='/video-page' element={<YouTubePage />} />
          <Route path='/settings' element={<Setting />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


