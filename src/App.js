import React from 'react';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import ResumeBuilder from './Components/Resume_builder';
import EditTemplate from './Components/EditTemplate';
import RequireAuth from './Components/RequireAuth';
import Login from './Components/Login';
import ChatGbt from './Components/ChatGbt';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {

  return (
    <>
    
    
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Homepage />} />

        
        <Route path="/ChatGbt" element={<ChatGbt />} />

        <Route path="/Login" element={<Login />} />

        
        <Route path="/resume-builder" element={<ResumeBuilder />} />

        <Route path="/edit-template" element={
          <>
              <RequireAuth>
                <EditTemplate />
              </RequireAuth>
          </>
        } />

        
      </Routes>
    </Router>
    
  
    
    </>
  );
};

export default App;