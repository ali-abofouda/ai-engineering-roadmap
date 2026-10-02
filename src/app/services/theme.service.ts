import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppTheme = 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<AppTheme>('light');
  public currentTheme$ = this.themeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    try {
      localStorage.removeItem('ai_roadmap_theme');
    } catch {}
    this.setTheme('light');
  }

  public get currentTheme(): AppTheme {
    return 'light';
  }

  public setTheme(theme: AppTheme = 'light'): void {
    this.themeSubject.next('light');
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-bs-theme', 'light');
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
  }

  public toggleTheme(): void {
    // Dark mode removed - always light
    this.setTheme('light');
  }
}

