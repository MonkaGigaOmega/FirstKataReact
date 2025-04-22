import { useState } from 'react'

function NewTaskForm({ tasks, setTasks }) {
  const [description, setDescription] = useState('')

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const addTask = () => {
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      description,
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
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
      <button type="submit">Add Task</button>
    </form>
  )
}

export default NewTaskForm
