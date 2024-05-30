import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const addEvent = (date, title, description) => {
    const dateStr = date.toISOString().split('T')[0];
    const newEvent = { id: uuidv4(), title, description };
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateStr]: prevEvents[dateStr] ? [...prevEvents[dateStr], newEvent] : [newEvent],
    }));
  };

  const editEvent = (date, id, updatedEvent) => {
    const dateStr = date.toISOString().split('T')[0];
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateStr]: prevEvents[dateStr].map(event => (event.id === id ? updatedEvent : event)),
    }));
  };

  const deleteEvent = (date, id) => {
    const dateStr = date.toISOString().split('T')[0];
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateStr]: prevEvents[dateStr].filter(event => event.id !== id),
    }));
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
