export default function FooterFilter({ tasks,setTasks, setFilteredTasks,filteredTasks }) {
    const handleShowCompleted = () => {
        setTasks(filteredTasks.filter(task => task.isCompleted));
    };

    const handleShowActive = () => {
        setTasks(filteredTasks.filter(task => !task.isCompleted && !task.isEditing));
    };

    const handleShowAll = () => {
        setTasks(filteredTasks);
    };
  
    return (
      <ul className="filters">
        <li>
          <button onClick={handleShowAll} className="selected">
            All
          </button>
        </li>
        <li>
          <button onClick={handleShowActive}>Active</button>
        </li>
        <li>
          <button onClick={handleShowCompleted}>Completed</button>
        </li>
      </ul>
    );
  }