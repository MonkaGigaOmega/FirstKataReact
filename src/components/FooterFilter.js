import { useState } from 'react'

export default function FooterFilter({ setTasks, filteredTasks }) {
  const [selectedButton, setSelectedButton] = useState('All')

  const handleShowCompleted = () => {
    setTasks(filteredTasks.filter((task) => task.isCompleted))
    setSelectedButton('Completed')
  }

  const handleShowActive = () => {
    setTasks(filteredTasks.filter((task) => !task.isCompleted && !task.isEditing))
    setSelectedButton('Active')
  }

  const handleShowAll = () => {
    setTasks(filteredTasks)
    setSelectedButton('All')
  }

  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={handleShowAll} className={selectedButton === 'All' ? 'selected' : ''}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={handleShowActive} className={selectedButton === 'Active' ? 'selected' : ''}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={handleShowCompleted}
          className={selectedButton === 'Completed' ? 'selected' : ''}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
