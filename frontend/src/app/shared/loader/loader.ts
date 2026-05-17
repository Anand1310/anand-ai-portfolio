import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})

export class Loader {
  currentLoadingMessage = '';
  private messageIndex = 0;
  private intervalId: any;

  loadingMessages = [
    'Initializing AI portfolio services...',
    'Loading structured profile and project data...',
    'Warming up the AI retrieval pipeline...',
    'Establishing secure backend connection...',
    'Preparing context-aware assistant responses...',
    'Optimizing experience for first-time visitors...',
    'Loading may take a little longer due to free-tier cold starts...',
    'Almost ready — thank you for your patience.'
  ];

  constructor(
    private cdr: ChangeDetectorRef
  ){}

  startLoadingMessages() {

    this.currentLoadingMessage = this.loadingMessages[0];
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.messageIndex = this.messageIndex + 1;
      this.currentLoadingMessage = this.loadingMessages[this.messageIndex];
      this.cdr.detectChanges();
      if (this.messageIndex == this.loadingMessages.length - 1) {
        this.stopLoadingMessages()
      }
    }, 5000);
  }

  stopLoadingMessages() {
    clearInterval(this.intervalId);
  }
}
