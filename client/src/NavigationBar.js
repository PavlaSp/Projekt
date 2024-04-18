import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
import { mdiSack } from '@mdi/js';


function NavigationBar() {
  const [activeProfile, setActiveProfile] = useState('Petr');
  const location = useLocation ();
 
 return (
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <div>
  <Icon path={mdiSack} size={1} />
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
        <Link to="/settings"className={location.pathname === "/settings" ? "nav-link active" : "nav-link"}>Set New</Link>{"  "}</li>
        <li class="nav-item">
        <Link to="/settings"className={location.pathname === "/settings" ? "nav-link active" : "nav-link"}>Show Previous</Link>{"  "}</li>
        
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         Profile of {activeProfile}
          </a>
          <ul class="dropdown-menu">
           <Link to="/petr" onClick={() => setActiveProfile('Petr')} className={activeProfile === 'Petr' ? 'nav-link active' : 'nav-link'}>Profile of Petr</Link>
      <li class="nav-item"></li>
      <Link to="/jana" onClick={() => setActiveProfile('Jana')} className={activeProfile === 'Jana' ? 'nav-link active' : 'nav-link'}>Profile of Jana</Link>
                  </ul>
        </li>
         </ul>
         <div>
         <Icon path={mdiAccountOutline} size={2} />
         <p style = {{margin: "0", paddingTop: "0,01px", color: "blue", textAlign: "center"}}>Jan</p>
         </div>
    </div>
  </div>
</nav>

  );
}

export default NavigationBar;