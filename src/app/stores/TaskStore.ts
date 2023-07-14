import { types, flow, Instance } from 'mobx-state-tree';

const StatusValues = ['To Do', 'In Progress', 'Completed'];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export type TaskStoreType = typeof TaskStore;

const Task = types
  .model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.enumeration(StatusValues),
  })
  .actions((self) => ({
    setTitle(newTitle: string) {
      self.title = newTitle;
    },
    setDescription(newDescription: string) {
      self.description = newDescription;
    },
    setStatus(newStatus: string) {
      self.status = newStatus;
    },
  }));

interface TaskData {
  id: string;
  title: string;
  description: string;
  status: typeof StatusValues[number];
}

const TaskStore = types
  .model('TaskStore', {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    addTask(task: TaskData): void {
      self.tasks.push(task);
    },
    removeTask(taskId: string): void {
      const taskIndex = self.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        self.tasks.splice(taskIndex, 1);
      }
    },
    updateTask(taskId: string, updatedTask: Task): void {
      const task = self.tasks.find((t) => t.id === taskId);
      if (task) {
        task.setTitle(updatedTask.title);
        task.setDescription(updatedTask.description);
        task.setStatus(updatedTask.status);
      }
    },
    saveToLocalStorage: flow(function* saveToLocalStorage() {
      try {
        yield Promise.resolve(localStorage.setItem('tasks', JSON.stringify(self.tasks)));
      } catch (error) {
        console.error('Failed to save tasks to local storage', error);
      }
    }),
    loadFromLocalStorage: flow(function* loadFromLocalStorage() {
      try {
        const storedTasks = yield Promise.resolve(localStorage.getItem('tasks'));
        if (storedTasks) {
          self.tasks = JSON.parse(storedTasks);
        }
      } catch (error) {
        console.error('Failed to load tasks from local storage', error);
      }
    }),
  }));

export default TaskStore;
