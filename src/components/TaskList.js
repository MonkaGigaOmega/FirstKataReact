import Task from './Task'

function TaskList({ tasks, setTasks }) {
  const handleDestroy = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleCompleted = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)))
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.id} onDestroy={handleDestroy} onCompleted={handleCompleted} task={task} />
      ))}
    </ul>
  )
}

export default TaskList
