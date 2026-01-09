import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { UsersComponent } from './components/users/users.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { UserSettingsComponent } from './components/users/user-settings/user-settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { usersRoutes } from './components/users/users.routes';

export const routes: Routes = [
  // Default route - redirects to home
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  
  // Basic routes
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'about', 
    component: AboutComponent 
  },
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  
  // Route with parameter
  { 
    path: 'products', 
    component: ProductsComponent,
  },
  { 
    path: 'products/:id', 
    component: ProductDetailComponent 
  },
  
  // Parent route with child routes (nested routing)
  // http://localhost:4200/asdfasdfsadfdsafdsafdsafadsf
  { 
    path: 'users', 
    component: UsersComponent,
    children: usersRoutes
  },
  
  // Wildcard route - must be last!
  // Catches all undefined routes and shows 404 page
  { 
    path: '**', // /users/list/filtered
    component: NotFoundComponent 
  }
];
