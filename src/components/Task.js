import { formatDistanceToNow, differenceInSeconds } from 'date-fns'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function Task({ onCompleted, onDestroy, task }) {
  const { description, isCompleted, createdAt, time: initialTime } = task
  const [formattedDate, setFormattedDate] = useState('')
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(true)
  const timerRef = useRef(null)

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

  useEffect(() => {
    if (isRunning && !isCompleted) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1000
          }
          clearInterval(timerRef.current)
          return 0
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [isRunning, isCompleted])

  function toggleTimer() {
    setIsRunning((prev) => !prev)
  }

  function getFormatedTime(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const totalMin = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const min = Math.floor(totalMin % 60)

    return `${min.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
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
          <button type="button" className={`${isCompleted ? 'completed timer' : 'timer'}`} onClick={toggleTimer}>
            {getFormatedTime(time)}
          </button>
          <span className="created">{formattedDate}</span>
        </label>
        <button aria-label="delete task" type="button" className="icon icon-edit" />
        <button aria-label="edit task" type="button" className="icon icon-destroy" onClick={() => onDestroy(task.id)} />
      </div>
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
    time: PropTypes.number.isRequired,
  }).isRequired,
}
export default Task
