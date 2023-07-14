import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TaskStore from '../stores/TaskStore';
import { Instance } from 'mobx-state-tree';

interface TaskFormProps {
  taskStore: Instance<typeof TaskStore>;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskStore }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    }
    const newTask = {
      id: Math.random().toString(),
      title,
      description,
      status: 'To Do',
    };
    console.log(newTask, "newta")
    taskStore.addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default observer(TaskForm);
