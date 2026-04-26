import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ChatAssistant } from '../chat-assistant/chat-assistant';

@Component({
  selector: 'app-chat-overlay',
  standalone: true,
  imports: [ChatAssistant],
  templateUrl: './chat-overlay.html',
  styleUrl: './chat-overlay.scss',
})
export class ChatOverlay {
  @Output() close = new EventEmitter();
}
