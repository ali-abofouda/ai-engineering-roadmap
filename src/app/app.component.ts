import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { SessionModalComponent } from './components/session-modal/session-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    SearchModalComponent,
    SessionModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AI Engineer Roadmap';
  searchModalOpen = false;
  sessionModalOpen = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchModalOpen = !this.searchModalOpen;
    }
  }

  openSearch() {
    this.searchModalOpen = true;
  }

  closeSearch() {
    this.searchModalOpen = false;
  }

  openSession() {
    this.sessionModalOpen = true;
  }

  closeSession() {
    this.sessionModalOpen = false;
  }
}
