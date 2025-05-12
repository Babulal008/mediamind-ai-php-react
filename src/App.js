import React from 'react';
import './App.css';
import './css/custom.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetScript from './getscript';
import GetImages from './GetImages';
import GetVideo from './GetVideo';
import GetAudio from './GetAudio';
import Ready from './ready';

function App() {
  
 
  return (
<>
    <Router>
      <Routes>
      <Route path="/" element={<GetScript/>} />
        <Route path="/GetScript" element={<GetScript/>} />
        <Route path="/GetImages" element={<GetImages/>} />
        <Route path="/GetAudio" element={<GetAudio/>} />
        <Route path="/GetVideo" element={<GetVideo/>} />
        <Route path="/Ready" element={<Ready/>} />
      </Routes>
    </Router>
</>
  );
}

export default App;