import React, { useState } from 'react';

const TaskForm = ({ onSubmit, existingTitle = '' }) => {
  const [title, setTitle] = useState(existingTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>
  );
};

export default TaskForm;
