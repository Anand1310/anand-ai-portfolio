import { Component, signal, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
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
import { ChatService } from './services/chat';
import { finalize } from 'rxjs/operators';
import { Loader } from './shared/loader/loader';
import { Failure } from './shared/failure/failure';

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
    Footer,
    Loader,
    Failure
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {

  @ViewChild(Loader)
  loader!: Loader;

  protected readonly title = signal('myportfolio');
  showChat = false;
  showContact = false;
  profileLoading = true;
  profileLoadFailed = false;

  constructor(
    private profileService: ProfileService,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  ngAfterViewInit() {
    this.loader.startLoadingMessages();
  }

  loadProfile() {
    this.profileLoading = true;
    this.profileLoadFailed = false;
    this.warmupAISession();
    this.profileService.loadProfile()
      .pipe(
        finalize(() => {
          this.profileLoading = false;
          this.loader.stopLoadingMessages();
          this.cdr.detectChanges();
        })
      )
      .subscribe((success) => {
        if (!success) {
          this.profileLoadFailed = true;
        }
        this.profileLoading = false;
        this.loader.stopLoadingMessages();
        this.cdr.detectChanges();
      });
  }

  warmupAISession() {
    this.chatService.sendMessage("Hello", "warmup")
      .subscribe({
        next: () => console.log('AI session warmed up'),
        error: (err) => console.error(err)
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
