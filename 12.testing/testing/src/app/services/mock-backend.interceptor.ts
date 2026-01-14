import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './user.service';

/**
 * Mock Backend Interceptor
 * 
 * This interceptor provides a fake backend for the tutorial app
 * so it can run without a real API server.
 * 
 * In a real application, you would remove this and connect to a real backend.
 */

// In-memory data store
let mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'user' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'user' }
];

let nextId = 5;

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;

  // Only intercept requests to our mock API
  if (!url.includes('api.example.com/users')) {
    return next(req);
  }

  // Handle different HTTP methods
  switch (method) {
    case 'GET':
      return handleGet(url);
    
    case 'POST':
      return handlePost(body);
    
    case 'PUT':
      return handlePut(url, body);
    
    case 'DELETE':
      return handleDelete(url);
    
    default:
      return next(req);
  }
};

/**
 * Handle GET requests
 */
function handleGet(url: string) {
  // Get all users
  if (url.endsWith('/users')) {
    return of(new HttpResponse({ status: 200, body: mockUsers }))
      .pipe(delay(300)); // Simulate network delay
  }

  // Get single user by ID
  const idMatch = url.match(/\/users\/(\d+)$/);
  if (idMatch) {
    const id = parseInt(idMatch[1], 10);
    const user = mockUsers.find(u => u.id === id);
    
    if (user) {
      return of(new HttpResponse({ status: 200, body: user }))
        .pipe(delay(200));
    } else {
      return throwError(() => ({
        status: 404,
        statusText: 'Not Found',
        error: 'User not found'
      })).pipe(delay(200));
    }
  }

  // Search users
  const searchMatch = url.match(/\?search=(.+)$/);
  if (searchMatch) {
    const searchTerm = decodeURIComponent(searchMatch[1]);
    const results = mockUsers.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(new HttpResponse({ status: 200, body: results }))
      .pipe(delay(200));
  }

  return of(new HttpResponse({ status: 200, body: mockUsers }))
    .pipe(delay(300));
}

/**
 * Handle POST requests (create user)
 */
function handlePost(body: any) {
  const newUser: User = {
    id: nextId++,
    name: body.name,
    email: body.email,
    role: body.role
  };

  mockUsers.push(newUser);

  return of(new HttpResponse({ status: 201, body: newUser }))
    .pipe(delay(300));
}

/**
 * Handle PUT requests (update user)
 */
function handlePut(url: string, body: any) {
  const idMatch = url.match(/\/users\/(\d+)$/);
  
  if (idMatch) {
    const id = parseInt(idMatch[1], 10);
    const index = mockUsers.findIndex(u => u.id === id);
    
    if (index !== -1) {
      mockUsers[index] = { ...body, id };
      return of(new HttpResponse({ status: 200, body: mockUsers[index] }))
        .pipe(delay(300));
    } else {
      return throwError(() => ({
        status: 404,
        statusText: 'Not Found',
        error: 'User not found'
      })).pipe(delay(200));
    }
  }

  return throwError(() => ({
    status: 400,
    statusText: 'Bad Request'
  }));
}

/**
 * Handle DELETE requests
 */
function handleDelete(url: string) {
  const idMatch = url.match(/\/users\/(\d+)$/);
  
  if (idMatch) {
    const id = parseInt(idMatch[1], 10);
    const index = mockUsers.findIndex(u => u.id === id);
    
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return of(new HttpResponse({ status: 204, body: null }))
        .pipe(delay(300));
    } else {
      return throwError(() => ({
        status: 404,
        statusText: 'Not Found',
        error: 'User not found'
      })).pipe(delay(200));
    }
  }

  return throwError(() => ({
    status: 400,
    statusText: 'Bad Request'
  }));
}
