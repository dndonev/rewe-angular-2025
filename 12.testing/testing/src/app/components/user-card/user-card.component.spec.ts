import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { User } from '../../services/user.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * UserCardComponent Test Suite
 * 
 * This test suite demonstrates:
 * 1. Testing component with @Input properties
 * 2. Testing component with @Output event emitters
 * 3. Testing DOM rendering and data binding
 * 4. Testing user interactions (button clicks)
 * 5. Testing conditional CSS classes
 * 6. Using DebugElement for querying DOM
 * 
 * Key Testing Concepts:
 * - ComponentFixture: Wrapper for component and its template
 * - DebugElement: Abstraction for DOM elements (platform-agnostic)
 * - By.css(): Query DOM using CSS selectors
 * - fixture.detectChanges(): Trigger change detection
 * - spyOn(): Create spy to monitor method calls
 */
describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let compiled: HTMLElement;

  // Mock user data for testing
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  };

  /**
   * beforeEach - Setup before each test
   * 
   * Configure the testing module and create component instance
   * This runs before EVERY test in this suite
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import standalone component
      imports: [UserCardComponent]
    }).compileComponents();

    // Create component instance and get reference to fixture
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    // Set required @Input property
    // Without this, the component would error because user is required
    component.user = mockUser;
  });

  /**
   * Basic test - Component creation
   * 
   * Verify the component can be created successfully
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testing @Input - User data
   * 
   * Demonstrates how to test that @Input properties are received
   * and properly displayed in the template
   */
  describe('@Input user', () => {
    it('should display user name in the template', () => {
      // ARRANGE: Input is already set in beforeEach
      
      // ACT: Trigger change detection to update the DOM
      fixture.detectChanges();

      // ASSERT: Check if user name is rendered
      const nameElement = compiled.querySelector('[data-testid="user-name"]');
      expect(nameElement?.textContent).toContain('John Doe');
    });

    it('should display user email in the template', () => {
      fixture.detectChanges();

      const emailElement = compiled.querySelector('[data-testid="user-email"]');
      expect(emailElement?.textContent).toContain('john@example.com');
    });

    it('should display user role in the template', () => {
      fixture.detectChanges();

      const roleElement = compiled.querySelector('[data-testid="user-role"]');
      expect(roleElement?.textContent?.trim()).toBe('admin');
    });

    it('should display first letter of name in avatar', () => {
      fixture.detectChanges();

      const avatarElement = compiled.querySelector('.avatar-text');
      expect(avatarElement?.textContent).toBe('J');
    });

    /**
     * Testing with different input data
     * 
     * Demonstrates changing @Input and verifying the update
     */
    it('should update display when user input changes', () => {
      // Initial render
      fixture.detectChanges();
      let nameElement = compiled.querySelector('[data-testid="user-name"]');
      expect(nameElement?.textContent).toContain('John Doe');

      // Change the input
      component.user = {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user'
      };

      // Trigger change detection again
      fixture.detectChanges();

      // Verify the update
      nameElement = compiled.querySelector('[data-testid="user-name"]');
      expect(nameElement?.textContent).toContain('Jane Smith');
    });
  });

  /**
   * Testing @Input - Selectable flag
   * 
   * Demonstrates testing boolean @Input properties
   * and their effect on CSS classes
   */
  describe('@Input selectable', () => {
    it('should not have selectable class by default', () => {
      fixture.detectChanges();

      const cardElement = compiled.querySelector('.user-card');
      expect(cardElement?.classList.contains('selectable')).toBeFalse();
    });

    it('should have selectable class when selectable is true', () => {
      // Set the input
      component.selectable = true;
      fixture.detectChanges();

      const cardElement = compiled.querySelector('.user-card');
      expect(cardElement?.classList.contains('selectable')).toBeTrue();
    });
  });

  /**
   * Testing @Output - Event emitters
   * 
   * Demonstrates how to test event emissions
   * Using spies to verify events are emitted with correct data
   */
  describe('@Output userSelected', () => {
    it('should emit userSelected event when card is clicked and selectable is true', () => {
      // ARRANGE: Make card selectable
      component.selectable = true;
      fixture.detectChanges();

      // Create a spy on the event emitter
      // This allows us to verify the event was emitted
      spyOn(component.userSelected, 'emit');

      // ACT: Simulate card click
      const cardElement = compiled.querySelector('.user-card') as HTMLElement;
      cardElement.click();

      // ASSERT: Verify the event was emitted with the user
      expect(component.userSelected.emit).toHaveBeenCalledWith(mockUser);
    });

    it('should NOT emit userSelected event when selectable is false', () => {
      // ARRANGE: selectable is false by default
      fixture.detectChanges();

      spyOn(component.userSelected, 'emit');

      // ACT: Click the card
      const cardElement = compiled.querySelector('.user-card') as HTMLElement;
      cardElement.click();

      // ASSERT: Event should NOT be emitted
      expect(component.userSelected.emit).not.toHaveBeenCalled();
    });

    /**
     * Alternative approach: Subscribe to the event
     * 
     * Instead of spying, we can subscribe to the Observable
     */
    it('should emit user data when selected (subscription approach)', (done) => {
      component.selectable = true;
      fixture.detectChanges();

      // Subscribe to the output
      component.userSelected.subscribe((user: User) => {
        expect(user).toEqual(mockUser);
        done(); // Signal test completion (for async)
      });

      // Trigger the event
      const cardElement = compiled.querySelector('.user-card') as HTMLElement;
      cardElement.click();
    });
  });

  /**
   * Testing @Output - Delete event
   * 
   * Demonstrates testing button clicks that emit events
   * Also shows event.stopPropagation() testing
   */
  describe('@Output userDeleted', () => {
    it('should emit userDeleted event with user ID when delete button clicked', () => {
      fixture.detectChanges();

      // Spy on both events to verify stopPropagation works
      spyOn(component.userDeleted, 'emit');
      spyOn(component.userSelected, 'emit');

      // Find and click the delete button
      const deleteButton = compiled.querySelector('[data-testid="delete-button"]') as HTMLElement;
      deleteButton.click();

      // Verify delete event was emitted with user ID (not full user object)
      expect(component.userDeleted.emit).toHaveBeenCalledWith(mockUser.id);

      // Verify card click event was NOT triggered (stopPropagation worked)
      expect(component.userSelected.emit).not.toHaveBeenCalled();
    });

    /**
     * Testing using DebugElement
     * 
     * DebugElement provides more features than native HTMLElement
     * Good for testing events and properties
     */
    it('should call onDelete method when delete button is clicked', () => {
      fixture.detectChanges();

      // Spy on the component method
      spyOn(component, 'onDelete');

      // Use DebugElement to query and trigger event
      const deleteButton: DebugElement = fixture.debugElement.query(
        By.css('[data-testid="delete-button"]')
      );

      // Trigger click event
      deleteButton.nativeElement.click();

      // Verify method was called
      expect(component.onDelete).toHaveBeenCalled();
    });
  });

  /**
   * Testing @Output - Edit event
   */
  describe('@Output userEdited', () => {
    it('should emit userEdited event with user when edit button clicked', () => {
      fixture.detectChanges();

      spyOn(component.userEdited, 'emit');
      spyOn(component.userSelected, 'emit');

      const editButton = compiled.querySelector('[data-testid="edit-button"]') as HTMLElement;
      editButton.click();

      // Edit emits the full user object
      expect(component.userEdited.emit).toHaveBeenCalledWith(mockUser);

      // Verify stopPropagation prevented card selection
      expect(component.userSelected.emit).not.toHaveBeenCalled();
    });
  });

  /**
   * Testing methods - getRoleBadgeClass()
   * 
   * Demonstrates testing component methods that affect styling
   */
  describe('getRoleBadgeClass', () => {
    it('should return badge-admin for admin role', () => {
      component.user = { ...mockUser, role: 'admin' };
      expect(component.getRoleBadgeClass()).toBe('badge-admin');
    });

    it('should return badge-user for user role', () => {
      component.user = { ...mockUser, role: 'user' };
      expect(component.getRoleBadgeClass()).toBe('badge-user');
    });

    it('should return badge-default for unknown role', () => {
      component.user = { ...mockUser, role: 'guest' };
      expect(component.getRoleBadgeClass()).toBe('badge-default');
    });

    /**
     * Testing CSS class application
     * 
     * Verify the class is actually applied in the DOM
     */
    it('should apply correct badge class in the template', () => {
      component.user = { ...mockUser, role: 'admin' };
      fixture.detectChanges();

      const badgeElement = compiled.querySelector('[data-testid="user-role"]');
      expect(badgeElement?.classList.contains('badge-admin')).toBeTrue();
    });
  });

  /**
   * Testing template structure
   * 
   * Verify all required elements are present
   */
  describe('Template structure', () => {
    it('should have all required elements', () => {
      fixture.detectChanges();

      expect(compiled.querySelector('.user-card')).toBeTruthy();
      expect(compiled.querySelector('.user-avatar')).toBeTruthy();
      expect(compiled.querySelector('.user-info')).toBeTruthy();
      expect(compiled.querySelector('.user-actions')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="edit-button"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="delete-button"]')).toBeTruthy();
    });

    it('should have proper ARIA labels for accessibility', () => {
      fixture.detectChanges();

      const editButton = compiled.querySelector('[data-testid="edit-button"]');
      const deleteButton = compiled.querySelector('[data-testid="delete-button"]');

      expect(editButton?.getAttribute('aria-label')).toBe('Edit user');
      expect(deleteButton?.getAttribute('aria-label')).toBe('Delete user');
    });
  });

  /**
   * Integration test - Multiple interactions
   * 
   * Test realistic user workflows
   */
  describe('Integration scenarios', () => {
    it('should handle multiple user interactions correctly', () => {
      component.selectable = true;
      fixture.detectChanges();

      // Spy on all events
      spyOn(component.userSelected, 'emit');
      spyOn(component.userEdited, 'emit');
      spyOn(component.userDeleted, 'emit');

      // Click card
      const cardElement = compiled.querySelector('.user-card') as HTMLElement;
      cardElement.click();
      expect(component.userSelected.emit).toHaveBeenCalledTimes(1);

      // Click edit
      const editButton = compiled.querySelector('[data-testid="edit-button"]') as HTMLElement;
      editButton.click();
      expect(component.userEdited.emit).toHaveBeenCalledTimes(1);

      // Card should not have been selected again (stopPropagation)
      expect(component.userSelected.emit).toHaveBeenCalledTimes(1);

      // Click delete
      const deleteButton = compiled.querySelector('[data-testid="delete-button"]') as HTMLElement;
      deleteButton.click();
      expect(component.userDeleted.emit).toHaveBeenCalledTimes(1);
    });
  });
});
