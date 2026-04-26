import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-chat-assistant',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat-assistant.html',
  styleUrls: ['./chat-assistant.scss'],
})

export class ChatAssistant {

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  userInput = '';
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  loading = false;
  sessionId = crypto.randomUUID();

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) { }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const message = this.userInput;

    this.messages.push({ text: message, sender: 'user' });
    this.userInput = '';
    this.loading = true;

    this.chatService.sendMessage(message, this.sessionId)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (res) => {
        this.messages = [
          ...this.messages,
          { text: res.response, sender: 'bot' }
        ];
        this.loading = false;
        this.scrollToBottom();
        this.cdr.detectChanges();
      },
      error: () => {
        this.messages.push({
          text: "Something went wrong. Try again.",
          sender: 'bot'
        });
        this.loading = false;
        this.scrollToBottom();
        this.cdr.detectChanges();
      }
    });
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    });
  }
}