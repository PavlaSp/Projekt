import { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
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
  const [activeProfile, setActiveProfile] = useState('');

  
  const childId = useParams();

  useEffect(() => {
    fetchChildList();
    if(childId){
      fetchMonthlyList(childId);
    }
  }, []);

  const fetchChildList = async () => {
    setChildListDto((current) => ({ ...current, state: "pending" }));
    const response = await fetch("http://localhost:8000/child/list", { method: "GET" });
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
    const response = await fetch("http://localhost:8000/monthly/list", { method: "GET" });
    const data = await response.json();
  
    if (response.ok) {
      setMonthlyListDto({ state: "ready", data: data });
    } else {
      setMonthlyListDto({ state: "error", data: null, error: data.error });
    }
    console.log('Monthly List Data:', data);
  };


  const value = {
    childList: childListDto.data || [],
    monthlyList: monthlyListDto.data || [],
    activeProfile,
    setActiveProfile,
  };

  console.log("value childListDto.data: " + childListDto);
  console.log("value monthlyListDto.data: " + monthlyListDto);
  console.log("value activeProfile: " + activeProfile);
  console.log("value setActiveProfile: " + setActiveProfile);

  return (
    <ProfileContext.Provider value={value}>
      {children}
      <ShowMonth childList={value.childList} monthlyList={value.monthlyList} activeProfile={value.activeProfile} />
    </ProfileContext.Provider>
  );
}

export default Profile;