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
    if (!this.userInput.trim() || this.loading) return;

    const message = this.userInput;

    this.messages.push({ text: message, sender: 'user' });
    this.userInput = '';
    this.loading = true;

    this.chatService.sendMessage(message, this.sessionId)
    .pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (res: any) => {
        if (!res || !res.response) {
          this.messages.push({
            text: "I couldn't understand that. Try rephrasing.",
            sender: 'bot'
          });
        } else {
          this.messages.push({
            text: res.response,
            sender: 'bot'
          });
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.messages.push({
          text: "Something went wrong. Please try again later.",
          sender: 'bot'
        });
        this.loading = false;
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