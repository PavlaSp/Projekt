import  "./DashboardStyle.css";
import React, { useState } from 'react';
import { ProfileContext } from './Profile';

function ShowSetting () {
  
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [reward, setReward] = useState("");
  const [month, setMonth] = useState((new Date()).getMonth() + 1);
  const [year, setYear] = useState((new Date()).getFullYear());
  const {activeProfile} = React.useContext(ProfileContext);
  const childId = activeProfile ? activeProfile.id : null;

  if (!childId ) {
    return <p>Select a Child Profile</p>;
  }


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({length: 12}, (_, i) => 2024 + i);

  const dateInFormat = `${year}-${month < 10 ? `0${month}` : month}`;

  const save = () => {
    if (window.confirm("Opravdu chcete data uložit?")) {
      handleSave({ childId, subject, grade, reward, savedAt: new Date() });
    }
  };
  const handleSave = ({ childId, subject, grade, reward }) => {
    const sendData = {
      childId: childId,
      taskName: subject,
      grade: Number(grade),
      rewardedAmount: Number(reward),
      dateUntil: dateInFormat,
    }
  
    console.log('Data being sent:', sendData); // Zkontroluje odesílaná data
    fetch('http://localhost:8000/task/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData),
    })
    .then((response) => {
      if (response.ok) {
        alert('Fulfilled task was successfully saved.');
      } else {
        throw new Error('Something went wrong.');
      }
    })
    .catch((error) => console.log(error));
  };

   
  return (
    <div>
      <div style={bodyStyle()}>
       <div className='dashboardStyle'> </div>
      <h2>Set New</h2>
      <div className='dashboardStyle'style={{ margin: '4px', padding: '20px' }}> 
      
      <h3>Reward Money </h3>
      <p> </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px', padding: '20px' }}>
     
   
    </div>
   
    <form className="row g-3 needs-validation" novalidate>
      
    <div className="col-md-2">
      <label htmlFor="validationCustom01" className="form-label">Fulfill Until Month:</label>
      <select
        className="form-select"
        id="validationCustom01"
        required
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {months.map((m, i) => (
          <option key={i + 1} value={i + 1}>
            {m}
          </option>
        ))}
      </select>
      </div>

      <div className="col-md-2">
      <label htmlFor="validationCustom02" className="form-label">Year:</label>         
      <select className="form-select"
        id="validationCustom02"
        required value={year} onChange={e => setYear(e.target.value)}>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
        </select>
       </div>

    <div className="col-md-2">
      <label for="validationCustom03" class="form-label">Subject:</label>
      <select className="form-select" id="validationCustom03" required value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="math">Math</option>
        <option value="czech">Czech</option>
        <option value="english">English</option>
        <option value="geography">Geography</option>
        <option value="physics">Physics</option>
        <option value="biology">Biology</option>
        <option value="history">History</option>
        <option value="biology">Biology</option>
      </select>
      <div className="invalid-feedback">
      Please select valid subject.
    </div>
  </div>


  <div className="col-md-2">
  <label for="validationCustom04" class="form-label">Grade: </label> 
  <input type="number" min="1" max="3" className="form-control" id="validationCustom04" required value={grade} onChange={(e) => setGrade(e.target.value)} />
  
  <div class="invalid-feedback">
      Please select valid grade.
    </div>
      </div>

      <div className="col-md-2">
      <label for="validationCustom05" class="form-label">Task Reward in Kč:  </label> 
      <input type="number" min="0"  className="form-control" id="validationCustom05" required value={reward} onChange={(e) => setReward(e.target.value)} /> 
         <div class="invalid-feedback">
      Please select valid grade.
    </div>
      </div> 
     
      </form>

      <div className="col-md-2" style={{ textAlign: 'right' }}>
    <p>You selected: {dateInFormat}</p>
    </div>
      <div class="col-12">
      <button class="btn btn-primary" type="submit" onClick={save}>Save Changes</button>
      </div>
    </div>
 
    </div>
   
    </div>
   
  );
}
function bodyStyle() {
  return {
    
    padding: "0 10px",
    alignItems:"top",
    maxHeight:"100vh",
    overflowY:"auto",
    justifyContent:"space-between",
    flexDirection: 'column',
    
    };
}
export default ShowSetting;