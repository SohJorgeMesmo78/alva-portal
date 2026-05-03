import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskItem, TaskType } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private mockTasks: TaskItem[] = [
    {
      id: '1',
      title: 'Dar comida para os gatos',
      type: TaskType.Habit,
      date: new Date(),
      completed: true,
      streak: 5
    },
    {
      id: '2',
      title: 'Tomar remédio',
      type: TaskType.Habit,
      date: new Date(),
      completed: false,
      streak: 12
    },
    {
      id: '3',
      title: 'Reunião de Alinhamento',
      type: TaskType.Appointment,
      date: new Date(),
      completed: false,
      time: '14:30',
      duration: 60,
      location: 'Google Meet'
    },
    {
      id: '4',
      title: 'Ler 3 livros no mês',
      type: TaskType.DeadlineGoal,
      date: new Date(),
      completed: false,
      deadline: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // End of current month
      targetVolume: 3,
      currentVolume: 1,
      unit: 'livros'
    }
  ];

  constructor() { }

  getTasksByDate(date: Date): Observable<TaskItem[]> {
    // For now, returning all mock tasks regardless of the date for demonstration.
    // Later, filter by date.getDate() === task.date.getDate() ...
    return of(this.mockTasks);
  }

  toggleTaskCompletion(taskId: string, completed: boolean): Observable<TaskItem | undefined> {
    const task = this.mockTasks.find(t => t.id === taskId);
    if (task) {
      task.completed = completed;
    }
    return of(task);
  }
}
