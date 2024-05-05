import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import NavigationBar from './NavigationBar';
import "./App.css";
import Profile from './Profile';
import ShowSetting from "./ShowSetting"; 


function App() {
  
  return (
    <div style={componentStyle()}>
      <Router>
        <Profile>
          <nav>
          <div className="navigationBar">
              <NavigationBar />
            </div>
          </nav>
  
          <Routes>
           
            <Route path="/settings" element={<ShowSetting />} />
            <Route path="/:childId" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} /> 
      </Routes>
      </Profile>
    </Router>
    
    </div>
  );
}
function componentStyle() {
  return {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
       overflowY: "auto",
    backgroundColor: "rgb(234 238 242)"
  };
}

export default App;