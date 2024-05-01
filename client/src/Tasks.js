import { useState, useEffect } from 'react';
import { createContext } from 'react';
import ShowMonth from "./ShowMonth";

export const TasksContext = createContext();

function Tasks() {
  const [taskListDto, setTaskListDto] = useState({ state: "ready", data: null });

  useEffect(() => {
    setTaskListDto(current => ({ ...current, state: "loading" }));

    fetch(`http://localhost:8000/task/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();

      if (response.status >= 400) {
        setTaskListDto({ state: "error", error: responseJson.error });
      } else {
        setTaskListDto({ state: "ready", data: responseJson });
      }
    });
  }, []);

  const value = { taskList: taskListDto.data || [] };

  return (
    <TasksContext.Provider value={value}>
   
        
        
      
    </TasksContext.Provider>
  );
}

export default Tasks;