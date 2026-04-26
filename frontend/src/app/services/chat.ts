import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private apiUrl = 'http://127.0.0.1:8000/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, sessionId: string) {
  return this.http.post<ChatResponse>(this.apiUrl, {
    message,
    session_id: sessionId
  });
}
}