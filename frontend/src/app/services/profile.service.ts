import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileSubject = new BehaviorSubject<any>(null);
  profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadProfile() {
    return this.http.get<any>('https://anand-ai-portfolio.onrender.com/profile').pipe(
      tap((data) => {
        this.profileSubject.next(data);
      }),
      map(() => true),
      catchError((error) => {
        console.error(error);
        this.profileSubject.next(null);
        return of(false);
      })
    );
  }

  getProfile(): Observable<any> {
    return this.profile$;
  }
}