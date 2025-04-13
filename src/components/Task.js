// components/Task.js
import { formatDistanceToNow } from 'date-fns';

const Task = ({ title, description, isCompleted, isEditing, createdAt }) => {
  const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <li className={`${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={isCompleted} readOnly />
        <label>
          <span className="description">{description}</span>
          <span className="created">{formattedDate}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {isEditing && <input type="text" className="edit" value={title} readOnly />}
    </li>
  );
};

export default Task;

