import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;
  userName = 'SohJorgeMesmo78';

  // Get initials dynamically
  get userInitials(): string {
    if (!this.userName) return 'US';
    
    const name = this.userName.trim();
    if (name.length === 0) return 'US';
    if (name.length === 1) return name[0].toUpperCase();

    const firstLetter = name[0].toUpperCase();
    
    // Find first capital letter after index 0
    for (let i = 1; i < name.length; i++) {
      if (name[i] >= 'A' && name[i] <= 'Z') {
        return firstLetter + name[i];
      }
    }

    // Fallback: second letter
    return firstLetter + name[1].toUpperCase();
  }

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.username;
      } else {
        this.userName = '';
      }
    });
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click')
  closeMenu() {
    this.isMenuOpen = false;
  }

  goToSettings() {
    this.isMenuOpen = false;
    this.router.navigate(['/settings']);
  }

  logout() {
    this.isMenuOpen = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
