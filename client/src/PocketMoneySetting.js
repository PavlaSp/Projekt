import React, { useState } from 'react';
import  "./DashboardStyle.css";
import NavigationBar from './NavigationBar';

function PocketMoneySetting({ handleSave }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");

  const save = () => {
    handleSave({ month, year, amount, savedAt: new Date() });
  };

  return (
    <div class="dashboardStyle">
      <h3>Set New Regular Pocket Money</h3>
        From Month: <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
        Year: <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        Enter New Regular Pocket Money: <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={save}>Save Changes</button>
    </div>
  );
}

export default PocketMoneySetting;