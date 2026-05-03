import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = 'http://localhost:5200/api/settings';

  constructor(private http: HttpClient) {}

  getSettings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateSettings(settings: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, settings);
  }

  applyThemeColors(primaryColor: string, theme: string) {
    if (primaryColor) {
      document.documentElement.style.setProperty('--primary', primaryColor);
    }
    // Expand later for dark/light themes
  }
}
