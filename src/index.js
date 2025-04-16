import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import AppHeader from './components/AppHeader'
import Footer from './components/Footer'
import TaskList from './components/TaskList'
import './styles.css'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Completed task',
      isCompleted: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      description: 'Active task',
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: 3,
      description: 'Active task',
      isCompleted: false,
      createdAt: new Date(),
    },
  ])

  const [filteredTasks, setFilteredTasks] = useState(tasks)

  return (
    <section className="main">
      <AppHeader tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <Footer tasks={tasks} setTasks={setTasks} filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} />
    </section>
  )
}

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)
