import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../services/user.service';

/**
 * UserFormComponent - A child component for creating/editing users
 * 
 * This component demonstrates:
 * 1. Reactive Forms with FormBuilder
 * 2. Form validation
 * 3. @Input() for edit mode
 * 4. @Output() for form submission
 * 5. OnInit and OnChanges lifecycle hooks
 * 6. External template and styles
 * 
 * Testing focus:
 * - How to test reactive forms
 * - How to test form validation
 * - How to set form values in tests
 * - How to test form submission
 * - How to test lifecycle hooks
 */
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnChanges {
  /**
   * @Input() user - User to edit (optional)
   * If provided, form will be in edit mode
   * If null/undefined, form will be in create mode
   */
  @Input() user: User | null = null;

  /**
   * @Output() userSubmitted - Emitted when form is submitted
   * Emits the form data (may or may not include ID)
   */
  @Output() userSubmitted = new EventEmitter<Partial<User>>();

  /**
   * @Output() cancelled - Emitted when cancel button is clicked
   */
  @Output() cancelled = new EventEmitter<void>();

  /**
   * Reactive form group
   * Defined with FormBuilder for cleaner syntax
   */
  userForm!: FormGroup;

  /**
   * Flag to track if form is in edit mode
   */
  isEditMode = false;

  /**
   * Constructor with FormBuilder injection
   */
  constructor(private fb: FormBuilder) {}

  /**
   * ngOnInit - Initialize the form
   * 
   * This lifecycle hook runs once when component is created
   * Perfect place to set up the form structure
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * ngOnChanges - React to input changes
   * 
   * This hook runs when @Input properties change
   * We use it to populate the form when editing a user
   * 
   * @param changes - Object containing changed properties
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Check if user input changed and form exists
    if (changes['user'] && this.userForm) {
      if (this.user) {
        this.isEditMode = true;
        this.populateForm(this.user);
      } else {
        this.isEditMode = false;
        this.resetForm();
      }
    }
  }

  /**
   * Initialize the reactive form with validation rules
   * 
   * FormBuilder.group() creates a FormGroup with FormControls
   * Each control can have validators
   */
  private initializeForm(): void {
    this.userForm = this.fb.group({
      name: [
        '',  // Initial value
        [
          Validators.required,           // Cannot be empty
          Validators.minLength(2),       // Minimum 2 characters
          Validators.maxLength(50)       // Maximum 50 characters
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email               // Must be valid email format
        ]
      ],
      role: [
        'user',  // Default value
        [Validators.required]
      ]
    });

    // If we're editing, populate the form
    if (this.user) {
      this.isEditMode = true;
      this.populateForm(this.user);
    }
  }

  /**
   * Populate form with user data
   * Used when editing an existing user
   * 
   * @param user - User to populate form with
   */
  private populateForm(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role
    });
  }

  /**
   * Handle form submission
   * 
   * Only submits if form is valid
   * Emits the form data to parent component
   */
  onSubmit(): void {
    // Don't submit if form is invalid
    if (this.userForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.userForm.markAllAsTouched();
      return;
    }

    // Get form values
    const formValue = this.userForm.value;

    // If editing, include the user ID
    const userData: Partial<User> = this.isEditMode && this.user
      ? { id: this.user.id, ...formValue }
      : formValue;

    // Emit the data to parent
    this.userSubmitted.emit(userData);

    // Reset form after submission (for create mode)
    if (!this.isEditMode) {
      this.resetForm();
    }
  }

  /**
   * Handle cancel button click
   */
  onCancel(): void {
    this.cancelled.emit();
    this.resetForm();
  }

  /**
   * Reset the form to initial state
   */
  resetForm(): void {
    this.userForm.reset({
      name: '',
      email: '',
      role: 'user'
    });
    this.isEditMode = false;
  }

  /**
   * Helper methods for template validation display
   * These make it easier to show validation errors in the template
   */

  /**
   * Check if a field has been touched and is invalid
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Get error message for a specific field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    
    if (!field || !field.errors || !field.touched) {
      return '';
    }

    if (field.errors['required']) {
      return `${this.capitalize(fieldName)} is required`;
    }

    if (field.errors['email']) {
      return 'Please enter a valid email address';
    }

    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `${this.capitalize(fieldName)} must be at least ${minLength} characters`;
    }

    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `${this.capitalize(fieldName)} must be less than ${maxLength} characters`;
    }

    return 'Invalid field';
  }

  /**
   * Capitalize first letter of a string
   */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Get submit button text based on mode
   */
  getSubmitButtonText(): string {
    return this.isEditMode ? 'Update User' : 'Create User';
  }
}
