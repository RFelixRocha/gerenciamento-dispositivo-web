import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent} from "../components/device/device.component";
import { CategoryComponent } from "../components/category/category.component";
import { CreateCategoryComponent } from "../components/create-category/create-category.component";
import { CreateDeviceComponent } from "../components/create-device/create-device.component";
import { CategoryDetailsComponent } from "../components/category-details/category-details.component";
import { CategoryUpdateComponent } from "../components/category-update/category-update.component";
import { DeviceUpdateComponent } from "../components/device-update/device-update.component";
import {DeviceDetailsComponent} from "../components/device-details/device-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'devices', component: DeviceComponent},
  { path: 'devices/add', component: CreateDeviceComponent},
  { path: 'devices/details/:id', component: DeviceDetailsComponent},
  { path: 'devices/update/:id', component: DeviceUpdateComponent},
  { path: 'categories', component: CategoryComponent },
  { path: 'categories/add', component: CreateCategoryComponent},
  { path: 'categories/details/:id', component: CategoryDetailsComponent},
  { path: 'categories/update/:id', component: CategoryUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
