import { Component, OnInit } from '@angular/core';
import { Category } from "../../interfaces/category";
import { CategoryService } from "../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  category: Category = {
    id: 0,
    name: ''
  }

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addCategory(): void{
    this.category.name = this.category.name.trim();

    if (!this.category.name)
      return;

    this.categoryService.addCategory(this.category).subscribe(newCategory => {
      this.clearForm()
      this.router.navigate(['/categories']);
    })
  }

  clearForm(): void{
    this.category = {
      id: 0,
      name: ''
    }
  }

}
