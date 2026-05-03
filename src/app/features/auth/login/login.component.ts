import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LogoComponent } from '../../../shared/components/logo/logo.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData = {
    login: '',
    password: ''
  };
  errorMessage = '';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private settingsService: SettingsService
  ) {}

  onLogin(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    if (!this.loginData.login || !this.loginData.password) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        // Apply user settings
        if (res.settings) {
          this.settingsService.applyThemeColors(res.settings.primaryColor, res.settings.theme);
        }
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        console.error(err);
      }
    });
  }
}
