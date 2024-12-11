import React, { useState } from 'react';
import { Task } from './Dashboard';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask: Omit<Task, 'id' | 'completed'>) => {
    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        ...updatedTask,
      });
      setEditingTask(null);
    }
  };

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add a task to get started!</p>;
  }

  const priorityColor = {
    low: 'text-blue-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <table className="min-w-full bg-white border border-gray-300 bg-opacity-5 backdrop-blur-md relative">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Status</th>
          <th className="px-4 py-2 border-b">Title</th>
          <th className="px-4 py-2 border-b">Priority</th>
          <th className="px-4 py-2 border-b">Due Date</th>
          <th className="px-4 py-2 border-b text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border-t">
            <td className="px-4 py-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onUpdateTask({ ...task, completed: e.target.checked })}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </td>
            <td className={`px-4 py-2 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </td>
            <td className="px-4 py-2">
              <span className={priorityColor[task.priority]}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </td>
            <td className="px-4 py-2">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
            </td>
            <td className="px-4 py-2 text-right space-x-2">
              <button
                onClick={() => handleEditTask(task)}
                className="px-2 py-1 text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="px-2 py-1 text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
