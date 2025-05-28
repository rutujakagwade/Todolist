import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0)
    return <p className="text-center text-gray-500">No tasks found.</p>;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
