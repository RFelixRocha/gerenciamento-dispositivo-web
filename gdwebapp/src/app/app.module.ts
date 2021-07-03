import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './components/layouts/app.component';
import { DeviceComponent } from './components/device/device.component';
import { CategoryComponent } from './components/category/category.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateDeviceComponent } from './components/create-device/create-device.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    CategoryComponent,
    CreateCategoryComponent,
    CreateDeviceComponent,
    CategoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
