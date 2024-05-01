import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import NavigationBar from './NavigationBar';
import "./App.css";
import Profile from './Profile';
import ShowSetting from "./ShowSetting"; 


function App() {
  const [selectedDate, updateSelectedDate] = useState(new Date());
  const [pocketMoney, setPocketMoney] = useState([]);
  const [rewardMoney, setRewardMoney] = useState([]);
  const [savedDates, setSavedDates] = useState([]);
  

  return (

    <div style={componentStyle()}>
    
    <Router>
    <Profile>
      <nav>
      <div class>  
      <NavigationBar style={{ backgroundColor: "rgb(#FFDAB9)", height:"100px", border:"1px solid #38246b" }} /> 
    
                 
      </div>
      </nav>

      <Routes>
      
      <Route path="/:childId" element={<Dashboard />} /> 
     <Route path="/settings" element={<ShowSetting />} />
      </Routes>
      </Profile>
    </Router>
    
    </div>
  );
}
function componentStyle() {
  return {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
   
    overflowY: "auto",
    backgroundColor: "rgb(234 238 242)"
  };
}

export default App;