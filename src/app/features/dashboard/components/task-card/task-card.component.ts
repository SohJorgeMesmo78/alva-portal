import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment, DeadlineGoal, Habit, TaskItem, TaskType } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: TaskItem;
  @Output() toggleComplete = new EventEmitter<string>();

  get isAppointment(): boolean {
    return this.task.type === TaskType.Appointment;
  }

  get isHabit(): boolean {
    return this.task.type === TaskType.Habit;
  }

  get isDeadlineGoal(): boolean {
    return this.task.type === TaskType.DeadlineGoal;
  }

  get appointmentTask(): Appointment {
    return this.task as Appointment;
  }

  get habitTask(): Habit {
    return this.task as Habit;
  }

  get deadlineTask(): DeadlineGoal {
    return this.task as DeadlineGoal;
  }

  onToggleComplete(event: Event) {
    event.stopPropagation();
    this.toggleComplete.emit(this.task.id);
  }
}
