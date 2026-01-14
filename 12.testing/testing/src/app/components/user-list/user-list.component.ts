import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserFormComponent } from '../user-form/user-form.component';

/**
 * UserListComponent - Parent component that orchestrates user management
 * 
 * This component demonstrates:
 * 1. Service injection and usage
 * 2. Parent component with nested child components
 * 3. Data flow from parent to children (@Input)
 * 4. Event handling from children (@Output)
 * 5. State management
 * 6. Async operations with observables
 * 7. Error handling
 * 
 * Testing focus:
 * - How to mock injected services
 * - How to test component initialization (ngOnInit)
 * - How to test async operations
 * - How to test parent-child component interaction
 * - How to test error scenarios
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  /**
   * Component state
   */
  users: User[] = [];
  loading = false;
  error: string | null = null;
  showForm = false;
  editingUser: User | null = null;
  selectedUserId: number | null = null;

  /**
   * Constructor with service injection
   * UserService is injected automatically by Angular's DI system
   * 
   * In tests, we can provide a mock service instead
   */
  constructor(private userService: UserService) {}

  /**
   * ngOnInit - Component initialization lifecycle hook
   * 
   * This runs once when the component is created
   * Perfect place to load initial data
   * 
   * In tests, we can verify this method is called
   * and that it loads data correctly
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Load all users from the service
   * 
   * Demonstrates:
   * - Async operation with observables
   * - Loading state management
   * - Error handling
   * 
   * Testing considerations:
   * - Mock the service to return test data
   * - Verify loading states
   * - Test error scenarios
   */
  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  /**
   * Handle user selection from UserCardComponent
   * 
   * This is called when a user card is clicked
   * 
   * @param user - Selected user
   */
  onUserSelected(user: User): void {
    this.selectedUserId = user.id;
    console.log('User selected:', user);
  }

  /**
   * Handle user edit request from UserCardComponent
   * 
   * Opens the form in edit mode
   * 
   * @param user - User to edit
   */
  onUserEdit(user: User): void {
    this.editingUser = user;
    this.showForm = true;
  }

  /**
   * Handle user delete request from UserCardComponent
   * 
   * Calls the service to delete the user
   * Updates the local state on success
   * 
   * @param userId - ID of user to delete
   */
  onUserDelete(userId: number): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        // Remove user from local array
        this.users = this.users.filter(u => u.id !== userId);
        this.loading = false;
        
        // Clear selection if deleted user was selected
        if (this.selectedUserId === userId) {
          this.selectedUserId = null;
        }
      },
      error: (error) => {
        this.error = 'Failed to delete user. Please try again.';
        this.loading = false;
        console.error('Error deleting user:', error);
      }
    });
  }

  /**
   * Handle form submission from UserFormComponent
   * 
   * Creates new user or updates existing user
   * 
   * @param userData - User data from form
   */
  onUserSubmitted(userData: Partial<User>): void {
    this.loading = true;
    this.error = null;

    // Determine if creating or updating
    if (userData.id) {
      // Update existing user
      this.userService.updateUser(userData as User).subscribe({
        next: (updatedUser) => {
          // Update user in local array
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          
          this.loading = false;
          this.closeForm();
        },
        error: (error) => {
          this.error = 'Failed to update user. Please try again.';
          this.loading = false;
          console.error('Error updating user:', error);
        }
      });
    } else {
      // Create new user
      // Cast is safe because form validates all required fields before emission
      this.userService.createUser(userData as Omit<User, 'id'>).subscribe({
        next: (newUser) => {
          // Add new user to local array
          this.users = [...this.users, newUser];
          this.loading = false;
          this.closeForm();
        },
        error: (error) => {
          this.error = 'Failed to create user. Please try again.';
          this.loading = false;
          console.error('Error creating user:', error);
        }
      });
    }
  }

  /**
   * Handle form cancellation from UserFormComponent
   */
  onFormCancelled(): void {
    this.closeForm();
  }

  /**
   * Open the form in create mode
   */
  openCreateForm(): void {
    this.editingUser = null;
    this.showForm = true;
  }

  /**
   * Close the form and reset state
   */
  closeForm(): void {
    this.showForm = false;
    this.editingUser = null;
  }

  /**
   * Retry loading users after an error
   */
  retryLoad(): void {
    this.loadUsers();
  }

  /**
   * Track users by ID for ngFor performance
   * 
   * This helps Angular track which items changed
   * Improves performance with large lists
   */
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
