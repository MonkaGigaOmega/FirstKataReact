import NewTaskForm from './NewTaskForm.js';

const AppHeader = ({ tasks, setTasks }) => {
  return (
    <>
      <h1>todos</h1>
      <NewTaskForm tasks={tasks} setTasks={setTasks} />
    </>
  );
};
export default AppHeader;
