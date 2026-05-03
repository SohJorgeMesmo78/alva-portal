import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarNavComponent } from './components/calendar-nav/calendar-nav.component';
import { DailyFocusComponent } from './components/daily-focus/daily-focus.component';
import { TaskService } from '../../core/services/task.service';
import { TaskItem } from '../../core/models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarNavComponent, DailyFocusComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedDate: Date = new Date();
  tasksForSelectedDate: TaskItem[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasksForDate(this.selectedDate);
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.loadTasksForDate(date);
  }

  loadTasksForDate(date: Date) {
    this.taskService.getTasksByDate(date).subscribe(tasks => {
      this.tasksForSelectedDate = tasks;
    });
  }

  onToggleTask(taskId: string) {
    const task = this.tasksForSelectedDate.find(t => t.id === taskId);
    if (task) {
      this.taskService.toggleTaskCompletion(taskId, !task.completed).subscribe();
    }
  }
}
