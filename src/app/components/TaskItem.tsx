import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Task } from '../stores/TaskStore';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (taskId: string, updatedTask: Task) => void;
  onRemoveTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onRemoveTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedStatus(task.status);
  };

  const handleSaveClick = () => {
    if (editedTitle.trim() === '') {
      return;
    }
    const updatedTask: Task = {
      ...task,
      title: editedTitle,
      description: editedDescription,
      status: editedStatus,
    };
    onUpdateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onRemoveTask(task.id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(e.target.value);
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{isEditing ? <input type="text" value={editedTitle} onChange={handleTitleChange} /> : task.title}</td>
      <td className="px-4 py-2">{isEditing ? <textarea value={editedDescription} onChange={handleDescriptionChange} /> : task.description}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <select value={editedStatus} onChange={handleStatusChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        ) : (
          task.status
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <>
            <button
              className="px-3 py-1 text-sm bg-green-500 text-white rounded-md mr-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md mr-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default observer(TaskItem);
