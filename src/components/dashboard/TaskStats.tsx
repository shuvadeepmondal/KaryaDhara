import React from 'react';
import { Task } from './Dashboard';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => task.incompleted).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-opacity-5 backdrop-blur-md relative">
      <div className="bg-white border border-gray-300 p-4 rounded shadow">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-lg font-medium text-black">Total Tasks</h3>
          <span className="text-gray-300">&#9675;</span>
        </div>
        <div className="text-3xl text-black font-bold">{totalTasks}</div>
      </div>

      <div className="bg-white border border-gray-300 p-4 rounded shadow">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-lg font-medium text-black">Completed Tasks</h3>
          <span className="text-gray-300">&#x2714;</span>
        </div>
        <div className="text-3xl font-bold text-black">{completedTasks}</div>
        <p className="text-xs text-gray-500">
          {totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}%` : '0%'} completion rate
        </p>
      </div>

      <div className="bg-white border border-gray-300 p-4 rounded shadow">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-lg font-medium text-black">Total Tasks</h3>
          <span className="text-gray-300">&#9675;</span>
        </div>
        <div className="text-3xl text-black font-bold">{pendingTasks}</div>
      </div>

      <div className="bg-white border border-gray-300 p-4 rounded shadow">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-lg font-medium text-black">High Priority Tasks</h3>
          <span className="text-gray-300">&#x2691;</span>
        </div>
        <div className="text-3xl text-black font-bold">{highPriorityTasks}</div>
        <p className="text-xs text-gray-500">
          {totalTasks > 0 ? `${Math.round((highPriorityTasks / totalTasks) * 100)}%` : '0%'} of total tasks
        </p>
      </div>
    </div>
  );
};
