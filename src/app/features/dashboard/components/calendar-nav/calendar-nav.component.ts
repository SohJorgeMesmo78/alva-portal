import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Go back to Sunday
    
    const endDate = new Date(lastDayOfMonth);
    if (endDate.getDay() !== 6) {
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // Go forward to Saturday
    }

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
