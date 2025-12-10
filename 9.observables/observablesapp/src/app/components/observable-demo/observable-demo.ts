import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Post, User } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-observable-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './observable-demo.html',
  styleUrl: './observable-demo.scss'
})
export class ObservableDemo implements OnInit, OnDestroy {
  // Signals for reactive state
  protected currentPost = signal<Post | null>(null);
  protected currentUser = signal<User | null>(null);
  protected messages = signal<string[]>([]);
  protected notifications = signal<string[]>([]);
  protected streamData = signal<number[]>([]);
  protected coldObsData1 = signal<number[]>([]);
  protected coldObsData2 = signal<number[]>([]);
  protected loading = signal<boolean>(false);
  protected messageInput = signal<string>('');
  protected notificationInput = signal<string>('');

  private subscriptions = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Subscribe to Subject (only gets messages sent after subscription)
    this.subscriptions.add(
      this.dataService.message$.subscribe(message => {
        console.log('Subject received:', message);
        this.messages.update(msgs => [...msgs, message]);
      })
    );

    // Subscribe to BehaviorSubject (gets last value immediately)
    this.subscriptions.add(
      this.dataService.user$.subscribe(user => {
        console.log('BehaviorSubject received:', user);
        this.currentUser.set(user);
      })
    );

    // Subscribe to ReplaySubject (gets last 3 values immediately)
    this.subscriptions.add(
      this.dataService.notifications$.subscribe(notification => {
        console.log('ReplaySubject received:', notification);
        this.notifications.update(notifs => [...notifs, notification]);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Observable demo - fetch random post
  fetchRandomPost(): void {
    this.loading.set(true);
    this.dataService.getRandomPost().subscribe({
      next: (post) => {
        console.log('Observable received post:', post);
        this.currentPost.set(post);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        this.loading.set(false);
      }
    });
  }

  // Subject demo - send message
  sendMessage(): void {
    const message = this.messageInput();
    if (message.trim()) {
      this.dataService.sendMessage(message);
      this.messageInput.set('');
    }
  }

  clearMessages(): void {
    this.messages.set([]);
  }

  // BehaviorSubject demo - fetch and set user
  fetchRandomUser(): void {
    this.dataService.getRandomUser().subscribe({
      next: (user) => {
        console.log('Fetched user:', user);
        this.dataService.setCurrentUser(user);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  clearUser(): void {
    this.dataService.clearCurrentUser();
  }

  // ReplaySubject demo - add notification
  addNotification(): void {
    const notification = this.notificationInput();
    if (notification.trim()) {
      this.dataService.addNotification(notification);
      this.notificationInput.set('');
    }
  }

  clearNotifications(): void {
    this.notifications.set([]);
  }

  // Demonstrate late subscription to ReplaySubject
  lateSubscribeToNotifications(): void {
    console.log('--- Late Subscription to ReplaySubject ---');
    this.dataService.notifications$.subscribe(notification => {
      console.log('Late subscriber received:', notification);
    });
  }

  // Cold Observable demo
  subscribeToColdObservable1(): void {
    console.log('--- Subscribing to Cold Observable 1 ---');
    this.coldObsData1.set([]);
    this.dataService.getColdObservable().subscribe({
      next: (value) => {
        console.log('Cold Observable 1 received:', value);
        this.coldObsData1.update(data => [...data, value]);
      },
      complete: () => {
        console.log('Cold Observable 1 completed');
      }
    });
  }

  subscribeToColdObservable2(): void {
    console.log('--- Subscribing to Cold Observable 2 ---');
    this.coldObsData2.set([]);
    // Subscribe 2 seconds later to show independent execution
    setTimeout(() => {
      this.dataService.getColdObservable().subscribe({
        next: (value) => {
          console.log('Cold Observable 2 received:', value);
          this.coldObsData2.update(data => [...data, value]);
        },
        complete: () => {
          console.log('Cold Observable 2 completed');
        }
      });
    }, 2000);
  }

  // Stream demo
  startDataStream(): void {
    this.streamData.set([]);
    const streamSub = this.dataService.getSimulatedDataStream().subscribe({
      next: (value) => {
        console.log('Stream value:', value);
        this.streamData.update(data => {
          const newData = [...data, value];
          return newData.slice(-10); // Keep last 10 values
        });
      }
    });
    
    // Auto-stop after 15 seconds
    setTimeout(() => {
      streamSub.unsubscribe();
      console.log('Stream stopped');
    }, 15000);
  }

  updateMessageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.messageInput.set(input.value);
  }

  updateNotificationInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.notificationInput.set(input.value);
  }
}
