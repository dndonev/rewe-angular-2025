# Angular Testing Tutorial

A comprehensive tutorial demonstrating Angular testing best practices with Jasmine and Karma.

## 📚 What You'll Learn

This tutorial covers:
- ✅ **Service Testing** - Testing Angular services with HTTP calls and dependency injection
- ✅ **Component Testing** - Testing components with external templates and styles
- ✅ **Nested Components** - Testing parent-child component interactions
- ✅ **Input/Output Testing** - Testing @Input and @Output decorators
- ✅ **Template Testing** - Testing DOM elements and user interactions
- ✅ **Mocking** - Using spies and mocks for dependencies
- ✅ **Async Testing** - Testing observables and promises

## 🏗️ Project Structure

```
src/app/
├── services/
│   ├── user.service.ts              # Service with HTTP operations
│   ├── user.service.spec.ts         # Service tests
│   └── mock-backend.interceptor.ts  # Mock API for development (no real backend needed)
├── components/
│   ├── user-list/
│   │   ├── user-list.component.ts   # Parent component
│   │   ├── user-list.component.html # External template
│   │   ├── user-list.component.scss # External styles
│   │   └── user-list.component.spec.ts # Parent component tests
│   ├── user-card/
│   │   ├── user-card.component.ts   # Child component (displays user)
│   │   ├── user-card.component.html
│   │   ├── user-card.component.scss
│   │   └── user-card.component.spec.ts # Child component tests
│   └── user-form/
│       ├── user-form.component.ts   # Child component (form)
│       ├── user-form.component.html
│       ├── user-form.component.scss
│       └── user-form.component.spec.ts # Child component tests
```

## 🧪 Testing Concepts Demonstrated

### 1. Service Testing (`user.service.spec.ts`)
- **HttpClient mocking** with `HttpClientTestingModule`
- **Testing HTTP GET/POST/PUT/DELETE** operations
- **Verifying HTTP requests** with `HttpTestingController`
- **Error handling** in services
- **Observable testing** with subscriptions

### 2. Child Component Testing

#### UserCardComponent (`user-card.component.spec.ts`)
- Testing **@Input()** properties
- Testing **@Output()** event emitters
- Testing **DOM rendering** with component data
- Testing **user interactions** (button clicks)
- **Template binding** verification

#### UserFormComponent (`user-form.component.spec.ts`)
- Testing **reactive forms**
- Testing **form validation**
- Testing **form submission**
- Testing **two-way data binding**
- Testing **@Output()** events with form data

### 3. Parent Component Testing (`user-list.component.spec.ts`)
- Testing **service injection**
- Testing **component lifecycle** (ngOnInit)
- Testing **async operations** with observables
- Testing **nested components** interaction
- Testing **data flow** from parent to children
- Using **component stubs** vs real child components

---

## 📖 Testing Terminology Guide

### Core Testing Concepts

#### **TestBed**
`TestBed` is Angular's primary API for configuring and creating components in tests. Think of it as a test module that mimics how Angular bootstraps your application.

```typescript
TestBed.configureTestingModule({
  imports: [MyComponent],           // Components/modules to test
  providers: [MyService]            // Services to provide
});
```

**Key Methods:**
- `configureTestingModule()` - Sets up the testing module with imports and providers
- `createComponent()` - Creates a component instance for testing
- `compileComponents()` - Compiles components (needed for external templates)

#### **ComponentFixture**
A `ComponentFixture` is a test harness for interacting with the created component and its template.

```typescript
const fixture = TestBed.createComponent(MyComponent);
```

**Key Properties:**
- `componentInstance` - The actual component instance (access properties and methods)
- `nativeElement` - The native DOM element
- `debugElement` - Angular's wrapper around the native element with additional utilities

**Key Methods:**
- `detectChanges()` - Triggers change detection (updates the DOM)
- `whenStable()` - Returns a promise that resolves when all async operations complete

#### **NativeElement**
The actual DOM element rendered by the component. Use standard DOM APIs to query and interact with it.

```typescript
const compiled = fixture.nativeElement as HTMLElement;
const button = compiled.querySelector('button');  // Standard DOM query
```

**When to use:**
- Simple DOM queries using `querySelector()`, `querySelectorAll()`
- Reading `textContent`, `innerHTML`
- Checking element properties

#### **DebugElement**
Angular's wrapper around DOM elements that provides additional testing utilities and works across different platforms.

```typescript
const debugElement = fixture.debugElement;
const button = debugElement.query(By.css('button'));  // Angular query
```

