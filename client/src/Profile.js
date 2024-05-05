import { useState, useEffect, createContext } from 'react';
import ShowMonth from "./ShowMonth";



export const ProfileContext = createContext();
const Profile = ({ children }) => {
  const [childListDto, setChildListDto] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const [monthlyListDto, setMonthlyListDto] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const [taskListDto, setTaskListDto] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const [activeProfile, setActiveProfile] = useState('');

  
  const childId = activeProfile ? activeProfile.id : null;

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchChildList();
    if(activeProfile){
      fetchMonthlyList(childId);
      fetchTaskList(childId);
    }
  }, [activeProfile]);

  const fetchChildList = async () => {
    setChildListDto((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/child/list`, { method: "GET" });
    const data = await response.json();
  
    if (response.ok) {
      setChildListDto({ state: "ready", data: data });
    } else {
      setChildListDto({ state: "error", data: null, error: data.error });
    }
    console.log('Child List Data:', data);
  };

  const fetchMonthlyList = async () => {
    setMonthlyListDto((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/monthly/list`, { method: "GET" });
    const data = await response.json();
  
    if (response.ok) {
      setMonthlyListDto({ state: "ready", data: data });
    } else {
      setMonthlyListDto({ state: "error", data: null, error: data.error });
    }
    console.log('Monthly List Data:', data);
  };
  const fetchTaskList = async () => {
    setTaskListDto((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/task/list`, { method: "GET" });
    const data = await response.json();
  
    if (response.ok) {
      setTaskListDto({ state: "ready", data: data });
    } else {
      setTaskListDto({ state: "error", data: null, error: data.error });
    }
    console.log('Task List Data:', data);
  };

  const value = {
    childList: childListDto.data || [],
    monthlyList: monthlyListDto.data || [],
    taskList: taskListDto.data || [],
    activeProfile,
    setActiveProfile,
    selectedDate, setSelectedDate,
  };



  return (
    <ProfileContext.Provider value={value}>
      {children}
      <ShowMonth childList={value.childList} monthlyList={value.monthlyList} taskList={value.taskList} activeProfile={value.activeProfile} />
     
    </ProfileContext.Provider>
  );
}

export default Profile;