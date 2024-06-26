import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/taskSlice';
import { PlusCircleIcon } from '@heroicons/react/solid';

const TaskInput = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (input.trim()) {
      dispatch(addTask(input));
      setInput('');
    }
  };

  return (
    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        className="w-full p-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
        placeholder="Add a new task..."
      />
      <button
        onClick={handleAddTask}
        className="text-white hover:text-purple-200 transition duration-200"
      >
        <PlusCircleIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default TaskInput;