**Key Methods:**
- `query(By.css('selector'))` - Find single element
- `queryAll(By.css('selector'))` - Find multiple elements
- `triggerEventHandler()` - Trigger events programmatically
- `nativeElement` - Access the underlying native element

**When to use:**
- Testing directives
- Platform-independent tests
- When you need `By.css()` or `By.directive()` selectors

#### **Jasmine describe() and it()**
Jasmine's core functions for organizing tests.

```typescript
describe('ComponentName', () => {           // Test suite
  it('should do something', () => {         // Individual test (spec)
    expect(result).toBe(expected);          // Assertion
  });
});
```

- **describe()** - Groups related tests into a test suite
- **it()** - Defines a single test specification
- **expect()** - Creates an assertion

#### **beforeEach() and afterEach()**
Setup and teardown functions that run before/after each test.

```typescript
beforeEach(() => {
  // Runs before each test in this describe block
  // Set up test data, configure TestBed
});

afterEach(() => {
  // Runs after each test
  // Clean up resources
});
```

#### **Spies and Mocks**
Jasmine spies let you track function calls and control return values without executing the real implementation.

```typescript
// Create a spy object
const mockService = jasmine.createSpyObj('MyService', ['getData']);

// Set return value
mockService.getData.and.returnValue(of([1, 2, 3]));

// Verify it was called
expect(mockService.getData).toHaveBeenCalled();
expect(mockService.getData).toHaveBeenCalledWith('param');
```

**Key Spy Methods:**
- `and.returnValue()` - Return a specific value
- `and.throwError()` - Throw an error
- `and.callFake()` - Execute a custom function
- `toHaveBeenCalled()` - Check if spy was called
- `toHaveBeenCalledWith()` - Check call arguments

#### **detectChanges()**
Manually triggers Angular's change detection to update the DOM.

```typescript
component.title = 'New Title';   // Change component property
fixture.detectChanges();         // Update the DOM
// Now the DOM reflects the new title
```

**When to call:**
- After changing component properties
- After triggering events
- When you want to see DOM updates

#### **Async Testing Utilities**

##### **fakeAsync() and tick()**
Control asynchronous operations synchronously for easier testing.

```typescript
it('should handle async', fakeAsync(() => {
  component.loadData();        // Starts async operation
  tick(500);                   // Advance virtual time by 500ms
  expect(component.data).toBeTruthy();
}));
```

- `fakeAsync()` - Wraps test in a special zone that makes async code synchronous
- `tick(ms)` - Advances virtual time (simulates waiting)
- `flush()` - Advances time until all pending tasks complete

##### **async() and whenStable()**
Alternative approach using promises.

```typescript
it('should handle async', async(() => {
  component.loadData();
  fixture.whenStable().then(() => {
    expect(component.data).toBeTruthy();
  });
}));
```

#### **HttpClientTestingModule**
Mock HTTP backend for testing services that make HTTP requests.

```typescript
TestBed.configureTestingModule({
  imports: [HttpClientTestingModule]
});

const httpMock = TestBed.inject(HttpTestingController);

// Make request in test
service.getUsers().subscribe();

// Intercept and respond
const req = httpMock.expectOne('/api/users');
req.flush([{ id: 1, name: 'Test' }]);  // Send mock response

// Verify no outstanding requests
httpMock.verify();
```

#### **Common Jasmine Matchers**

```typescript
// Equality
expect(value).toBe(expected);              // Same object reference (===)
expect(value).toEqual(expected);           // Deep equality
expect(value).not.toBe(expected);          // Negation

// Truthiness
expect(value).toBeTruthy();                // Truthy value
expect(value).toBeFalsy();                 // Falsy value
expect(value).toBeNull();                  // Null
expect(value).toBeUndefined();             // Undefined
expect(value).toBeDefined();               // Not undefined

// Strings
expect(string).toContain('substring');     // Contains substring
expect(string).toMatch(/pattern/);         // Matches regex

// Numbers
expect(number).toBeGreaterThan(5);
expect(number).toBeLessThan(10);
expect(number).toBeCloseTo(3.14, 2);       // Within precision

// Arrays/Objects
expect(array).toContain(item);             // Array contains item
expect(obj).toHaveProperty('key');         // Object has property

// Spies
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(3);
expect(spy).toHaveBeenCalledWith(arg);
```

### Testing Best Practices

1. **Arrange-Act-Assert (AAA) Pattern**
   ```typescript
   it('should do something', () => {
     // Arrange - Set up test data
     const input = 'test';
     
     // Act - Execute the code under test
     const result = component.transform(input);
     
     // Assert - Verify the result
     expect(result).toBe('TEST');
   });
   ```

