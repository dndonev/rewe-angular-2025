import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject, interval, of } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Subject - doesn't have initial value, subscribers only get future values
  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  // BehaviorSubject - has initial value, new subscribers get the last emitted value
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // ReplaySubject - replays the last N values to new subscribers
  private notificationSubject = new ReplaySubject<string>(3); // Keeps last 3 notifications
  public notifications$ = this.notificationSubject.asObservable();

  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
    // Emit some initial notifications
    this.notificationSubject.next('Welcome to Observable Demo!');
    this.notificationSubject.next('This is a ReplaySubject example');
  }

  // Basic Observable - Get random post
  getRandomPost(): Observable<Post> {
    const randomId = Math.floor(Math.random() * 100) + 1;
    
    return this.http.get<Post>(`${this.apiUrl}/posts/${randomId}`);
  }

  // Observable with transformation
  getRandomUser(): Observable<User> {
    const randomId = Math.floor(Math.random() * 10) + 1;
    return this.http.get<User>(`${this.apiUrl}/users/${randomId}`);
  }

  // Observable that emits multiple values over time
  getPostsStream(): Observable<Post> {
    return interval(2000).pipe(
      switchMap(() => this.getRandomPost())
    );
  }

  // Subject methods
  public sendMessage(message: string): void {
    this.messageSubject.next(message);
  }

  // BehaviorSubject methods
  setCurrentUser(user: User): void {
    this.userSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  clearCurrentUser(): void {
    this.userSubject.next(null);
  }

  // ReplaySubject methods
  addNotification(notification: string): void {
    this.notificationSubject.next(notification);
  }

  // Simulated data stream
  getSimulatedDataStream(): Observable<number> {
    return interval(1000).pipe(
      map(i => i + 1)
    );
  }

  // Create a cold observable (each subscriber gets its own execution)
  getColdObservable(): Observable<number> {
    return new Observable(observer => {
      console.log('Cold Observable: New subscription started');
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next(++count);
        if (count === 5) {
          observer.complete();
          clearInterval(intervalId);
        }
      }, 1000);

      return () => {
        console.log('Cold Observable: Subscription cleaned up');
        clearInterval(intervalId);
      };
    });
  }
}
