import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  productId: string = '';
  product: any = null;
  
  private products = [
    {
      id: '1',
      icon: '💻',
      name: 'Laptop',
      description: 'High-performance laptop with latest Intel processor, 16GB RAM, and 512GB SSD',
      price: '$999',
      category: 'Electronics',
      stock: 15
    },
    {
      id: '2',
      icon: '📱',
      name: 'Smartphone',
      description: 'Latest model smartphone with 5G connectivity and advanced camera system',
      price: '$799',
      category: 'Electronics',
      stock: 28
    },
    {
      id: '3',
      icon: '🎧',
      name: 'Headphones',
      description: 'Premium noise-cancelling headphones with 30-hour battery life',
      price: '$299',
      category: 'Audio',
      stock: 42
    },
    {
      id: '4',
      icon: '⌚',
      name: 'Smartwatch',
      description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
      price: '$399',
      category: 'Wearables',
      stock: 33
    },
    {
      id: '5',
      icon: '📷',
      name: 'Camera',
      description: 'Professional DSLR camera with 24MP sensor and 4K video recording',
      price: '$1299',
      category: 'Photography',
      stock: 8
    },
    {
      id: '6',
      icon: '🖥️',
      name: 'Monitor',
      description: '27-inch 4K Ultra HD monitor with HDR support and 144Hz refresh rate',
      price: '$599',
      category: 'Electronics',
      stock: 19
    }
  ];
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Subscribe to route params to get the product ID
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      let myNum = 5;
      console.log(this.productId);
      // Find the product by ID
      this.product = this.products.find(p => p.id === this.productId);
      // If we had API
      // make a request
    });
  }
}