2. **Test One Thing Per Test** - Each `it()` should test a single behavior

3. **Use Descriptive Test Names** - The `it()` description should clearly state what is being tested

4. **Avoid Testing Implementation Details** - Test behavior, not internal structure

5. **Clean Up After Tests** - Use `afterEach()` to prevent test pollution

6. **Mock External Dependencies** - Isolate the unit under test

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run the Application
```bash
ng serve
```
Navigate to `http://localhost:4200/`

**Note**: This tutorial app uses a **mock backend** (`mock-backend.interceptor.ts`) to simulate API responses. This allows you to run the app without a real backend server. The mock backend provides in-memory CRUD operations for the tutorial. In a production app, you would remove this interceptor and connect to a real API.

### Run Tests
```bash
ng test
```

### Run Tests in Headless Mode
```bash
ng test --browsers=ChromeHeadless --watch=false
```

### Generate Code Coverage
```bash
ng test --code-coverage --watch=false
```
Coverage report will be in `coverage/` directory.

## 📖 Tutorial Guide

### Step 1: Understanding Service Tests

Look at `src/app/services/user.service.spec.ts`:
- See how `HttpClientTestingModule` provides a mock HTTP client
- Learn how `HttpTestingController` verifies HTTP requests
- Understand how to test different HTTP methods
- See error handling patterns

### Step 2: Understanding Child Component Tests

#### UserCardComponent
Open `src/app/components/user-card/user-card.component.spec.ts`:
- Learn how to set component `@Input()` properties in tests
- See how to spy on `@Output()` event emitters
- Understand DOM querying and assertions
- Learn how to trigger events and verify outputs

#### UserFormComponent  
Open `src/app/components/user-form/user-form.component.spec.ts`:
- Learn reactive form testing patterns
- See how to set form values programmatically
- Understand form validation testing
- Learn how to test form submission

### Step 3: Understanding Parent Component Tests

Open `src/app/components/user-list/user-list.component.spec.ts`:
- Learn how to mock service dependencies
- See testing of component initialization
- Understand testing nested components
- Learn patterns for testing data flow

## 🎯 Key Testing Patterns

### 1. Component Setup
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ComponentName]  // Standalone components
  }).compileComponents();
  
  fixture = TestBed.createComponent(ComponentName);
  component = fixture.componentInstance;
});
```

### 2. Testing @Input
```typescript
component.user = { id: 1, name: 'Test' };
fixture.detectChanges();  // Trigger change detection
expect(compiled.querySelector('.name')?.textContent).toContain('Test');
```

### 3. Testing @Output
```typescript
let emittedValue: any;
component.userSelected.subscribe((value) => emittedValue = value);
component.selectUser();
expect(emittedValue).toEqual(expectedValue);
```

### 4. Testing Services with HTTP
```typescript
service.getUsers().subscribe(users => {
  expect(users.length).toBe(2);
});

const req = httpMock.expectOne('/api/users');
expect(req.request.method).toBe('GET');
req.flush(mockUsers);
```

### 5. Testing Async Operations
```typescript
it('should load users on init', fakeAsync(() => {
  component.ngOnInit();
  tick();  // Simulate passage of time
  expect(component.users.length).toBe(2);
}));
```

## 💡 Best Practices Demonstrated

1. ✅ **Arrange-Act-Assert** pattern in all tests
2. ✅ **One assertion per test** when possible
3. ✅ **Descriptive test names** that explain what is being tested
4. ✅ **Cleanup** in `afterEach` when needed
5. ✅ **Mock external dependencies** (HTTP, services)
6. ✅ **Test user interactions** not just data
7. ✅ **Test edge cases** and error scenarios
8. ✅ **Use `beforeEach`** for common setup
9. ✅ **External templates** for better separation of concerns
10. ✅ **Comprehensive comments** explaining testing concepts

## 📝 Testing Checklist

When writing tests, ensure you cover:

**For Services:**
- [ ] All public methods
- [ ] HTTP requests (correct method, URL, body)
- [ ] Success scenarios
- [ ] Error scenarios
- [ ] Observable emissions

**For Components:**
- [ ] Component creation
- [ ] Initial state
- [ ] @Input property changes
- [ ] @Output event emissions
- [ ] Template rendering
- [ ] User interactions (clicks, input)
- [ ] Lifecycle hooks (ngOnInit, etc.)
- [ ] Conditional rendering
- [ ] Form validation (if applicable)

## 🔍 Additional Resources

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Configuration](https://karma-runner.github.io/latest/config/configuration-file.html)
- [Testing Best Practices](https://angular.dev/guide/testing/best-practices)
