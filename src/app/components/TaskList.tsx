import React from 'react';
import { Task } from '../stores/TaskStore';
import TaskItem from './TaskItem';
import { observer } from 'mobx-react-lite';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updatedTask: Task) => void;
  onRemoveTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = observer(({ tasks, onUpdateTask, onRemoveTask }) => {
  return (
    <div className="mt-8">
      <table className="w-full border border-collapse">
      <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 font-bold border-b">Title</th>
            <th className="py-2 px-4 font-bold border-b">Description</th>
            <th className="py-2 px-4 font-bold border-b">Status</th>
            <th className="py-2 px-4 font-bold border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onRemoveTask={onRemoveTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default TaskList;
