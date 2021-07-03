import { Component, OnInit } from '@angular/core';
import { DeviceService } from "../../services/device.service";
import { Device } from "../../interfaces/device";
import { Router } from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../interfaces/category";

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent implements OnInit {

  device : Device = {
    id: 0,
    color: '',
    partNumber: '',
    category: ''
  }
  categories: Category[] = []

  constructor(private deviceService: DeviceService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
     this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }

  addDevice(): void{

    this.device.color = this.device.color.trim();
    this.device.partNumber = this.device.partNumber;
    this.device.category = this.device.category;

    if (!this.device.color || !this.device.partNumber || !this.device.category)
      return;

    this.deviceService.addDevice(this.device).subscribe(newCategory => {
      this.clearForm()
      this.router.navigate(['/devices']);
    },error => console.log(error.error))

  }

  clearForm(): void{
    this.device = {
      id: 0,
      color: '',
      partNumber: 0,
      category: ''
    }
  }

}
