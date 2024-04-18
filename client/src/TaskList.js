import React, { useState } from 'react';
import DashboardCard from './DashboardCard';

function TaskList() {
  const [tasks, setTasks] = useState([
    {  subject: 'Angličtina', grade: 1, deadline: '2.4.', completed: false, amount: "100 Kč",},
    { subject: 'Čeština', grade: 2, deadline: '2.5.', completed: false, amount: "50 Kč ",},
    { subject: 'Dějepis', grade: 1, deadline: '2.5.', amount: "50 Kč",},
    { subject: 'Matematika', grade: 2, deadline: '2.6.', amount: "150 Kč" ,},
    { subject: 'Fyzika', grade: 2, deadline: '2.4.', amount:"50 Kč", },
  ]);

  const handleTaskClick = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div>
      <DashboardCard tasks={tasks} />
      <div>Task fulfillment:</div>
      {tasks.map((task, index) => (
        <div>
          Rewarded task: {task.subject} - Grade: {task.grade} - Deadline: {task.deadline} - Amount: {task.amount}
          <input type="checkbox" onClick={() => handleTaskClick(index)} />
        </div>
      ))}
    </div>
  );
}

export default TaskList;