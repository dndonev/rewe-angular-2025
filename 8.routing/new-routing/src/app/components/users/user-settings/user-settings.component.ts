import { Component } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  template: `
    <div class="child-component">
      <h3>⚙️ User Settings (Child Component)</h3>
      <p>Configure user preferences and settings here.</p>
      
      <div class="settings-sections">
        <div class="settings-section">
          <h4>Account Settings</h4>
          <div class="setting-item">
            <label>
              <input type="checkbox" checked>
              Enable email notifications
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox">
              Enable SMS notifications
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox" checked>
              Make profile public
            </label>
          </div>
        </div>
        
        <div class="settings-section">
          <h4>Privacy Settings</h4>
          <div class="setting-item">
            <label>
              <input type="checkbox" checked>
              Show online status
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox" checked>
              Allow friend requests
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox">
              Show email to others
            </label>
          </div>
        </div>
        
        <div class="settings-section">
          <h4>Appearance</h4>
          <div class="setting-item">
            <label>Theme:</label>
            <select>
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div class="setting-item">
            <label>Language:</label>
            <select>
              <option>English</option>
              <option>German</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
      
      <button class="save-btn">💾 Save Settings</button>
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
    
    .settings-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    
    .settings-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
    }
    
    .settings-section h4 {
      margin-top: 0;
      color: #333;
      border-bottom: 2px solid #dee2e6;
      padding-bottom: 10px;
    }
    
    .setting-item {
      margin: 15px 0;
    }
    
    .setting-item label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      color: #333;
    }
    
    .setting-item input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    .setting-item select {
      width: 100%;
      padding: 8px;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      margin-top: 8px;
      font-size: 16px;
    }
    
    .save-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: background 0.3s;
      margin-top: 20px;
    }
    
    .save-btn:hover {
      background: #0056b3;
    }
  `]
})
export class UserSettingsComponent {}
