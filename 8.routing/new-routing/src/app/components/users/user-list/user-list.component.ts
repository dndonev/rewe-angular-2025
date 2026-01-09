import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <div class="child-component">
      <h3>📋 User List (Child Component)</h3>
      <p>This component is rendered inside the Users component's router-outlet.</p>
      
      <div class="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td><span class="role-badge">{{ user.role }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .child-component {
      background: white;
      padding: 20px;
      border-radius: 6px;
    }
    
    h3 {
      color: #333;
      margin-top: 0;
    }
    
    .user-table {
      margin-top: 20px;
      overflow-x: auto;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    
    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
    }
    
    tr:hover {
      background: #f8f9fa;
    }
    
    .role-badge {
      background: #007bff;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
  `]
})
export class UserListComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Moderator' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' }
  ];
}
