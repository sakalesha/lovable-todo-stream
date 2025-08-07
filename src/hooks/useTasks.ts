import { useState } from "react";
import { Task, CreateTaskData, UpdateTaskData } from "@/types/task";

// Mock data for demonstration
const generateMockTasks = (): Task[] => [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create a modern, responsive landing page with smooth animations",
    completed: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Check and approve pending code reviews",
    completed: true,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Revise API documentation and add examples",
    completed: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "4",
    title: "Team standup meeting",
    completed: true,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(generateMockTasks());

  const createTask = (data: CreateTaskData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, data: UpdateTaskData) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...data, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskComplete = (id: string, completed: boolean) => {
    updateTask(id, { completed });
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  };
};