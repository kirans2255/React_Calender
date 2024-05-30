import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from './EventContext';

const EventModal = ({ date, onClose }) => {
  const { addEvent, editEvent, deleteEvent, selectedEvent } = useContext(EventContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [selectedEvent]);

  const handleSave = () => {
    if (selectedEvent) {
      editEvent(date, selectedEvent.id, { ...selectedEvent, title, description });
    } else {
      addEvent(date, title, description);
    }
    onClose();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      deleteEvent(date, selectedEvent.id);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          {selectedEvent && <button onClick={handleDelete}>Delete</button>}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
