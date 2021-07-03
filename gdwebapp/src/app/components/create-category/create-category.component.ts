import { Component, OnInit } from '@angular/core';
import { Category } from "../../interfaces/category";
import { CategoryService } from "../../services/category.service";
import {Router} from "@angular/router";
import { AlertService } from "../../services/alert.service";

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

  constructor(private categoryService: CategoryService, private alertService: AlertService,private router: Router) {
  }

  ngOnInit(): void {
  }

  addCategory(): void{
    this.category.name = this.category.name.trim();

    this.categoryService.addCategory(this.category).subscribe(newCategory => {
      this.alertService.success('Sucesso!',`Categoria ${newCategory.name} cadastrada com sucesso.`)
      this.clearForm()
      this.router.navigate(['/categories']);
    },(httpError) => {
      console.log(httpError);
      this.alertService.error('Error!',`${httpError.error.message}`);
    })
  }

  clearForm(): void{
    this.category = {
      id: 0,
      name: ''
    }
  }

}
