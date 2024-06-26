import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList'
import TaskInput from './components/InputTask'

function App() {

  return (
    <>
     <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Stylish To-Do App</h1>
        <TaskInput />
        <TaskList />
      </div>
    </div>
    </>
  )
}

export default App
