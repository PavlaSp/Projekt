import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import ShowSetting from "./ShowSetting";
import NavigationBar from './NavigationBar';
import "./App.css";
import SettingsCard from './SettingsCard';

function App() {
  const [pocketMoney, setPocketMoney] = useState([]);
  const [rewardMoney, setRewardMoney] = useState([]);

  const handleSavePocketMoney = (newPocketMoney) => {
    setPocketMoney(prev => [...prev, newPocketMoney]);
  };

  const handleSaveRewardMoney = (newRewardMoney) => {
    setRewardMoney(prev => [...prev, newRewardMoney]);
  };

  const handleCompleteReward = (index, completed) => {
    setRewardMoney(rewardMoney.map((reward, i) => 
      i === index ? { ...reward, completed } : reward
    ));
  };

  return (
    <Router>
      <nav>
      <NavigationBar/>
            
        <SettingsCard/>
      </nav>

      <Routes>
        <Route path="/dashboard" element={<Dashboard pocketMoney={pocketMoney} rewardMoney={rewardMoney} handleCompleteReward={handleCompleteReward} />} />
        <Route path="/settings" element={<ShowSetting handleSavePocketMoney={handleSavePocketMoney} handleSaveRewardMoney={handleSaveRewardMoney} />} />
      </Routes>
    </Router>
  );
}

export default App;