import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * User interface representing the structure of a user object
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

/**
 * UserService - Demonstrates a typical Angular service with HTTP operations
 * 
 * Key concepts demonstrated:
 * 1. Dependency injection of HttpClient
 * 2. CRUD operations (Create, Read, Update, Delete)
 * 3. Observable-based async operations
 * 4. Error handling with RxJS operators
 * 5. Type safety with TypeScript interfaces
 */
@Injectable({
  providedIn: 'root'  // Makes service available application-wide (singleton)
})
export class UserService {
  // API endpoint - in a real app, this would come from environment config
  private apiUrl = 'https://api.example.com/users';

  /**
   * Constructor with HttpClient injection
   * HttpClient is provided by Angular's HttpClientModule
   */
  constructor(private http: HttpClient) {}

  /**
   * Get all users from the API
   * 
   * @returns Observable<User[]> - Stream of user array
   * 
   * Testing considerations:
   * - Verify HTTP GET request is made to correct URL
   * - Test successful response handling
   * - Test error scenarios
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)  // Handle errors consistently
      );
  }

  /**
   * Get a single user by ID
   * 
   * @param id - User ID to retrieve
   * @returns Observable<User> - Stream of single user
   * 
   * Testing considerations:
   * - Verify correct URL with ID parameter
   * - Test with valid and invalid IDs
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create a new user
   * 
   * @param user - User object to create (without ID)
   * @returns Observable<User> - Created user with server-generated ID
   * 
   * Testing considerations:
   * - Verify HTTP POST request with correct body
   * - Verify request headers (Content-Type)
   * - Test validation scenarios
   */
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing user
   * 
   * @param user - Complete user object with ID
   * @returns Observable<User> - Updated user
   * 
   * Testing considerations:
   * - Verify HTTP PUT request with ID in URL
   * - Verify complete user object in request body
   * - Test partial vs. complete updates
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete a user by ID
   * 
   * @param id - User ID to delete
   * @returns Observable<void> - Empty response on success
   * 
   * Testing considerations:
   * - Verify HTTP DELETE request to correct URL
   * - Test successful deletion (204 No Content)
   * - Test deletion of non-existent user (404)
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Centralized error handling
   * 
   * @param error - HTTP error response
   * @returns Observable that emits an error
   * 
   * Testing considerations:
   * - Test different error status codes (404, 500, etc.)
   * - Test error message formatting
   * - Test network errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    
    // Log error to console (in production, send to logging service)
    console.error(errorMessage);
    
    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Helper method to search users by name
   * Demonstrates query parameters
   * 
   * @param searchTerm - Name to search for
   * @returns Observable<User[]> - Filtered users
   */
  searchUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      params: { search: searchTerm }
    }).pipe(
      catchError(this.handleError)
    );
  }
}
