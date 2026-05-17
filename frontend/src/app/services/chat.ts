import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private apiUrl = 'https://anand-ai-portfolio.onrender.com/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, sessionId: string) {
    return this.http.post<any>(this.apiUrl, {
      message,
      session_id: sessionId
    }).pipe(
      timeout(100000),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}