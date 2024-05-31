import React, { useState } from 'react';
import "./App.css";
import  "./DashboardStyle.css";
import { ProfileContext } from './Profile';

function ShowMonth({selectedDate}) {
 
  const [isCardVisible, setCardVisible] = useState(true);
  const {monthlyList, childList, taskList, activeProfile} = React.useContext(ProfileContext);
  if (!selectedDate || !activeProfile) {
    return null; 
  }
   
const handleCloseCard = () => {
  setCardVisible(false);
};
if (!isCardVisible) {
  return null;
}

console.log("selectedDate",selectedDate);
const date = new Date(selectedDate || Date.now());
const selectedDateFormatted = date.toISOString().slice(0,7);
console.log("Selected Date Formatted", selectedDateFormatted);

let childData = childList.filter(
  (child) => child.childId === activeProfile.id
)[0];
console.log("Child Data", childData);

let monthlyData = monthlyList.filter(
  (monthly) => monthly.yearMonth === selectedDateFormatted && monthly.childId === activeProfile.id
)[0];
console.log("Monthly Data", monthlyData);


let pocketAmount = monthlyData ? monthlyData.pocketAmount: 0;
let totalAmount = monthlyData ? monthlyData.totalAmount : 0;
let totalTaskValue = monthlyData ? monthlyData.totalTaskValue : 0;

let taskData = taskList.filter(
  (task) => (task.dateUntil === selectedDateFormatted || task.dateFinished === selectedDateFormatted) && task.childId === activeProfile.id
);
taskData = taskData ? taskData : [];
console.log("Tasks", taskData);


let unfinishedTasks = taskData.filter(task => !task.dateFinished && task.dateUntil === selectedDateFormatted);
let finishedTasks = taskData.filter(task => task.dateFinished);

const handleFinishTask = (id, selectedDateFormatted) => {
  fetch('http://localhost:8000/task/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      taskId: id,
      dateFinished: selectedDateFormatted,
    }),
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

let unfinishedTaskList = unfinishedTasks.map(task => {
  return (
    <div key={task.id}>
      <div className="hstack gap-3"  >
      <div className="p-1"> <p style={{ fontSize: '15px'}}>Reward: {task.rewardedAmount} Kč </p>
      </div>
      <div className="p-1"> <p style={{ fontSize: '15px'}}> for  Subject: {task.taskName}  and Grade: {task.grade} </p>
      </div>
      <div className="p-1" >
    <input 
  className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
  disabled={new Date() > new Date(task.dateUntil)} 
  onChange={() => {
    if(window.confirm('Do you want to save it as finished task?')) {
      handleFinishTask(task.id, selectedDateFormatted)
    }
  }} />
  </div>  
  </div>
  </div>
  )
});

let finishedTaskList = finishedTasks.map(task => {
  return (
    
    <div key={task.id}>
      <div className="hstack gap-3"  >
      <div className="p-1"> <p style={{ fontSize: '15px'}}>Reward: {task.rewardedAmount} Kč </p>
      </div>
      <div className="p-1"> <p style={{ fontSize: '15px'}}> for  Subject: {task.taskName}  and Grade: {task.grade} </p>
      </div>
  </div>
  </div>
 
  )
});

  return (
   
    <div style={bodyStyle()}> 
   <div className="card text-end" >   
     
      <div className='dashboardStyle'>  
      <p> </p>
    
      <button type="button"  onClick={handleCloseCard} aria-label="Close" className={ 'dashboardStyle' }>Close the card</button>
      <p></p><div style={{textAlign:"right", paddingRight:"20px"}}><h2>{new Date(selectedDate).toLocaleString('en-us', { month: 'long', year: 'numeric' })}</h2>
        </div> 
       
    <p> </p>
    
    <div className="hstack gap-3">
    <div className="p-2"><p style ={{margin:"0 30px"}}><h4> Total Pocket Money: {totalAmount} Kč = </h4></p></div>
     <div className="p-2"><h4> Regular Money: {pocketAmount} Kč </h4></div>
    <div className="p-2"><h4> + Rewards Gained: {totalTaskValue} Kč </h4></div>
   
    </div>
    <div className="card">
    <div className='dashboardStyle'> 
  <div className="card-header" style={{ border: "2px solid green", backgroundColor: "#c1d5c5", fontSize: '25px', fontWeight: 'bold' }}>
  Finished Tasks in this Month:
  </div>
    <h5 className="card-text" style={{textAlign:"left", paddingLeft:"20px"}}> {finishedTaskList} </h5>
    </div>
    </div>
    </div>
      <div className='dashboardStyle'> 
      <div className="card-header" style={{ border: "2px solid green", backgroundColor: "#f7dcba", fontSize: '25px', fontWeight: 'bold' }}>
         Waiting Tasks to be finished: 
    </div>
    <h5 className="card-text" style={{textAlign:"left", paddingLeft:"20px"}}> {unfinishedTaskList} </h5>
      </div>
      </div>
      </div>
    
       
  );
}
function bodyStyle() {
  return {
    display: "grid",
    padding: "30px",
    alignItems:"center",
    ustifyContent:"space-between",
    marginBottom:"5px",
    
    };
}
export default ShowMonth;