import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user.service';

/**
 * UserCardComponent - A child component that displays user information
 * 
 * This component demonstrates:
 * 1. @Input() - Receiving data from parent component
 * 2. @Output() - Emitting events to parent component
 * 3. External template (HTML file)
 * 4. External styles (SCSS file)
 * 5. Event handling
 * 
 * Testing focus:
 * - How to set @Input values in tests
 * - How to spy on @Output event emitters
 * - How to test DOM rendering
 * - How to simulate user interactions
 */
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  /**
   * @Input() user - User data passed from parent component
   * 
   * The ! (definite assignment assertion) tells TypeScript this will be set
   * In tests, we need to explicitly set this property
   */
  @Input() user!: User;

  /**
   * @Input() selectable - Whether the card can be selected
   * Default value is false
   */
  @Input() selectable: boolean = false;

  /**
   * @Output() userSelected - Event emitted when user is selected
   * 
   * EventEmitter creates an observable that the parent can subscribe to
   * In tests, we can spy on this to verify events are emitted
   */
  @Output() userSelected = new EventEmitter<User>();

  /**
   * @Output() userDeleted - Event emitted when delete button is clicked
   * 
   * This demonstrates passing data with events
   */
  @Output() userDeleted = new EventEmitter<number>();

  /**
   * @Output() userEdited - Event emitted when edit button is clicked
   */
  @Output() userEdited = new EventEmitter<User>();

  /**
   * Handle card click - Select the user
   * 
   * This method is called when the card is clicked
   * Only emits if selectable is true
   */
  onCardClick(): void {
    if (this.selectable) {
      this.userSelected.emit(this.user);
    }
  }

  /**
   * Handle edit button click
   * 
   * Emits the current user for editing
   * Uses event.stopPropagation() to prevent card click
   */
  onEdit(event: Event): void {
    event.stopPropagation(); // Prevent card click event
    this.userEdited.emit(this.user);
  }

  /**
   * Handle delete button click
   * 
   * Emits only the user ID for deletion
   * Parent component handles the actual deletion
   */
  onDelete(event: Event): void {
    event.stopPropagation(); // Prevent card click event
    this.userDeleted.emit(this.user.id);
  }

  /**
   * Get role badge color based on user role
   * 
   * This is a helper method for styling
   * In tests, we can verify the correct class is applied
   */
  getRoleBadgeClass(): string {
    switch (this.user.role) {
      case 'admin':
        return 'badge-admin';
      case 'user':
        return 'badge-user';
      default:
        return 'badge-default';
    }
  }
}
