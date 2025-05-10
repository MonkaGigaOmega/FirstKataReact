import { useState } from 'react'

export default function FooterFilter({ setTerm }) {
  const [selectedButton, setSelectedButton] = useState('All')
  const handleShowCompleted = () => {
    setTerm('Completed')
    setSelectedButton('Completed')
  }

  const handleShowActive = () => {
    setTerm('Active')
    setSelectedButton('Active')
  }

  const handleShowAll = () => {
    setTerm('All')
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
