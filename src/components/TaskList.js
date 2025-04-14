import Task from './Task';



const TaskList = ({ tasks, setTasks }) => {

  const handleDestroy = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <Task key={task.id} onDestroy={handleDestroy} task={task}/>
      ))}
    </ul>
  );
};

export default TaskList;