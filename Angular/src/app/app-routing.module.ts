import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { TableComponent } from './table/table.component';
import { MenuComponent } from './menu/menu.component';
import { ItemComponent } from './item/item.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'add-table', component: TableComponent},
  {path: 'add-table/:id', component: EditTableComponent},
  {path: 'add-menu', component: MenuComponent},
  {path: 'add-item', component: ItemComponent},
  {path: 'edit-menu/:id', component: EditMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
