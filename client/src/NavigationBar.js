import React, { useContext} from 'react';
import { Link, useLocation } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
import { mdiSack } from '@mdi/js';
import { ProfileContext } from './Profile';
import "./App.css";

function NavigationBar() {
  const { childList, activeProfile, setActiveProfile } = useContext(ProfileContext);
  const location = useLocation ();
  
 
 return (
<nav class="navbar navbar-expand-lg" style={componentStyle()} >
  <div class="container-fluid">
  <div> 
  <Icon path={mdiSack} size={1} color={"grey"}/>
  <a class="navbar-brand" href="#">REWARD <p style = {{margin: "0", paddingTop:"0,3px"}}></p> Pocket Money</a>
       </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
       <Link to="/dashboard" className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}>Dashboard</Link>
              </li>
        <li class="nav-item">
        <Link to="/settings" className={location.pathname === "/settings" ? "nav-link active" : "nav-link"}>Set New</Link>{"  "}</li>
       
        
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         Profile of {activeProfile}
          </a>
          <ul class="dropdown-menu">

          {childList.map((child, index) => (
                <li key={index}>
                  <Link 
                    to={`/${child.childName}`} 
                    onClick={() => setActiveProfile(child.childName)}
                    className={activeProfile === child.childName ? 'nav-link active' : 'nav-link'}
                  >
                    Profile of {child.childName}
                    </Link>
                    </li>
              ))}
            </ul>
          </li>
        </ul>
         <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-end', alignItems: 'center' }}>
         <Icon path={mdiAccountOutline} size={1} />
         <p style = {{margin: "0", paddingTop: "0,01px", color: "grey", textAlign: "center"}}>Jan</p>
         
         </div>
    </div>
  </div>
</nav>

  );
}
function componentStyle() {
  return { backgroundColor: "rgb(#FFDAB9)", height:"100px", border:"1px solid #38246b" };
  
}
export default NavigationBar;