import { formatDistanceToNow, differenceInSeconds } from 'date-fns'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Task({ onCompleted, onDestroy, task }) {
  const { description, isCompleted, isEditing, createdAt } = task
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const updateFormattedDate = () => {
      const now = new Date()
      const created = new Date(createdAt)
      const secondsDiff = differenceInSeconds(now, created)

      if (secondsDiff < 60) {
        setFormattedDate(`${secondsDiff} seconds ago`)
      } else {
        setFormattedDate(formatDistanceToNow(created, { addSuffix: true }))
      }
    }

    updateFormattedDate()

    const timer = setInterval(updateFormattedDate, 1000)

    return () => clearInterval(timer)
  }, [createdAt])

  return (
    <li className={`${isCompleted ? 'completed' : ''}`}>
      <div className="view">
        <input
          id={`task-${task.id}`}
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          readOnly
          onChange={() => onCompleted(task.id)}
        />
        <label htmlFor={`task-${task.id}`}>
          <span className="description">{description}</span>
          <span className="created">{formattedDate}</span>
        </label>
        <button aria-label="delete task" type="button" className="icon icon-edit" />
        <button aria-label="edit task" type="button" className="icon icon-destroy" onClick={() => onDestroy(task.id)} />
      </div>
      {isEditing && <input type="text" className="edit" value={description} readOnly />}
    </li>
  )
}

Task.defaultProps = {
  onCompleted: () => {},
  onDestroy: () => {},
}

Task.propTypes = {
  onCompleted: PropTypes.func,
  onDestroy: PropTypes.func,
  task: PropTypes.shape({
    description: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
}
export default Task
