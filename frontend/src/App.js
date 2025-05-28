import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from './services/taskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      const res = await addTask({ title });
      setTasks([res.data, ...tasks]);
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const res = await updateTask(id, updates);
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">To-Do List</h1>
        <TaskForm onSubmit={handleAddTask} />
        <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
}

export default App;
