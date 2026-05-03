import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskItem } from '../../../../core/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-daily-focus',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  providers: [DatePipe],
  templateUrl: './daily-focus.component.html',
  styleUrls: ['./daily-focus.component.scss']
})
export class DailyFocusComponent implements OnInit {
  @Input() date!: Date;
  @Input() tasks: TaskItem[] = [];
  @Output() toggleTask = new EventEmitter<string>();

  userLanguage = 'pt-BR';
  userDateFormat = 'd \'de\' MMMM, yyyy';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.settings) {
        this.userLanguage = user.settings.language;
        this.userDateFormat = user.settings.dateFormat;
      }
    });
  }

  onToggleComplete(taskId: string) {
    this.toggleTask.emit(taskId);
  }
}
