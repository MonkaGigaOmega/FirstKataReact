import { useState } from 'react'

function NewTaskForm({ tasks, setTasks }) {
  const [description, setDescription] = useState('')
  const [minTime, setMinTime] = useState(0)
  const [secTime, setSecTime] = useState(0)

  const onDescriptionChange = (e) => {
    if (e.target.value.length < 20) {
      setDescription(e.target.value)
    }
  }

  const onMinChange = (e) => {
    if (e.target.value < 60) {
      setMinTime(e.target.value)
    }
  }

  const onSecChange = (e) => {
    if (e.target.value < 60) {
      setSecTime(e.target.value)
    }
  }

  const addTask = () => {
    const minutes = minTime === '' ? 0 : parseInt(minTime, 10)
    const seconds = secTime === '' ? 0 : parseInt(secTime, 10)
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      description,
      isCompleted: false,
      createdAt: new Date(),
      time: (minutes * 60 + seconds) * 1000,
    }
    setTasks([...tasks, newTask])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (description.trim()) {
      addTask()
      setDescription('')
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        value={description}
        onChange={onDescriptionChange}
      />
      <input type="number" className="new-todo-form__timer" placeholder="Min" value={minTime} onChange={onMinChange} />
      <input type="number" className="new-todo-form__timer" placeholder="Sec" value={secTime} onChange={onSecChange} />
      <button className="form-button" type="submit">
        Add Task
      </button>
    </form>
  )
}

export default NewTaskForm
