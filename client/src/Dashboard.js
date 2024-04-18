import React, { useState } from 'react';
import "./App.css";
import  "./DashboardStyle.css";
import Icon from '@mdi/react';
import { mdiCalendarMonth } from '@mdi/js';

function Dashboard({ pocketMoney, rewardMoney, handleCompleteReward }) {
  const [selectedMonth, setSelectedMonth] = useState("");

  const totalForMonth = () => {
    let total = 0;

    pocketMoney.forEach((item) => {
      if (item.month === selectedMonth) {
        total += Number(item.amount);
      }
    });

    rewardMoney.forEach((item) => {
      if (item.month === selectedMonth && item.completed) {
        total += Number(item.reward);
      }
    });

    return total;
  };

  return (
    <div> 
      <p> 
      <h3>Dashboard</h3></p>
      <div class='dashboardStyle'> 
      <h3>Pocket Money Amount for Month</h3>
      <p></p>
      <Icon path={mdiCalendarMonth} size={1}/>{"  "}
      Select Month: 
      <input type="text" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
      <p>
      Pocket Money a Reward Money za měsíc: </p>
      {
        rewardMoney.map((reward, i) => (
          <div key={i}>
            {reward.subject} - {reward.reward} 
            <input type="checkbox" checked={reward.completed} 
             onChange={() => handleCompleteReward(i, !reward.completed)} />
             <span class="badge text-bg-warning">Warning</span>
             
          </div>
                      
        ))
      }
      
      Celkem za měsíc: {totalForMonth()}
    </div>
    </div>
  );
}

export default Dashboard;