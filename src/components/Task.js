/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { formatDistanceToNow, differenceInSeconds } from 'date-fns'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function Task({ onCompleted, onDestroy, task, onEditing }) {
  const { description, isCompleted, isEditing, createdAt, time: initialTime } = task
  const [formattedDate, setFormattedDate] = useState('')
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)
  const lastUpdateRef = useRef(Date.now())
  const [localDescription, setLocalDescription] = useState(description)
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
    const intervalId = setInterval(updateFormattedDate, 1000)

    return () => clearInterval(intervalId)
  }, [createdAt])

  useEffect(() => {
    if (isRunning && !isCompleted && time > 0) {
      lastUpdateRef.current = Date.now()

      timerRef.current = setInterval(() => {
        const now = Date.now()
        const delta = now - lastUpdateRef.current
        lastUpdateRef.current = now

        setTime((prevTime) => {
          const newTime = prevTime - delta
          if (newTime <= 0) {
            setIsRunning(false)
            return 0
          }
          return newTime
        })
      }, 100)

      return () => clearInterval(timerRef.current)
    }
  }, [isRunning, isCompleted])

  const pauseTimer = () => setIsRunning(false)

  const playTimer = () => {
    lastUpdateRef.current = Date.now()
    setIsRunning(true)
  }

  const getFormatedTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const onEdit = (e) => {
    e.preventDefault()
    onEditing(task.id, localDescription)
  }

  const onDescriptionChange = (e) => {
    setLocalDescription(e.target.value)
  }

  return (
    <li className={`${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input
          id={`task-${task.id}`}
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          readOnly
          onChange={() => onCompleted(task.id)}
        />
        <label className="task-label" htmlFor={`task-${task.id}`}>
          <span className="description">{description}</span>
          <div>
            <button type="button" aria-label="Play timer" className="icon icon-play" onClick={playTimer} />
            <button type="button" aria-label="Pause timer" className="icon icon-pause" onClick={pauseTimer} />
            <span type="button" className={`${isCompleted ? 'completed timer' : 'timer'}`}>
              {getFormatedTime(time)}
            </span>
          </div>
          <span className="created">{formattedDate}</span>
        </label>
        <button aria-label="delete task" type="button" className="icon icon-edit" onClick={() => onEditing(task.id)} />
        <button aria-label="edit task" type="button" className="icon icon-destroy" onClick={() => onDestroy(task.id)} />
      </div>
      {isEditing && (
        <form onSubmit={onEdit}>
          <input className="edit" type="text" value={localDescription} onChange={onDescriptionChange} />
        </form>
      )}
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
