const NewTaskForm = () => {

  return (
    <form>
      <input 
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTaskForm;
