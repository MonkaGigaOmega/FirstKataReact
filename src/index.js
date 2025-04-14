import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
import './styles.css'


function App(){
  const[tasks, setTasks]= useState(
    [
      {
        id: 1,
        title: 'Completed task',
        description: 'Completed task',
        isCompleted: true,
        isEditing: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'Editing task',
        description: 'Editing task',
        isCompleted: false,
        isEditing: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: 'Active task',
        description: 'Active task',
        isCompleted: false,
        isEditing: false,
        createdAt: new Date(),
      },
    ]
  )

  return (
    <section className='main'>
      <AppHeader/>
      <TaskList tasks={tasks} setTasks={setTasks}/>
      <Footer/>
    </section>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
