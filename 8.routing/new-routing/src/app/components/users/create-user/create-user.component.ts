import { Component } from '@angular/core';

@Component({
  selector: 'app-create-user',
  standalone: true,
  template: `
    <div class="child-component">
      <h3>➕ Create New User (Child Component)</h3>
      <p>This is another child component rendered in the same router-outlet.</p>
      
      <form class="create-form">
        <div class="form-row">
          <div class="form-group">
            <label>First Name:</label>
            <input type="text" placeholder="Enter first name">
          </div>
          <div class="form-group">
            <label>Last Name:</label>
            <input type="text" placeholder="Enter last name">
          </div>
        </div>
        
        <div class="form-group">
          <label>Email:</label>
          <input type="email" placeholder="user@example.com">
        </div>
        
        <div class="form-group">
          <label>Role:</label>
          <select>
            <option>User</option>
            <option>Moderator</option>
            <option>Admin</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Bio:</label>
          <textarea rows="4" placeholder="Tell us about yourself..."></textarea>
        </div>
        
        <button type="submit" class="submit-btn">Create User</button>
      </form>
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
    
    .create-form {
      margin-top: 20px;
      max-width: 600px;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      font-size: 16px;
      font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    .submit-btn {
      background: #28a745;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: background 0.3s;
    }
    
    .submit-btn:hover {
      background: #218838;
    }
  `]
})
export class CreateUserComponent {}
