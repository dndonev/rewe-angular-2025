import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="page-container">
      <h1>👥 Users Section</h1>
      <div class="content-box">
        <h2>Child Routes Demonstration</h2>
        <p>This section demonstrates <strong>nested routing</strong> (child routes).</p>
        
        <div class="info-banner">
          <strong>📌 Key Concept:</strong> This component has its own &lt;router-outlet&gt; 
          where child components are displayed!
        </div>
        
        <div class="users-nav">
          <a routerLink="list" routerLinkActive="active" class="nav-link">
            📋 User List
          </a>
          <a routerLink="create" routerLinkActive="active" class="nav-link">
            ➕ Create User
          </a>
          <a routerLink="settings" routerLinkActive="active" class="nav-link">
            ⚙️ Settings
          </a>
        </div>
        
        <div class="child-outlet-container">
          <!-- This is a nested router-outlet for child routes -->
          <router-outlet></router-outlet>
        </div>
        
        <div class="code-explanation">
          <h3>🔍 Child Routes Configuration</h3>
          <pre><code>{{'{' }}
  path: 'users',
  component: UsersComponent,
  children: [
    {{ '{' }} path: 'list', component: UserListComponent {{ '}' }},
    {{ '{' }} path: 'create', component: CreateUserComponent {{ '}' }},
    {{ '{' }} path: 'settings', component: UserSettingsComponent {{ '}' }}
  ]
{{ '}' }}</code></pre>
          <p>Child components are rendered in the UsersComponent's &lt;router-outlet&gt;</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 20px;
    }
    
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    
    .content-box {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .info-banner {
      background: #d1ecf1;
      border-left: 4px solid #17a2b8;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
    }
    
    .users-nav {
      display: flex;
      gap: 15px;
      margin: 30px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      flex-wrap: wrap;
    }
    
    .nav-link {
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      color: #333;
      background: white;
      border: 2px solid #dee2e6;
      transition: all 0.3s;
    }
    
    .nav-link:hover {
      background: #e9ecef;
      border-color: #007bff;
    }
    
    .nav-link.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    .child-outlet-container {
      min-height: 300px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .code-explanation {
      background: #fff3cd;
      padding: 20px;
      border-radius: 6px;
      margin-top: 30px;
      border-left: 4px solid #ffc107;
    }
    
    .code-explanation h3 {
      margin-top: 0;
      color: #856404;
    }
    
    .code-explanation pre {
      background: #282c34;
      color: #abb2bf;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 15px 0;
    }
    
    .code-explanation code {
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
    }
  `]
})
export class UsersComponent {}
