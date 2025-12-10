import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObservableDemo } from './components/observable-demo/observable-demo';

@Component({
  selector: 'app-root',
  imports: [ObservableDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
