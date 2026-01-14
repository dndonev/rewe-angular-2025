import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

/**
 * UserService Test Suite
 * 
 * This test suite demonstrates:
 * 1. How to test Angular services
 * 2. How to mock HTTP requests using HttpClientTestingModule
 * 3. How to verify HTTP requests with HttpTestingController
 * 4. How to test error handling
 * 5. How to test observables
 * 
 * Key Testing Concepts:
 * - TestBed: Angular's testing utility for configuring test modules
 * - HttpClientTestingModule: Provides mock HttpClient
 * - HttpTestingController: Tool to verify and flush HTTP requests
 * - beforeEach: Setup that runs before each test
 * - afterEach: Cleanup that runs after each test
 */
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  // Mock data to use in tests
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
  ];

  const mockUser: User = mockUsers[0];

  /**
   * beforeEach - Setup before each test
   * 
   * This runs before EVERY test in this suite.
   * We configure the testing module with necessary imports and providers.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      // HttpClientTestingModule provides a mock HttpClient
      // This prevents actual HTTP requests during testing
      imports: [HttpClientTestingModule],
      // Service is automatically provided because it has providedIn: 'root'
      providers: [UserService]
    });

    // Inject the service and HTTP mock controller
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  /**
   * afterEach - Cleanup after each test
   * 
   * Verify that no outstanding HTTP requests remain.
   * This ensures tests don't have side effects on each other.
   */
  afterEach(() => {
    // Fail the test if there are outstanding HTTP requests
    httpMock.verify();
  });

  /**
   * Basic test - Service creation
   * 
   * This verifies the service can be created and injected properly.
   * It's a sanity check that the service is configured correctly.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Testing GET request - getUsers()
   * 
   * This test demonstrates:
   * 1. How to subscribe to an observable
   * 2. How to use HttpTestingController to intercept requests
   * 3. How to verify the HTTP method and URL
   * 4. How to flush mock data to the observable
   * 5. How to assert the received data
   */
  describe('getUsers', () => {
    it('should return an array of users', () => {
      // ARRANGE: Set up the expected result
      // We'll verify this in the subscribe callback
      
      // ACT: Call the service method
      service.getUsers().subscribe(users => {
        // ASSERT: Verify the returned data
        expect(users).toEqual(mockUsers);
        expect(users.length).toBe(3);
        expect(users[0].name).toBe('John Doe');
      });

      // Intercept the HTTP request
      // expectOne() fails if 0 or >1 requests match
      const req = httpMock.expectOne('https://api.example.com/users');
      
      // ASSERT: Verify the request details
      expect(req.request.method).toBe('GET');
      
      // Respond with mock data
      // This triggers the subscribe callback above
      req.flush(mockUsers);
    });

    /**
     * Testing error handling
     * 
     * This demonstrates how to test error scenarios.
     * We simulate a server error and verify the error handling.
     */
    it('should handle HTTP error gracefully', () => {
      // Prepare error message
      const errorMessage = 'Server Error: 500 - Http failure response for https://api.example.com/users: 500 Server Error';
      
      // Subscribe and expect an error
      service.getUsers().subscribe({
        next: () => fail('Should have failed with 500 error'),
        error: (error) => {
          // Verify error message contains expected text
          expect(error.message).toContain('Server Error: 500');
        }
      });

      // Simulate server error
      const req = httpMock.expectOne('https://api.example.com/users');
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
    });
  });

  /**
   * Testing GET request with parameter - getUserById()
   * 
   * Demonstrates testing URL parameters
   */
  describe('getUserById', () => {
    it('should return a single user by ID', () => {
      const userId = 1;

      // Call service method
      service.getUserById(userId).subscribe(user => {
        expect(user).toEqual(mockUser);
        expect(user.id).toBe(userId);
        expect(user.name).toBe('John Doe');
      });

      // Verify the request URL includes the ID
      const req = httpMock.expectOne(`https://api.example.com/users/${userId}`);
      expect(req.request.method).toBe('GET');
      
      req.flush(mockUser);
    });

    it('should handle 404 error when user not found', () => {
      const userId = 999;

      service.getUserById(userId).subscribe({
        next: () => fail('Should have failed with 404 error'),
        error: (error) => {
          expect(error.message).toContain('Server Error: 404');
        }
      });

      const req = httpMock.expectOne(`https://api.example.com/users/${userId}`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  /**
   * Testing POST request - createUser()
   * 
   * Demonstrates:
   * 1. Testing HTTP POST
   * 2. Verifying request body
   * 3. Testing data transformation
   */
  describe('createUser', () => {
    it('should create a new user and return it with ID', () => {
      // New user without ID (server generates it)
      const newUser = { name: 'New User', email: 'new@example.com', role: 'user' };
      const createdUser: User = { id: 4, ...newUser };

      service.createUser(newUser).subscribe(user => {
        expect(user).toEqual(createdUser);
        expect(user.id).toBe(4);
        expect(user.name).toBe('New User');
      });

      const req = httpMock.expectOne('https://api.example.com/users');
      
      // Verify it's a POST request
      expect(req.request.method).toBe('POST');
      
      // Verify the request body matches what we sent
      expect(req.request.body).toEqual(newUser);
      
      // Verify headers (optional but good practice)
      // Angular automatically sets Content-Type for JSON
      
      // Simulate server response with generated ID
      req.flush(createdUser);
    });

    it('should handle validation errors', () => {
      const invalidUser = { name: '', email: 'invalid', role: 'user' };

      service.createUser(invalidUser).subscribe({
        next: () => fail('Should have failed with validation error'),
        error: (error) => {
          expect(error.message).toContain('Server Error: 400');
        }
      });

      const req = httpMock.expectOne('https://api.example.com/users');
      req.flush('Validation failed', { status: 400, statusText: 'Bad Request' });
    });
  });

  /**
   * Testing PUT request - updateUser()
   * 
   * Demonstrates testing update operations
   */
  describe('updateUser', () => {
    it('should update an existing user', () => {
      const updatedUser: User = { 
        id: 1, 
        name: 'John Updated', 
        email: 'john.updated@example.com', 
        role: 'admin' 
      };

      service.updateUser(updatedUser).subscribe(user => {
        expect(user).toEqual(updatedUser);
        expect(user.name).toBe('John Updated');
      });

      // Verify URL includes the user ID
      const req = httpMock.expectOne(`https://api.example.com/users/${updatedUser.id}`);
      
      // Verify it's a PUT request
      expect(req.request.method).toBe('PUT');
      
      // Verify the complete user object is sent
      expect(req.request.body).toEqual(updatedUser);
      
      req.flush(updatedUser);
    });

    it('should handle errors when updating non-existent user', () => {
      const nonExistentUser: User = { 
        id: 999, 
        name: 'Ghost User', 
        email: 'ghost@example.com', 
        role: 'user' 
      };

      service.updateUser(nonExistentUser).subscribe({
        next: () => fail('Should have failed with 404 error'),
        error: (error) => {
          expect(error.message).toContain('Server Error: 404');
        }
      });

      const req = httpMock.expectOne(`https://api.example.com/users/${nonExistentUser.id}`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  /**
   * Testing DELETE request - deleteUser()
   * 
   * Demonstrates testing delete operations
   */
  describe('deleteUser', () => {
    it('should delete a user successfully', () => {
      const userId = 1;

      service.deleteUser(userId).subscribe(response => {
        // DELETE typically returns void/null
        // HttpTestingController returns null when flushing null
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`https://api.example.com/users/${userId}`);
      
      // Verify it's a DELETE request
      expect(req.request.method).toBe('DELETE');
      
      // Simulate successful deletion (204 No Content)
      req.flush(null);
    });

    it('should handle errors when deleting non-existent user', () => {
      const userId = 999;

      service.deleteUser(userId).subscribe({
        next: () => fail('Should have failed with 404 error'),
        error: (error) => {
          expect(error.message).toContain('Server Error: 404');
        }
      });

      const req = httpMock.expectOne(`https://api.example.com/users/${userId}`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  /**
   * Testing GET request with query parameters - searchUsers()
   * 
   * Demonstrates testing requests with query parameters
   */
  describe('searchUsers', () => {
    it('should search users by name with query parameter', () => {
      const searchTerm = 'John';
      const searchResults = [mockUsers[0]]; // Only John Doe

      service.searchUsers(searchTerm).subscribe(users => {
        expect(users).toEqual(searchResults);
        expect(users.length).toBe(1);
        expect(users[0].name).toContain('John');
      });

      // Verify the request includes query parameters
      const req = httpMock.expectOne(
        req => req.url === 'https://api.example.com/users' && req.params.has('search')
      );
      
      expect(req.request.method).toBe('GET');
      
      // Verify the query parameter value
      expect(req.request.params.get('search')).toBe(searchTerm);
      
      req.flush(searchResults);
    });

    it('should return empty array when no users match search', () => {
      const searchTerm = 'NonExistent';

      service.searchUsers(searchTerm).subscribe(users => {
        expect(users).toEqual([]);
        expect(users.length).toBe(0);
      });

      const req = httpMock.expectOne(
        req => req.url === 'https://api.example.com/users' && req.params.has('search')
      );
      
      req.flush([]);
    });
  });

  /**
   * Testing error handling - network errors
   * 
   * Demonstrates testing client-side errors (network issues)
   */
  describe('Error Handling', () => {
    it('should handle network errors', () => {
      service.getUsers().subscribe({
        next: () => fail('Should have failed with network error'),
        error: (error) => {
          // In test environment, network errors show as status 0
          expect(error.message).toContain('Server Error: 0');
        }
      });

      const req = httpMock.expectOne('https://api.example.com/users');
      
      // Simulate network error
      req.error(new ProgressEvent('Network error'), {
        status: 0,
        statusText: 'Network Error'
      });
    });
  });
});
