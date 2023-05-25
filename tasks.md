Task 1: Injecting a Service

Inject an existing service called "LoggerService" into a component called "ProductListComponent" to log messages whenever a product is added or removed from the list.

1. Identify the LoggerService and ensure it's available in your Angular project.
2.Import the LoggerService into the ProductListComponent.
3. Inject the LoggerService into the ProductListComponent's constructor.
4. Use the LoggerService to log messages whenever a product is added or removed from the list.



Task 2: Service Dependency Injection

Implement a dependency injection for the ProductService to make it accessible across multiple components in your Angular application.

1. Identify the ProductService that you want to make injectable across components.
2. Add the @Injectable() decorator to the ProductService class.
3. Register the ProductService in the providers array of the Angular module where it should be available.
4. Inject the ProductService into the components where you want to use it.
5. Verify that the ProductService is working correctly by calling its methods in the components where it's injected.
