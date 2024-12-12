import React, { useState } from 'react';
import { Task } from './Dashboard';

interface NewTaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({ title: title.trim(), description, priority, dueDate });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-medium ml-1">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          className="px-3 py-2 border bg-transparent border-gray-300 text-white rounded-2xl focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-medium ml-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={3}
          className="px-3 py-2 border bg-transparent border-gray-300 text-white rounded-2xl focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="priority" className="font-medium ml-1">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
          className="px-3 py-2 border bg-transparent border-gray-300 text-white rounded-2xl focus:outline-none focus:ring focus:ring-purple-500"
        >
          <option value="low" className='text-black'>Low</option>
          <option value="medium"className='text-black'>Medium</option>
          <option value="high"className='text-black'>High</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 ml-1">
        <label htmlFor="dueDate" className="font-medium">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : null)}
          className="px-3 py-2 border border-gray-300 bg-transparent text-white rounded-2xl focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 hover:bg-purple-700 transition rounded-2xl mt-5"
      >
        Add Task
      </button>
    </form>
  );
};
