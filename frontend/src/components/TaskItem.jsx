import React, { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const handleEdit = (newTitle) => {
    onUpdate(task._id, { title: newTitle });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5 accent-blue-600"
        />
        {isEditing ? (
          <TaskForm existingTitle={task.title} onSubmit={handleEdit} />
        ) : (
          <span
            className={`text-lg ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
