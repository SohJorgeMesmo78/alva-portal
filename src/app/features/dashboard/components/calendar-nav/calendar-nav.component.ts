import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  hasTasks: boolean; // Simple indicator
  isSelected: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendar-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-nav.component.html',
  styleUrls: ['./calendar-nav.component.scss']
})
export class CalendarNavComponent implements OnInit {
  @Input() selectedDate: Date = new Date();
  @Output() dateSelect = new EventEmitter<Date>();

  currentMonth: Date = new Date();
  days: CalendarDay[] = [];
  weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  userLanguage = 'pt-BR';

  startOfWeek = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.settings) {
        this.startOfWeek = parseInt(user.settings.startOfWeek, 10);
        this.userLanguage = user.settings.language;
        this.updateWeekDays();
        this.generateCalendar();
      } else {
        this.generateCalendar();
      }
    });
  }

  updateWeekDays() {
    if (this.startOfWeek === 1) {
      this.weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    } else {
      this.weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    }
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDayOfMonth);
    const firstDayOfWeek = startDate.getDay();
    const diff = this.startOfWeek === 1 
      ? (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1)
      : firstDayOfWeek;
      
    startDate.setDate(startDate.getDate() - diff);
    
    const endDate = new Date(lastDayOfMonth);
    const lastDayOfWeek = endDate.getDay();
    const endDiff = this.startOfWeek === 1
      ? (lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek)
      : (6 - lastDayOfWeek);
      
    endDate.setDate(endDate.getDate() + endDiff);

    this.days = [];
    let currentDate = new Date(startDate);
    const today = new Date();

    while (currentDate <= endDate) {
      this.days.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        hasTasks: Math.random() > 0.5, // Mock task indicator
        isSelected: this.isSameDay(currentDate, this.selectedDate),
        isToday: this.isSameDay(currentDate, today)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  }

  selectDate(day: CalendarDay) {
    this.selectedDate = day.date;
    this.generateCalendar(); // Re-evaluate isSelected
    this.dateSelect.emit(day.date);
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }
}
