import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../interfaces/category";
import Swal from "sweetalert2";
import {AlertService} from "../../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  category: Category = {
    id: 0,
    name: '',
    devices: []
  }

  constructor(private categoryService: CategoryService, private alertService: AlertService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.searchCategory();
  }

  searchCategory(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.categoryService.searchCategory(id)
      .subscribe(category => {
          if (category === undefined){
            this.alertService.info('Antenção!',`Categoria não encontrada`)
            this.router.navigate(['/categories']);
          }

          this.category = category
        },
        (httpError) => this.alertService.error('Error!',`${httpError.error.message}`));
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

        this.categoryService.deleteCategory(category.id).subscribe( (result) => {

          Swal.fire(
            'Sucesso!',
            'Categoria excluída com sucesso',
            'success'
          )
          this.router.navigate(['/categories']);

        },(httpError) => this.alertService.error('Error!',`${httpError.error.message}`));

      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    })

  }

}
