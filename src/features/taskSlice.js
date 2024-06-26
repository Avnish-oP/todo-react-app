import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      const newTask = { id: Date.now(), text: action.payload, completed: false };
      const newState = [...state, newTask];
      saveTasksToLocalStorage(newState);
      return newState;
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(newState);
      return newState;
    },
    toggleComplete: (state, action) => {
      const newState = state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      saveTasksToLocalStorage(newState);
      return newState;
    },
    editTask: (state, action) => {
      const newState = state.map(task =>
        task.id === action.payload.id ? { ...task, text: action.payload.text } : task
      );
      saveTasksToLocalStorage(newState);
      return newState;
    }
  }
});

export const { addTask, deleteTask, toggleComplete, editTask } = taskSlice.actions;
export default taskSlice.reducer;
