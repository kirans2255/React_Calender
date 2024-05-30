// src/App.js
import React from 'react';
import { EventProvider } from './EventContext';
import CalendarComponent from './Calendar';
import './App.css';

const App = () => {
  return (
    <EventProvider>
      <div className="App">
        <h1>Event Calendar</h1>
        <CalendarComponent />
      </div>
    </EventProvider>
  );
};

export default App;
