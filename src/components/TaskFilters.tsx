import { Button } from "@/components/ui/button";
import { TaskFilter } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

export const TaskFilters = ({ activeFilter, onFilterChange, taskCounts }: TaskFiltersProps) => {
  const filters: { value: TaskFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All Tasks', count: taskCounts.all },
    { value: 'pending', label: 'Pending', count: taskCounts.pending },
    { value: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "transition-all duration-200",
            activeFilter === filter.value 
              ? "shadow-button" 
              : "hover:shadow-soft"
          )}
        >
          {filter.label}
          <span className={cn(
            "ml-2 px-2 py-0.5 rounded-full text-xs font-medium",
            activeFilter === filter.value
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}>
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  );
};