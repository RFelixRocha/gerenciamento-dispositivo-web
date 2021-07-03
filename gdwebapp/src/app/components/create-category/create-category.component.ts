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
    name: '',
    devices: []
  }

  constructor(private categoryService: CategoryService, private alertService: AlertService,private router: Router) {
  }

  ngOnInit(): void {
  }

  addCategory(): void{

    this.category.name = this.category.name.trim();

    if (this.category.name.length > 128){
      this.alertService.info('Atenção!',`O campo Nome não pode ter mais de 128 caracteres.`)
      return
    }

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
      name: '',
      devices: []
    }
  }

}
