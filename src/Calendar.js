import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { EventContext } from './EventContext';
import EventModal from './EventModal';
import './Calendar.css';  // Add this line to import styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const { events, setSelectedEvent } = useContext(EventContext);

  const handleDateClick = (date) => {
    setDate(date);
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const formattedDate = date.toISOString().split('T')[0];
  const dateEvents = events[formattedDate] || [];

  return (
    <div className="calendar-container">
      <Calendar onClickDay={handleDateClick} value={date} />
      <div className="event-list">
        {dateEvents.map(event => (
          <div key={event.id} className="event-box" onClick={() => handleEventClick(event)}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <EventModal
          date={date}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
