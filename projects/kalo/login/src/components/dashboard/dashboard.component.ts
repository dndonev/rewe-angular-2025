import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute, private authService: AuthService, private router: Router
  ) { }
  username: string | undefined
  ngOnInit(): void {
    this.activeRoute.params.subscribe(p => {
      const username: string = p['username']
      if (username) {
        this.username = p['username']
      }
    })
  }
  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
