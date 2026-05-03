import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  // Idioma e Região
  selectedLanguage = 'pt-BR';
  selectedCountry = 'BR';
  selectedTimezone = 'America/Sao_Paulo';
  selectedDateFormat = 'dd/MM/yyyy';
  selectedTimeFormat = '24h';

  languages = [
    { code: 'pt-BR', name: 'Português (Brasil)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Español' }
  ];

  countries = [
    { code: 'BR', name: 'Brasil' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'PT', name: 'Portugal' }
  ];

  timezones = [
    { code: 'America/Sao_Paulo', name: 'Horário de Brasília (BRT)' },
    { code: 'America/New_York', name: 'Eastern Time (ET)' },
    { code: 'Europe/Lisbon', name: 'Lisboa (WET)' }
  ];

  dateFormats = [
    { code: 'dd/MM/yyyy', name: 'DD/MM/AAAA (ex: 31/12/2026)' },
    { code: 'MM/dd/yyyy', name: 'MM/DD/AAAA (ex: 12/31/2026)' },
    { code: 'yyyy-MM-dd', name: 'AAAA-MM-DD (ex: 2026-12-31)' },
    { code: 'd \'de\' MMMM, yyyy', name: 'Longo (ex: 1 de Janeiro, 2025)' }
  ];

  timeFormats = [
    { code: '24h', name: '24 horas (ex: 13:00)' },
    { code: '12h', name: '12 horas (ex: 1:00 PM)' }
  ];

  // Cores do Sistema
  selectedTheme = 'dark';
  selectedPrimaryColor = '#FFAA00'; // Amarelo Jooj

  themes = [
    { code: 'dark', name: 'Modo Escuro' },
    { code: 'light', name: 'Modo Claro' }
  ];

  primaryColors = [
    { code: '#FFAA00', name: 'Amarelo Jooj' },
    { code: '#00BFFF', name: 'Azul Oceano' },
    { code: '#00FA9A', name: 'Verde Menta' },
    { code: '#8A2BE2', name: 'Roxo Cósmico' }
  ];

  // Configuração de Calendário
  startOfWeek = '0'; // 0 = Domingo, 1 = Segunda

  weekStarts = [
    { code: '0', name: 'Domingo' },
    { code: '1', name: 'Segunda-feira' }
  ];

  // Notificações
  notificationsEnabled = true;
  soundEnabled = true;

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // We already have the settings stored in the user state upon login
    // Let's load it from there or fetch from API
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        if (settings) {
          this.selectedLanguage = settings.language;
          this.selectedCountry = settings.country;
          this.selectedTimezone = settings.timezone;
          this.selectedDateFormat = settings.dateFormat;
          this.selectedTimeFormat = settings.timeFormat;
          this.selectedTheme = settings.theme;
          this.selectedPrimaryColor = settings.primaryColor;
          this.startOfWeek = settings.startOfWeek;
          this.notificationsEnabled = settings.notificationsEnabled;
          this.soundEnabled = settings.soundEnabled;
        }
      },
      error: (err) => console.error('Failed to load settings', err)
    });
  }

  saveSettings() {
    const newSettings = {
      language: this.selectedLanguage,
      country: this.selectedCountry,
      timezone: this.selectedTimezone,
      dateFormat: this.selectedDateFormat,
      timeFormat: this.selectedTimeFormat,
      theme: this.selectedTheme,
      primaryColor: this.selectedPrimaryColor,
      startOfWeek: this.startOfWeek,
      notificationsEnabled: this.notificationsEnabled,
      soundEnabled: this.soundEnabled
    };

    this.settingsService.updateSettings(newSettings).subscribe({
      next: () => {
        console.log('Configurações salvas no backend com sucesso!');
        this.authService.updateUserSettings(newSettings);
        this.settingsService.applyThemeColors(this.selectedPrimaryColor, this.selectedTheme);
        alert('Configurações salvas!');
      },
      error: (err) => {
        console.error('Erro ao salvar as configurações', err);
        alert('Erro ao salvar as configurações.');
      }
    });
  }
}
