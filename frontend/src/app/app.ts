import { Component, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { AchievementsCertifications } from './components/achievements-certification/achievements-certification';
import { Projects } from './components/projects/projects';
import { ChatOverlay } from './components/chat-overlay/chat-overlay';
import { ContactModal } from './components/contact-modal/contact-modal';
import { Experience } from './components/experience/experience';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CommonModule } from '@angular/common';
import { ProfileService } from './services/profile.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    About,
    AchievementsCertifications,
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
export class App implements OnInit {
  protected readonly title = signal('myportfolio');
  showChat = false;
  showContact = false;
  profileLoading = true;
  profileLoadFailed = false;

  constructor(
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.profileLoading = true;
    this.profileService.loadProfile()
    .pipe(
      finalize(() => {
        this.profileLoading = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe((success) => {
      if (!success) {
        this.profileLoadFailed = true;
      }
      this.profileLoading = false;
      this.cdr.detectChanges();
    });
  }

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
