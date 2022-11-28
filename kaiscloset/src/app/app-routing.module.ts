import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemDetailsComponent } from './components/items/item-details/item-details.component';
import { ItemsComponent } from './components/items/items.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AdduserComponent } from './components/adduser/adduser.component';
import { RoleGuard } from './components/auth/role.guard';
import { AdditemComponent } from './components/additem/additem.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item-details/:id', component: ItemDetailsComponent },
  { path: 'adduser', component: AdduserComponent, canActivate: [RoleGuard] },
  { path: 'additem', component: AdditemComponent, canActivate: [RoleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
