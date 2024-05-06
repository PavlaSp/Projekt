import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Button, Modal } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiCalendarMonth } from '@mdi/js';
import "react-datepicker/dist/react-datepicker.css";



const Calendar = ({updateSelectedDate}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
  const [savedDates, setSavedDates] = useState([]);
 
 const handleSave = () => {
  setSavedDates(savedDates => [...savedDates, startDate]);

  // Převod datumu na formát 'YYYY-MM'
  const month = startDate.getMonth() + 1; 
  const year = startDate.getFullYear();
  const formattedDate = `${year}-${month < 10 ? `0${month}` : month}`; 

  updateSelectedDate(formattedDate);
  setModalShow(false);
};

  return (
    <div style={{ textAlign: 'right', padding: '0 20px' }}>
      <Button onClick={() => setModalShow(true)}><Icon path={mdiCalendarMonth} size={1}/></Button>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header >
          <Modal.Title>Pick a date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
                         
              setStartDate(date);
           }}
            inline
            showMonthYearPicker
          />  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
          
        </Modal.Footer>
      </Modal>

    
    </div>
  );
};

export default Calendar;