import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, CheckSquare } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { TaskModal } from "@/components/TaskModal";
import { TaskFilters } from "@/components/TaskFilters";
import { useTasks } from "@/hooks/useTasks";
import { Task, TaskFilter, CreateTaskData } from "@/types/task";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { tasks, createTask, updateTask, deleteTask, toggleTaskComplete } = useTasks();
  const { toast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');

  // Filter tasks based on active filter
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return true;
  });

  // Calculate task counts
  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  const handleCreateTask = (data: CreateTaskData) => {
    createTask(data);
    toast({
      title: "Task created",
      description: "Your new task has been added successfully.",
    });
  };

  const handleUpdateTask = (data: CreateTaskData) => {
    if (!editingTask) return;
    
    updateTask(editingTask.id, data);
    setEditingTask(null);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    toggleTaskComplete(id, completed);
    toast({
      title: completed ? "Task completed" : "Task reopened",
      description: completed ? "Great job on completing this task!" : "Task marked as pending.",
    });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
      variant: "destructive",
    });
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-button">
              <CheckSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Stay organized and boost your productivity
          </p>
        </div>

        {/* Create Task Button */}
        <div className="mb-6">
          <Button
            onClick={openCreateModal}
            size="lg"
            className="shadow-button hover:shadow-medium"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Task
          </Button>
        </div>

        {/* Task Filters */}
        <TaskFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gradient-card rounded-xl border border-input-border shadow-card max-w-md mx-auto">
                <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  {activeFilter === 'completed' && 'No completed tasks yet'} 
                  {activeFilter === 'pending' && 'No pending tasks'} 
                  {activeFilter === 'all' && 'No tasks yet'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeFilter === 'all' 
                    ? "Create your first task to get started!" 
                    : `Switch to a different filter to see other tasks.`
                  }
                </p>
                {activeFilter === 'all' && (
                  <Button onClick={openCreateModal}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                )}
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />
      </div>
    </div>
  );
};

export default Index;
