/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import Task from './Task'

function TaskList({ tasks, setTasks, origTasks }) {
  const handleDestroy = (id) => {
    setTasks(origTasks.filter((task) => task.id !== id))
  }
  const handleCompleted = (id) => {
    setTasks(origTasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)))
  }
  const handleEditing = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isEditing: !task.isEditing, description: newDescription || task.description }
        }
        return task
      })
    )
  }
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          onDestroy={handleDestroy}
          onCompleted={handleCompleted}
          onEditing={handleEditing}
          task={task}
        />
      ))}
    </ul>
  )
}

export default TaskList
