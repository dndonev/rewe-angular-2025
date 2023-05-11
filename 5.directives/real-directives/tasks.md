1. Simple Product List (Bindings)

Create an application that displays a list of products. Each product should have the following properties: id, name, description, and price. Use property bindings to display these properties in the UI.

2. Product Detail Component (Bindings)

Extend your application from task 1. When a product is clicked in the list, show a product detail component. This component should receive the selected product through attribute binding.

3. Currency Pipe (Pipes)

In your product list, display the product's price. Use the built-in Angular currency pipe to format the price appropriately.

4. Custom Pipe (Pipes)

Create a custom pipe that abbreviates the product description if it's over 50 characters long. It should display the first 47 characters followed by '...'. Use this pipe in your product list.

5. Highlight Directive (Directives)

Create a custom attribute directive that changes the background color of the product list item when the mouse hovers over it.

6. Disable Product (Directives)

Add a disabled property to your product model. Create a custom directive that greys out the product in the list if it's disabled, and prevents the product detail from being shown.

7. Sort Products (Pipes)

Add buttons that allow the user to sort the product list by name or price. Implement this as a pipe and use it in your product list template.

8. Sort Products (Pipes)

Add buttons that allow the user to sort the product list by name or price. Implement this as a pipe and use it in your product list template.

9. Filter Products (Pipes)

Add an input field that allows the user to filter the product list by name. Implement this as a pipe and use it in your product list template.