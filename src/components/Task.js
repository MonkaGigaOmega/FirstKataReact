// components/Task.js
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const Task = ({ title, description, isCompleted, isEditing, createdAt,isGood }) => {
  const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

const [completed, setCompleted] = useState(isCompleted);

const toggleCompleted = () => {
  setCompleted(!completed);
};

const [good,setGood] = useState(isGood);
const toggleGood=()=>{
  setGood(!good)
}
  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`} style={!good?{display:`block`}:{display:'none'}}>
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
        <button className="icon icon-destroy" onClick={toggleGood}></button>
      </div>
      {isEditing && <input type="text" className="edit" value={title} readOnly />}
    </li>
  );
};

export default Task;

