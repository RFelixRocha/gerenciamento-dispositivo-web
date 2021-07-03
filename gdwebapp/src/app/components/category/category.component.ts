import { Component, OnInit } from '@angular/core';

import { Category } from "../../interfaces/category";
import { CategoryService } from "../../services/category.service";
import {AlertService} from "../../services/alert.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
      this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }

  delete(category: Category): void {

    Swal.fire({
      title: 'Atenção!',
      text: "Você ira excluir a categoria selecionada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!',
      cancelButtonText: 'Não, Cancelar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.categories = this.categories.filter(filter => filter !== category);
        this.categoryService.deleteCategory(category.id).subscribe( (result) => {

          Swal.fire(
            'Sucesso!',
            'Categoria excluída com sucesso',
            'success'
          )

        },(httpError) => this.alertService.error('Error!',`${httpError.error.message}`));

      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire(
          'Atenção',
          'Você desistiu de excluir a categoria',
          'info'
        )

      }
    })

  }

}
