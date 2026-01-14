import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { User } from '../../services/user.service';
import { SimpleChange } from '@angular/core';

/**
 * UserFormComponent Test Suite
 * 
 * This test suite demonstrates:
 * 1. Testing reactive forms
 * 2. Testing form validation
 * 3. Testing form submission
 * 4. Testing @Input/@Output with forms
 * 5. Testing lifecycle hooks (ngOnInit, ngOnChanges)
 * 6. Testing form error messages
 * 
 * Key Testing Concepts:
 * - ReactiveFormsModule: Required for testing reactive forms
 * - form.setValue() / form.patchValue(): Set form values programmatically
 * - form.valid / form.invalid: Check form validation state
 * - form.get('fieldName'): Access individual form controls
 * - markAllAsTouched(): Trigger validation display
 */
describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let compiled: HTMLElement;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  };

  /**
   * beforeEach - Setup before each test
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserFormComponent,
        ReactiveFormsModule  // Required for reactive forms
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    
    // Trigger ngOnInit
    fixture.detectChanges();
  });

  /**
   * Basic test - Component creation
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Testing ngOnInit - Form initialization
   */
  describe('ngOnInit', () => {
    it('should initialize the form with empty values', () => {
      expect(component.userForm).toBeDefined();
      expect(component.userForm.get('name')?.value).toBe('');
      expect(component.userForm.get('email')?.value).toBe('');
      expect(component.userForm.get('role')?.value).toBe('user'); // Default value
    });

    it('should set isEditMode to false initially', () => {
      expect(component.isEditMode).toBeFalse();
    });
  });

  /**
   * Testing Form Structure
   */
  describe('Form structure', () => {
    it('should have all required form controls', () => {
      expect(component.userForm.contains('name')).toBeTrue();
      expect(component.userForm.contains('email')).toBeTrue();
      expect(component.userForm.contains('role')).toBeTrue();
    });

    it('should render all form fields in template', () => {
      expect(compiled.querySelector('[data-testid="name-input"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="email-input"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="role-select"]')).toBeTruthy();
    });

    it('should render submit and cancel buttons', () => {
      expect(compiled.querySelector('[data-testid="submit-button"]')).toBeTruthy();
      expect(compiled.querySelector('[data-testid="cancel-button"]')).toBeTruthy();
    });
  });

  /**
   * Testing Form Validation - Name field
   */
  describe('Name field validation', () => {
    it('should be invalid when empty', () => {
      const nameControl = component.userForm.get('name');
      
      nameControl?.setValue('');
      nameControl?.markAsTouched();

      expect(nameControl?.invalid).toBeTrue();
      expect(nameControl?.errors?.['required']).toBeTruthy();
    });

    it('should be invalid when less than 2 characters', () => {
      const nameControl = component.userForm.get('name');
      
      nameControl?.setValue('A');
      nameControl?.markAsTouched();

      expect(nameControl?.invalid).toBeTrue();
      expect(nameControl?.errors?.['minlength']).toBeTruthy();
    });

    it('should be invalid when more than 50 characters', () => {
      const nameControl = component.userForm.get('name');
      
      // Create a string with 51 characters
      nameControl?.setValue('A'.repeat(51));
      nameControl?.markAsTouched();

      expect(nameControl?.invalid).toBeTrue();
      expect(nameControl?.errors?.['maxlength']).toBeTruthy();
    });

    it('should be valid with correct input', () => {
      const nameControl = component.userForm.get('name');
      
      nameControl?.setValue('John Doe');

      expect(nameControl?.valid).toBeTrue();
      expect(nameControl?.errors).toBeNull();
    });

    /**
     * Testing error message display
     */
    it('should display error message when name is invalid and touched', () => {
      const nameControl = component.userForm.get('name');
      
      nameControl?.setValue('');
      nameControl?.markAsTouched();
      fixture.detectChanges();

      const errorElement = compiled.querySelector('[data-testid="name-error"]');
      expect(errorElement).toBeTruthy();
      expect(errorElement?.textContent).toContain('Name is required');
    });

    it('should not display error message when name is invalid but not touched', () => {
      const nameControl = component.userForm.get('name');
      
      nameControl?.setValue('');
      // Don't mark as touched
      fixture.detectChanges();

      const errorElement = compiled.querySelector('[data-testid="name-error"]');
      expect(errorElement).toBeFalsy();
    });
  });

  /**
   * Testing Form Validation - Email field
   */
  describe('Email field validation', () => {
    it('should be invalid when empty', () => {
      const emailControl = component.userForm.get('email');
      
      emailControl?.setValue('');
      emailControl?.markAsTouched();

      expect(emailControl?.invalid).toBeTrue();
      expect(emailControl?.errors?.['required']).toBeTruthy();
    });

    it('should be invalid with incorrect email format', () => {
      const emailControl = component.userForm.get('email');
      
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();

      expect(emailControl?.invalid).toBeTrue();
      expect(emailControl?.errors?.['email']).toBeTruthy();
    });

    it('should be valid with correct email format', () => {
      const emailControl = component.userForm.get('email');
      
      emailControl?.setValue('test@example.com');

      expect(emailControl?.valid).toBeTrue();
      expect(emailControl?.errors).toBeNull();
    });

    it('should display email validation error message', () => {
      const emailControl = component.userForm.get('email');
      
      emailControl?.setValue('invalid');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      const errorElement = compiled.querySelector('[data-testid="email-error"]');
      expect(errorElement?.textContent).toContain('valid email');
    });
  });

  /**
   * Testing Form Validation - Role field
   */
  describe('Role field validation', () => {
    it('should have default value of "user"', () => {
      const roleControl = component.userForm.get('role');
      expect(roleControl?.value).toBe('user');
    });

    it('should accept "admin" value', () => {
      const roleControl = component.userForm.get('role');
      
      roleControl?.setValue('admin');

      expect(roleControl?.valid).toBeTrue();
      expect(roleControl?.value).toBe('admin');
    });
  });

  /**
   * Testing Overall Form Validation
   */
  describe('Form validation', () => {
    it('should be invalid when fields are empty', () => {
      expect(component.userForm.invalid).toBeTrue();
    });

    it('should be valid when all fields are filled correctly', () => {
      component.userForm.setValue({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      });

      expect(component.userForm.valid).toBeTrue();
    });

    it('should disable submit button when form is invalid', () => {
      fixture.detectChanges();

      const submitButton = compiled.querySelector('[data-testid="submit-button"]') as HTMLButtonElement;
      expect(submitButton.disabled).toBeTrue();
    });

    it('should enable submit button when form is valid', () => {
      component.userForm.setValue({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      });
      fixture.detectChanges();

      const submitButton = compiled.querySelector('[data-testid="submit-button"]') as HTMLButtonElement;
      expect(submitButton.disabled).toBeFalse();
    });
  });

  /**
   * Testing Form Submission
   */
  describe('Form submission', () => {
    it('should emit userSubmitted event with form data when valid', () => {
      // Spy on the output event
      spyOn(component.userSubmitted, 'emit');

      // Fill the form
      component.userForm.setValue({
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin'
      });

      // Submit the form
      component.onSubmit();

      // Verify the event was emitted with correct data
      expect(component.userSubmitted.emit).toHaveBeenCalledWith({
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin'
      });
    });

    it('should not emit event when form is invalid', () => {
      spyOn(component.userSubmitted, 'emit');

      // Leave form invalid (empty)
      component.onSubmit();

      // Event should not be emitted
      expect(component.userSubmitted.emit).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when submitting invalid form', () => {
      // Submit invalid form
      component.onSubmit();

      // All fields should be marked as touched
      expect(component.userForm.get('name')?.touched).toBeTrue();
      expect(component.userForm.get('email')?.touched).toBeTrue();
      expect(component.userForm.get('role')?.touched).toBeTrue();
    });

    it('should reset form after successful submission in create mode', () => {
      component.isEditMode = false;
      
      component.userForm.setValue({
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      });

      component.onSubmit();

      // Form should be reset
      expect(component.userForm.get('name')?.value).toBe('');
      expect(component.userForm.get('email')?.value).toBe('');
      expect(component.userForm.get('role')?.value).toBe('user');
    });

    it('should not reset form after submission in edit mode', () => {
      component.isEditMode = true;
      component.user = mockUser;
      
      component.userForm.setValue({
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin'
      });

      component.onSubmit();

      // Form should NOT be reset
      expect(component.userForm.get('name')?.value).toBe('Updated Name');
    });

    /**
     * Testing form submission via template
     */
    it('should submit form when submit button is clicked', () => {
      spyOn(component, 'onSubmit');

      // Make form valid
      component.userForm.setValue({
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      });
      fixture.detectChanges();

      // Click submit button
      const submitButton = compiled.querySelector('[data-testid="submit-button"]') as HTMLElement;
      submitButton.click();

      expect(component.onSubmit).toHaveBeenCalled();
    });
  });

  /**
   * Testing Cancel Functionality
   */
  describe('Cancel functionality', () => {
    it('should emit cancelled event when cancel button clicked', () => {
      spyOn(component.cancelled, 'emit');

      component.onCancel();

      expect(component.cancelled.emit).toHaveBeenCalled();
    });

    it('should reset form when cancel button clicked', () => {
      component.userForm.setValue({
        name: 'Test',
        email: 'test@example.com',
        role: 'admin'
      });

      component.onCancel();

      expect(component.userForm.get('name')?.value).toBe('');
      expect(component.userForm.get('email')?.value).toBe('');
      expect(component.userForm.get('role')?.value).toBe('user');
    });
  });

  /**
   * Testing @Input - Edit Mode
   */
  describe('Edit mode (@Input user)', () => {
    it('should populate form when user input is provided', () => {
      component.user = mockUser;
      component.ngOnChanges({
        user: new SimpleChange(null, mockUser, true)
      });

      expect(component.userForm.get('name')?.value).toBe('John Doe');
      expect(component.userForm.get('email')?.value).toBe('john@example.com');
      expect(component.userForm.get('role')?.value).toBe('admin');
    });

    it('should set isEditMode to true when user is provided', () => {
      component.user = mockUser;
      component.ngOnChanges({
        user: new SimpleChange(null, mockUser, true)
      });

      expect(component.isEditMode).toBeTrue();
    });

    it('should include user ID in emitted data when in edit mode', () => {
      spyOn(component.userSubmitted, 'emit');

      component.user = mockUser;
      component.isEditMode = true;

      component.userForm.setValue({
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin'
      });

      component.onSubmit();

      expect(component.userSubmitted.emit).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin'
      });
    });

    it('should display "Edit User" title in edit mode', () => {
      component.isEditMode = true;
      fixture.detectChanges();

      const titleElement = compiled.querySelector('.form-title');
      expect(titleElement?.textContent).toContain('Edit User');
    });

    it('should display "Create New User" title in create mode', () => {
      component.isEditMode = false;
      fixture.detectChanges();

      const titleElement = compiled.querySelector('.form-title');
      expect(titleElement?.textContent).toContain('Create New User');
    });

    it('should display "Update User" on submit button in edit mode', () => {
      component.isEditMode = true;
      fixture.detectChanges();

      const submitButton = compiled.querySelector('[data-testid="submit-button"]');
      expect(submitButton?.textContent?.trim()).toBe('Update User');
    });

    it('should display "Create User" on submit button in create mode', () => {
      component.isEditMode = false;
      fixture.detectChanges();

      const submitButton = compiled.querySelector('[data-testid="submit-button"]');
      expect(submitButton?.textContent?.trim()).toBe('Create User');
    });
  });

  /**
   * Testing Helper Methods
   */
  describe('Helper methods', () => {
    describe('isFieldInvalid', () => {
      it('should return true for invalid touched field', () => {
        const nameControl = component.userForm.get('name');
        nameControl?.setValue('');
        nameControl?.markAsTouched();

        expect(component.isFieldInvalid('name')).toBeTrue();
      });

      it('should return false for valid field', () => {
        const nameControl = component.userForm.get('name');
        nameControl?.setValue('Valid Name');
        nameControl?.markAsTouched();

        expect(component.isFieldInvalid('name')).toBeFalse();
      });

      it('should return false for invalid untouched field', () => {
        const nameControl = component.userForm.get('name');
        nameControl?.setValue('');
        // Don't touch the field

        expect(component.isFieldInvalid('name')).toBeFalse();
      });
    });

    describe('getErrorMessage', () => {
      it('should return required error message', () => {
        const nameControl = component.userForm.get('name');
        nameControl?.setValue('');
        nameControl?.markAsTouched();

        expect(component.getErrorMessage('name')).toBe('Name is required');
      });

      it('should return email error message', () => {
        const emailControl = component.userForm.get('email');
        emailControl?.setValue('invalid');
        emailControl?.markAsTouched();

        expect(component.getErrorMessage('email')).toContain('valid email');
      });

      it('should return minlength error message', () => {
        const nameControl = component.userForm.get('name');
        nameControl?.setValue('A');
        nameControl?.markAsTouched();

        expect(component.getErrorMessage('name')).toContain('at least 2 characters');
      });

      it('should return empty string for valid field', () => {
        const nameControl = component.userForm.get('name');
        nameControl?.setValue('Valid Name');

        expect(component.getErrorMessage('name')).toBe('');
      });
    });

    describe('getSubmitButtonText', () => {
      it('should return "Update User" in edit mode', () => {
        component.isEditMode = true;
        expect(component.getSubmitButtonText()).toBe('Update User');
      });

      it('should return "Create User" in create mode', () => {
        component.isEditMode = false;
        expect(component.getSubmitButtonText()).toBe('Create User');
      });
    });
  });

  /**
   * Integration Test - Complete user flow
   */
  describe('Integration - Complete user creation flow', () => {
    it('should complete full create user workflow', () => {
      let submittedData: any;
      
      // Subscribe to output
      component.userSubmitted.subscribe(data => {
        submittedData = data;
      });

      // Fill out form
      const nameInput = compiled.querySelector('[data-testid="name-input"]') as HTMLInputElement;
      const emailInput = compiled.querySelector('[data-testid="email-input"]') as HTMLInputElement;
      const roleSelect = compiled.querySelector('[data-testid="role-select"]') as HTMLSelectElement;

      nameInput.value = 'New User';
      nameInput.dispatchEvent(new Event('input'));
      component.userForm.get('name')?.setValue('New User');

      emailInput.value = 'new@example.com';
      emailInput.dispatchEvent(new Event('input'));
      component.userForm.get('email')?.setValue('new@example.com');

      roleSelect.value = 'admin';
      roleSelect.dispatchEvent(new Event('change'));
      component.userForm.get('role')?.setValue('admin');

      fixture.detectChanges();

      // Submit form
      component.onSubmit();

      // Verify submission
      expect(submittedData).toEqual({
        name: 'New User',
        email: 'new@example.com',
        role: 'admin'
      });

      // Form should be reset
      expect(component.userForm.get('name')?.value).toBe('');
    });
  });
});
