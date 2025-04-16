import { useState } from 'react';
const NewTaskForm = ({ tasks, setTasks }) => {
  const [description, setDescription] = useState('');

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const addTask = () => {
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, // Генерация нового ID
      description: description,
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]); // Обновление списка задач
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      // Проверка, что поля не пустые
      addTask();
      setDescription(''); // Очистка поля ввода для описания
    }
    console.log('ssssssss');
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        autoFocus
        value={description}
        onChange={onDescriptionChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTaskForm;
