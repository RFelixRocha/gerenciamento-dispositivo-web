import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent} from "../components/device/device.component";
import { CategoryComponent } from "../components/category/category.component";
import { CreateCategoryComponent } from "../components/create-category/create-category.component";
import { CreateDeviceComponent } from "../components/create-device/create-device.component";
import { CategoryDetailsComponent } from "../components/category-details/category-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'devices', component: DeviceComponent},
  { path: 'devices/add', component: CreateDeviceComponent},
  { path: 'categories', component: CategoryComponent },
  { path: 'categories/add', component: CreateCategoryComponent},
  { path: 'categories/details/:id', component: CategoryDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
