import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TaskList from '../app/components/TaskList';
import TaskStore, { Task } from '../app/stores/TaskStore';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from '../app/components/TaskForm';

function generateId(): string {
  const id = uuidv4();
  return id;
}


const IndexPage: React.FC = () => {
  const [taskStore] = useState(() => TaskStore.create());
  const [task, setTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
    status: '',
  });

  interface TaskData {
    id: string;
    title: string;
    description: string;
    status: string;
  }
  

  const handleAddTask = () => {
    const newTask: TaskData = {
      id: generateId(),
      title: task.title,
      description: task.description,
      status: 'To Do',
    };
    taskStore.addTask(newTask);
    setTask({ id: '', title: '', description: '', status: '' });
  };
  

  useEffect(() => {
    taskStore.loadFromLocalStorage();
  }, [taskStore]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Description"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <TaskList tasks={taskStore.tasks} onUpdateTask={taskStore.updateTask} onRemoveTask={taskStore.removeTask} />
    </div>
  );
};

export default observer(IndexPage);
