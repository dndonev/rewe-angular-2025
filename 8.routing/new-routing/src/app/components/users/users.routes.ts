import { Routes } from "@angular/router";
import { CreateUserComponent } from "./create-user/create-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";

export const usersRoutes: Routes = [
      // Default child route
      { 
        path: '', 
        redirectTo: 'list', 
        pathMatch: 'full' 
      },
      { 
        path: 'list', 
        component: UserListComponent 
      },
      { 
        path: 'create', 
        component: CreateUserComponent 
      },
      { 
        path: 'settings', 
        component: UserSettingsComponent 
      }
    ];
