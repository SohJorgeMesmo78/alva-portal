import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskItem } from '../../../../core/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-daily-focus',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  providers: [DatePipe],
  templateUrl: './daily-focus.component.html',
  styleUrls: ['./daily-focus.component.scss']
})
export class DailyFocusComponent {
  @Input() date!: Date;
  @Input() tasks: TaskItem[] = [];
  @Output() toggleTask = new EventEmitter<string>();

  onToggleComplete(taskId: string) {
    this.toggleTask.emit(taskId);
  }
}
