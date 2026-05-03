export enum TaskType {
  Appointment = 'appointment',
  Habit = 'habit',
  DeadlineGoal = 'deadline_goal'
}

export interface BaseTask {
  id: string;
  title: string;
  type: TaskType;
  date: Date;
  completed: boolean; // Add completed for checkbox functionality
}

export interface Appointment extends BaseTask {
  type: TaskType.Appointment;
  time: string; // e.g. "19:00"
  duration?: number; // in minutes
  location?: string;
}

export interface Habit extends BaseTask {
  type: TaskType.Habit;
  streak?: number;
}

export interface DeadlineGoal extends BaseTask {
  type: TaskType.DeadlineGoal;
  deadline: Date;
  targetVolume: number;
  currentVolume: number;
  unit: string; // e.g. "livros", "páginas"
}

export type TaskItem = Appointment | Habit | DeadlineGoal;
