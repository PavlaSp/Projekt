import React, { useContext, useState } from 'react';
import Profile from './Profile';
import  "./DashboardStyle.css";
import { ProfileContext } from './Profile';
import ShowMonth from "./ShowMonth";
import Calendar from "./Calendar";

function Dashboard() {
 
  const { activeProfile } = useContext(ProfileContext);
  const [savedDates, setSavedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const updateSelectedDate = (date) => {
    setSelectedDate(date); 
    setSavedDates([...savedDates, date]);
  };
  return (
    <div >
    <div style={bodyStyle()}>
    <div class='dashboardStyle'> 
    <div class style ={{margin:"2px"}}><h4>Your are logged as: Parent</h4>
    <h4>{activeProfile ? ` ${activeProfile} Pocket Money` : 'Select a profile'}</h4>
   
    </div>
    
    <div style={{ textAlign: 'right', padding: '20px' }}>
     <h4>Pick a date   <Calendar selectedDate={selectedDate} updateSelectedDate={updateSelectedDate} /></h4></div>
       
    </div>
   

    {savedDates.map((date, index) => (
        <ShowMonth key={index} selectedDate={date} />
      ))}
        
</div>
</div>

     
   
  );
}
function bodyStyle() {
  return {
    
    padding: "30px",
    alignItems:"top",
    maxHeight:"100vh",
    overflowY:"auto",
    justifyContent:"space-between",
    flexDirection: 'column',
    
    };
}
export default Dashboard;