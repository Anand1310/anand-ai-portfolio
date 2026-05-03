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

  private apiUrl = 'http://127.0.0.1:8000/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, sessionId: string) {
    return this.http.post<any>('http://127.0.0.1:8000/chat', {
      message,
      session_id: sessionId
    }).pipe(
      timeout(10000), // 10 sec
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}