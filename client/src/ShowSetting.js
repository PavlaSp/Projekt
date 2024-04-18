import React from "react";
import PocketMoneySetting from "./PocketMoneySetting";
import RewardMoneySetting from "./RewardMoneySetting";
import  "./DashboardStyle.css";

function ShowSetting({ handleSavePocketMoney, handleSaveRewardMoney }) {
  return (
    <div>
       <div className='dashboardStyle'> </div>
      <h2>Settings</h2>
      <p>
      <PocketMoneySetting handleSave={handleSavePocketMoney}/></p>
      <p><RewardMoneySetting handleSave={handleSaveRewardMoney}/></p>
    </div>
  );
}

export default ShowSetting;