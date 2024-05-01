import React, { useEffect, useState } from 'react';
import "./App.css";
import  "./DashboardStyle.css";
import { useContext } from 'react';
import { ProfileContext } from './Profile';


function ShowMonth({selectedDate}) {
 
  const [isCardVisible, setCardVisible] = useState(true);
  const {childList, monthlyList, activeProfile} = React.useContext(ProfileContext);
   // Kontrola, zda jsou data dostupná
   if (!childList.length || !monthlyList.length) {
    return <div>Loading...</div>;  // Vrátí loading stav, pokud data nejsou dostupná
  }
  
const handleCloseCard = () => {
  setCardVisible(false);
};
if (!isCardVisible) {
  return null;
}
const childData = childList.find(child => child.childId === activeProfile);
console.log("selectedDate",selectedDate);
const date = new Date(selectedDate || Date.now());
const selectedDateFormatted = date.toISOString().slice(0,7);
console.log("Selected Date Formatted", selectedDateFormatted);

let monthlyData = monthlyList.find(monthly => monthly.yearMonth === selectedDateFormatted);
console.log("Monthly Data", monthlyData);


let pocketAmount = monthlyData ? monthlyData.pocketAmount: 0;
let totalAmount = monthlyData ? monthlyData.totalAmount : 0;
let totalTaskValue = monthlyData ? monthlyData.totalTaskValue : 0;

  return (
   
    <div style={bodyStyle()}> 

     
     <div className="card text-end" >
     
     
      <div class='dashboardStyle'>  

      <p> </p>
    
      
      <button type="button" className="btn-close" onClick={handleCloseCard} aria-label="Close" class={ 'dashboardStyle' }>Close the card</button>
      <div style={{textAlign:"right", paddingRight:"20px"}}><h2><p>{new Date(selectedDate).toLocaleString('en-us', { month: 'long', year: 'numeric' })}</p></h2>
        </div> 
       
    <p> </p>
    
    <div class="hstack gap-3">
    <div class="p-4"><p style ={{margin:"0 30px"}}><h4>Pocket Money: {totalAmount} </h4></p></div>
     
    <div class="p-4"><h4> Regular Money: {pocketAmount}</h4></div>
    <div class="p-4"><h4> Rewards Gained {totalTaskValue}</h4></div>
   
    </div>

    <p class="d-inline-flex gap-1">
  <a class="btn btn-success" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Fulfilled tasks
    <span class="badge text-bg-secondary">4</span></a>   
</p>
<div class="row">
  <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample1">
      <div class="card card-body">
        Some placeholder:  content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
  <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample2">
       </div>
  
  </div>
</div>
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
    
    };
}
export default ShowMonth;