import React, { useState } from 'react';
import  "./DashboardStyle.css";

function RewardMoneySetting({ handleSave }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [reward, setReward] = useState("");
  const [completed, setCompleted] = useState(false);

  const save = () => {
    handleSave({ month, year, subject, grade, reward, completed, savedAt: new Date() });
  };

  return (
    <div class="dashboardStyle">
      <h3>Set New Reward Money For Fulfilled Tasks</h3>
      Fulfill Until Month: <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
      Year: <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      <label>Subject:</label>
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="Math">Math</option>
        <option value="Czech">Czech</option>
        <option value="English">English</option>
        <option value="Geography">Geography</option>
        <option value="Physics">Physics</option>
        <option value="Biology">Biology</option>
        <option value="History">History</option>
      </select>

      Grade: <input type="number" min="1" max="3"  value={grade} onChange={(e) => setGrade(e.target.value)} />
      Enter Reward for Fulfilled Task: <input type="number" min="0" Kč value={reward} onChange={(e) => setReward(e.target.value)} />
     
      <button onClick={save}>Save Changes</button>
    </div>
  );
}

export default RewardMoneySetting;