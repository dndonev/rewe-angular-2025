import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService, User } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * UserListComponent Test Suite
 * 
 * This test suite demonstrates:
 * 1. Testing components with service dependencies
 * 2. Mocking services with Jasmine spies
 * 3. Testing async operations with fakeAsync and tick
 * 4. Testing component initialization (ngOnInit)
 * 5. Testing parent-child component interaction
 * 6. Testing error handling
 * 7. Testing state management
 * 
 * Key Testing Concepts:
 * - Service mocking: Creating mock services to isolate component tests
 * - fakeAsync/tick: Control async operations in tests
 * - jasmine.createSpyObj: Create mock objects with spy methods
 * - of() / throwError(): Create mock observables
 * - Component stubs: Simplified child components for testing
 */
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let compiled: HTMLElement;
  let userServiceMock: jasmine.SpyObj<UserService>;

  // Mock data
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
  ];

  /**
   * beforeEach - Setup before each test
   * 
   * Creates a mock UserService with spy methods
   * This isolates the component from the real service
   */
  beforeEach(async () => {
    // Create a spy object with all service methods
    // jasmine.createSpyObj creates an object with spy methods
    userServiceMock = jasmine.createSpyObj('UserService', [
      'getUsers',
      'getUserById',
      'createUser',
      'updateUser',
      'deleteUser',
      'searchUsers'
    ]);

    // Set default return values for spies
    // By default, getUsers returns our mock data
    userServiceMock.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      // Provide the mock service instead of the real one
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    
    // Don't call detectChanges here to prevent ngOnInit from running
    // Tests that need ngOnInit will call it explicitly
  });

  /**
   * Basic test - Component creation
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testing ngOnInit - Component initialization
   * 
   * Demonstrates testing lifecycle hooks
   */
  describe('ngOnInit', () => {
    /**
     * Using fakeAsync and tick to test async operations
     * 
     * fakeAsync creates a zone where async operations can be controlled
     * tick() simulates the passage of time
     */
    it('should load users on initialization', fakeAsync(() => {
      // ACT: Trigger ngOnInit
      component.ngOnInit();
      tick(); // Wait for observable to complete

      // ASSERT: Verify users were loaded
      expect(userServiceMock.getUsers).toHaveBeenCalled();
      expect(component.users).toEqual(mockUsers);
      expect(component.users.length).toBe(3);
    }));

    it('should set loading to true then false', fakeAsync(() => {
      // Initially false
      expect(component.loading).toBeFalse();

      component.ngOnInit();
      
      // Should be true while loading (we can't easily test this timing)
      tick(); // Complete the observable

      // Should be false after loading
      expect(component.loading).toBeFalse();
    }));

    it('should handle errors when loading users fails', fakeAsync(() => {
      // Make the service return an error
      const errorMessage = 'Network error';
      userServiceMock.getUsers.and.returnValue(
        throwError(() => new Error(errorMessage))
      );

      // Spy on console.error to prevent test output pollution
      spyOn(console, 'error');

      component.ngOnInit();
      tick();

      // Verify error state
      expect(component.error).toBe('Failed to load users. Please try again.');
      expect(component.loading).toBeFalse();
      expect(console.error).toHaveBeenCalled();
    }));
  });

  /**
   * Testing loadUsers method
   */
  describe('loadUsers', () => {
    it('should call UserService.getUsers', () => {
      component.loadUsers();

      expect(userServiceMock.getUsers).toHaveBeenCalled();
    });

    it('should populate users array with service data', fakeAsync(() => {
      component.loadUsers();
      tick();

      expect(component.users).toEqual(mockUsers);
    }));

    it('should clear previous error when reloading', fakeAsync(() => {
      // Set an error
      component.error = 'Previous error';

      component.loadUsers();
      tick();

      // Error should be cleared
      expect(component.error).toBeNull();
    }));
  });

  /**
   * Testing user selection
   */
  describe('User selection', () => {
    it('should set selectedUserId when user is selected', () => {
      const user = mockUsers[0];

      component.onUserSelected(user);

      expect(component.selectedUserId).toBe(user.id);
    });

    it('should display selected user info in template', fakeAsync(() => {
      fixture.detectChanges(); // Initial render
      tick();

      component.onUserSelected(mockUsers[0]);
      fixture.detectChanges();

      const selectedInfo = compiled.querySelector('[data-testid="selected-info"]');
      expect(selectedInfo).toBeTruthy();
      expect(selectedInfo?.textContent).toContain('Selected User ID: 1');
    }));
  });

  /**
   * Testing user editing
   */
  describe('User editing', () => {
    it('should open form in edit mode when user edit is triggered', () => {
      const user = mockUsers[0];

      component.onUserEdit(user);

      expect(component.showForm).toBeTrue();
      expect(component.editingUser).toEqual(user);
    });

    it('should call updateUser service when editing user', fakeAsync(() => {
      const updatedUser: User = { 
        id: 1, 
        name: 'Updated Name', 
        email: 'updated@example.com', 
        role: 'admin' 
      };

      // Setup: Load initial users
      component.ngOnInit();
      tick();

      // Mock updateUser to return updated user
      userServiceMock.updateUser.and.returnValue(of(updatedUser));

      // ACT: Submit update
      component.onUserSubmitted(updatedUser);
      tick();

      // ASSERT: Service was called and user was updated
      expect(userServiceMock.updateUser).toHaveBeenCalledWith(updatedUser);
      expect(component.users[0]).toEqual(updatedUser);
      expect(component.showForm).toBeFalse();
    }));

    it('should handle errors when updating user fails', fakeAsync(() => {
      const updatedUser: User = { 
        id: 1, 
        name: 'Updated', 
        email: 'updated@example.com', 
        role: 'admin' 
      };

      // Open form first to set editingUser
      component.onUserEdit(mockUsers[0]);
      
      userServiceMock.updateUser.and.returnValue(
        throwError(() => new Error('Update failed'))
      );
      spyOn(console, 'error');

      component.onUserSubmitted(updatedUser);
      tick();

      expect(component.error).toBe('Failed to update user. Please try again.');
      expect(component.showForm).toBeTrue(); // Form stays open on error
    }));
  });

  /**
   * Testing user creation
   */
  describe('User creation', () => {
    it('should open form in create mode', () => {
      component.openCreateForm();

      expect(component.showForm).toBeTrue();
      expect(component.editingUser).toBeNull();
    });

    it('should call createUser service when creating new user', fakeAsync(() => {
      const newUserData = { 
        name: 'New User', 
        email: 'new@example.com', 
        role: 'user' 
      };
      const createdUser: User = { id: 4, ...newUserData };

      // Setup
      component.ngOnInit();
      tick();

      // Mock createUser to return new user with ID
      userServiceMock.createUser.and.returnValue(of(createdUser));

      // ACT: Submit new user
      component.onUserSubmitted(newUserData);
      tick();

      // ASSERT: Service was called and user was added
      expect(userServiceMock.createUser).toHaveBeenCalledWith(newUserData);
      expect(component.users.length).toBe(4);
      expect(component.users[3]).toEqual(createdUser);
      expect(component.showForm).toBeFalse();
    }));

    it('should handle errors when creating user fails', fakeAsync(() => {
      const newUserData = { 
        name: 'New User', 
        email: 'new@example.com', 
        role: 'user' 
      };

      userServiceMock.createUser.and.returnValue(
        throwError(() => new Error('Creation failed'))
      );
      spyOn(console, 'error');

      component.onUserSubmitted(newUserData);
      tick();

      expect(component.error).toBe('Failed to create user. Please try again.');
    }));
  });

  /**
   * Testing user deletion
   */
  describe('User deletion', () => {
    beforeEach(() => {
      // Mock window.confirm to always return true
      spyOn(window, 'confirm').and.returnValue(true);
    });

    it('should call deleteUser service when deleting user', fakeAsync(() => {
      const userId = 1;

      // Setup: Load users
      component.ngOnInit();
      tick();

      // Mock deleteUser
      userServiceMock.deleteUser.and.returnValue(of(undefined));

      // ACT: Delete user
      component.onUserDelete(userId);
      tick();

      // ASSERT: Service was called
      expect(userServiceMock.deleteUser).toHaveBeenCalledWith(userId);
    }));

    it('should remove user from array after successful deletion', fakeAsync(() => {
      const userId = 2;

      // Setup
      component.ngOnInit();
      tick();
      expect(component.users.length).toBe(3);

      // Mock deleteUser
      userServiceMock.deleteUser.and.returnValue(of(undefined));

      // ACT: Delete user
      component.onUserDelete(userId);
      tick();

      // ASSERT: User was removed
      expect(component.users.length).toBe(2);
      expect(component.users.find(u => u.id === userId)).toBeUndefined();
    }));

    it('should clear selectedUserId if deleted user was selected', fakeAsync(() => {
      const userId = 1;

      // Setup: Select user
      component.ngOnInit();
      tick();
      component.selectedUserId = userId;

      userServiceMock.deleteUser.and.returnValue(of(undefined));

      // ACT: Delete selected user
      component.onUserDelete(userId);
      tick();

      // ASSERT: Selection was cleared
      expect(component.selectedUserId).toBeNull();
    }));

    it('should not delete if user cancels confirmation', () => {
      // Override confirm to return false
      (window.confirm as jasmine.Spy).and.returnValue(false);

      component.onUserDelete(1);

      // Service should not be called
      expect(userServiceMock.deleteUser).not.toHaveBeenCalled();
    });

    it('should handle errors when deletion fails', fakeAsync(() => {
      userServiceMock.deleteUser.and.returnValue(
        throwError(() => new Error('Deletion failed'))
      );
      spyOn(console, 'error');

      component.onUserDelete(1);
      tick();

      expect(component.error).toBe('Failed to delete user. Please try again.');
    }));
  });

  /**
   * Testing form cancellation
   */
  describe('Form cancellation', () => {
    it('should close form when cancelled', () => {
      // Open form first
      component.showForm = true;
      component.editingUser = mockUsers[0];

      component.onFormCancelled();

      expect(component.showForm).toBeFalse();
      expect(component.editingUser).toBeNull();
    });
  });

  /**
   * Testing template rendering
   */
  describe('Template rendering', () => {

    it('should display error banner when error exists', fakeAsync(() => {
      // Initialize first
      fixture.detectChanges();
      tick();
      
      // Then set error
      component.error = 'Test error message';
      fixture.detectChanges();

      const errorBanner = compiled.querySelector('[data-testid="error-banner"]');
      expect(errorBanner).toBeTruthy();
      expect(errorBanner?.textContent).toContain('Test error message');
    }));

    it('should display retry button in error banner', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      
      component.error = 'Test error';
      fixture.detectChanges();

      const retryButton = compiled.querySelector('[data-testid="retry-button"]');
      expect(retryButton).toBeTruthy();
    }));

    it('should call retryLoad when retry button is clicked', fakeAsync(() => {
      spyOn(component, 'retryLoad');
      
      fixture.detectChanges();
      tick();
      
      component.error = 'Test error';
      fixture.detectChanges();

      const retryButton = compiled.querySelector('[data-testid="retry-button"]') as HTMLElement;
      if (retryButton) {
        retryButton.click();
        expect(component.retryLoad).toHaveBeenCalled();
      } else {
        fail('Retry button not found');
      }
    }));

    it('should display empty state when no users', fakeAsync(() => {
      userServiceMock.getUsers.and.returnValue(of([]));
      
      component.ngOnInit();
      tick();
      fixture.detectChanges();

      const emptyState = compiled.querySelector('[data-testid="empty-state"]');
      expect(emptyState).toBeTruthy();
      expect(emptyState?.textContent).toContain('No users found');
    }));

    it('should display user count when users exist', fakeAsync(() => {
      component.ngOnInit();
      tick();
      fixture.detectChanges();

      const userCount = compiled.querySelector('[data-testid="user-count"]');
      expect(userCount).toBeTruthy();
      expect(userCount?.textContent).toContain('Total Users: 3');
    }));

    it('should render UserCard components for each user', fakeAsync(() => {
      component.ngOnInit();
      tick();
      fixture.detectChanges();

      // Query for user card components
      const userCards = fixture.debugElement.queryAll(By.css('app-user-card'));
      expect(userCards.length).toBe(3);
    }));

    it('should show form container when showForm is true', () => {
      component.showForm = true;
      fixture.detectChanges();

      const formContainer = compiled.querySelector('[data-testid="form-container"]');
      expect(formContainer).toBeTruthy();
    });

    it('should hide form container when showForm is false', () => {
      component.showForm = false;
      fixture.detectChanges();

      const formContainer = compiled.querySelector('[data-testid="form-container"]');
      expect(formContainer).toBeFalsy();
    });

    it('should disable create button when loading', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      
      component.loading = true;
      fixture.detectChanges();

      const createButton = compiled.querySelector('[data-testid="create-user-button"]') as HTMLButtonElement;
      expect(createButton).toBeTruthy();
      expect(createButton.disabled).toBeTrue();
    }));

    it('should disable create button when form is open', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      
      component.showForm = true;
      fixture.detectChanges();

      const createButton = compiled.querySelector('[data-testid="create-user-button"]') as HTMLButtonElement;
      expect(createButton).toBeTruthy();
      expect(createButton.disabled).toBeTrue();
    }));
  });

  /**
   * Testing parent-child component interaction
   * 
   * These tests verify that child component events are properly handled
   */
  describe('Parent-child component interaction', () => {
    it('should handle userSelected event from child UserCardComponent', fakeAsync(() => {
      spyOn(component, 'onUserSelected');

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      // Find first user card
      const userCard = fixture.debugElement.query(By.css('app-user-card'));
      
      // Emit event from child component
      userCard.componentInstance.userSelected.emit(mockUsers[0]);

      expect(component.onUserSelected).toHaveBeenCalledWith(mockUsers[0]);
    }));

    it('should handle userEdited event from child UserCardComponent', fakeAsync(() => {
      spyOn(component, 'onUserEdit');

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      const userCard = fixture.debugElement.query(By.css('app-user-card'));
      userCard.componentInstance.userEdited.emit(mockUsers[0]);

      expect(component.onUserEdit).toHaveBeenCalledWith(mockUsers[0]);
    }));

    it('should handle userDeleted event from child UserCardComponent', fakeAsync(() => {
      spyOn(component, 'onUserDelete');
      spyOn(window, 'confirm').and.returnValue(true);

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      const userCard = fixture.debugElement.query(By.css('app-user-card'));
      userCard.componentInstance.userDeleted.emit(mockUsers[0].id);

      expect(component.onUserDelete).toHaveBeenCalledWith(mockUsers[0].id);
    }));

    it('should handle userSubmitted event from child UserFormComponent', () => {
      spyOn(component, 'onUserSubmitted');
      component.showForm = true;
      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.css('app-user-form'));
      const userData = { name: 'Test', email: 'test@example.com', role: 'user' };
      
      formComponent.componentInstance.userSubmitted.emit(userData);

      expect(component.onUserSubmitted).toHaveBeenCalledWith(userData);
    });

    it('should handle cancelled event from child UserFormComponent', () => {
      spyOn(component, 'onFormCancelled');
      component.showForm = true;
      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.css('app-user-form'));
      formComponent.componentInstance.cancelled.emit();

      expect(component.onFormCancelled).toHaveBeenCalled();
    });
  });

  /**
   * Testing trackBy function
   * 
   * TrackBy functions improve ngFor performance
   */
  describe('trackByUserId', () => {
    it('should return user ID', () => {
      const user = mockUsers[0];
      const result = component.trackByUserId(0, user);

      expect(result).toBe(user.id);
    });
  });

  /**
   * Integration test - Complete workflow
   */
  describe('Integration - Complete user management workflow', () => {
    it('should handle complete CRUD workflow', fakeAsync(() => {
      // LOAD users
      component.ngOnInit();
      tick();
      expect(component.users.length).toBe(3);

      // CREATE new user
      const newUserData = { name: 'New User', email: 'new@example.com', role: 'user' };
      const createdUser: User = { id: 4, ...newUserData };
      userServiceMock.createUser.and.returnValue(of(createdUser));
      
      component.openCreateForm();
      component.onUserSubmitted(newUserData);
      tick();
      expect(component.users.length).toBe(4);

      // UPDATE user
      const updatedUser: User = { id: 1, name: 'Updated', email: 'updated@example.com', role: 'admin' };
      userServiceMock.updateUser.and.returnValue(of(updatedUser));
      
      component.onUserEdit(mockUsers[0]);
      component.onUserSubmitted(updatedUser);
      tick();
      expect(component.users[0].name).toBe('Updated');

      // DELETE user
      spyOn(window, 'confirm').and.returnValue(true);
      userServiceMock.deleteUser.and.returnValue(of(undefined));
      
      component.onUserDelete(2);
      tick();
      expect(component.users.length).toBe(3);
    }));
  });
});
