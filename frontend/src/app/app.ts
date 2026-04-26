import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { ChatOverlay } from './components/chat-overlay/chat-overlay';
import { ContactModal } from './components/contact-modal/contact-modal';
import { Experience } from './components/experience/experience';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    About,
    Experience,
    Skills,
    Projects,
    ChatOverlay,
    ContactModal,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('myportfolio');
  showChat = false;
  showContact = false;

  openChat() {
    this.showChat = true;
  }

  closeChat() {
    this.showChat = false;
  }

  openContact() {
    this.showContact = true;
  }

  closeContact() {
    this.showContact = false;
  }
}
