import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleComplete, editTask } from '../features/taskSlice';
import { PencilIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  };

  const handleSaveEdit = (id) => {
    if (editedText.trim()) {
      dispatch(editTask({ id, text: editedText }));
      setEditingTaskId(null);
      setEditedText('');
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-out hover:shadow-xl ${task.completed ? 'bg-green-200' : 'bg-white'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex items-center justify-between">
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                className="flex-grow p-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            ) : (
              <span
                onClick={() => dispatch(toggleComplete(task.id))}
                className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.text}
              </span>
            )}
            <div className="flex space-x-2">
              {editingTaskId === task.id ? (
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="text-green-500 hover:text-green-400 transition duration-200"
                >
                  <CheckCircleIcon className="w-6 h-6" />
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(task)}
                  className="text-yellow-500 hover:text-yellow-400 transition duration-200"
                >
                  <PencilIcon className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-red-500 hover:text-red-400 transition duration-200"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;
