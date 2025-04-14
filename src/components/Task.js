// components/Task.js
import { formatDistanceToNow } from 'date-fns';

const Task = ({ onCompleted, onDestroy,task }) => {

const { description, isCompleted, isEditing, createdAt} = task;

const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });



  return (
    <li className={`${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view" >
      <input
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          readOnly
          onChange={()=>onCompleted(task.id)}
        />
        <label onClick={()=>onCompleted(task.id)}>
          <span className="description">{description}</span>
          <span className="created">{formattedDate}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={()=>onDestroy(task.id)}></button>
      </div>
      {isEditing && <input type="text" className="edit" value={description} readOnly />}
    </li>
  );
};

export default Task;

