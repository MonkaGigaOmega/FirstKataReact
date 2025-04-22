/* eslint-disable indent */
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import Footer from './components/Footer'
import AppHeader from './components/AppHeader'
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
  const [term, setTerm] = useState('All')
  function filterFunc(items, filter) {
    switch (filter) {
      case 'All':
        return items
      case 'Active':
        return items.filter((item) => !item.isCompleted)
      case 'Completed':
        return items.filter((item) => item.isCompleted)
      default:
        return items
    }
  }
  const visibleTasks = filterFunc(tasks, term)
  return (
    <section className="main">
      <AppHeader tasks={visibleTasks} setTasks={setTasks} />
      <TaskList tasks={visibleTasks} setTasks={setTasks} origTasks={tasks} />
      <Footer tasks={visibleTasks} setTasks={setTasks} term={term} setTerm={setTerm} />
    </section>
  )
}

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)
