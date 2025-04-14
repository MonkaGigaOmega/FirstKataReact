// components/Task.js
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const Task = ({ onDestroy,task }) => {

const { title, description, isCompleted, isEditing, createdAt} = task;

const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

const [completed, setCompleted] = useState(isCompleted);

const toggleCompleted = () => {
  setCompleted(!completed);
};

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view" >
      <input
          className="toggle"
          type="checkbox"
          checked={completed}
          readOnly
          onChange={toggleCompleted}
        />
        <label onClick={toggleCompleted}>
          <span className="description">{description}</span>
          <span className="created">{formattedDate}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={()=>onDestroy(task.id)}></button>
      </div>
      {isEditing && <input type="text" className="edit" value={title} readOnly />}
    </li>
  );
};

export default Task;

