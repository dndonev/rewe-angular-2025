import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = [
    { id: 1, icon: '💻', name: 'Laptop', description: 'High-performance laptop', price: '$999' },
    { id: 2, icon: '📱', name: 'Smartphone', description: 'Latest model smartphone', price: '$799' },
    { id: 3, icon: '🎧', name: 'Headphones', description: 'Noise-cancelling headphones', price: '$299' },
    { id: 4, icon: '⌚', name: 'Smartwatch', description: 'Fitness tracking smartwatch', price: '$399' },
    { id: 5, icon: '📷', name: 'Camera', description: 'Professional DSLR camera', price: '$1299' },
    { id: 6, icon: '🖥️', name: 'Monitor', description: '4K Ultra HD monitor', price: '$599' }
  ];
}
