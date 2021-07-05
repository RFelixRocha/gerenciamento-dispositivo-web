import { Component, OnInit } from '@angular/core';
import {Category} from "../../interfaces/category";
import {CategoryService} from "../../services/category.service";
import {AlertService} from "../../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  category: Category = {
    id: 0,
    name: '',
    devices: []
  }

  constructor(private categoryService: CategoryService, private alertService: AlertService, private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit(): void {
    this.searchCategory()
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

  saveUpdate(): void {

    this.category.name = this.category.name.trim();

    if (this.category.name.length > 128){
      this.alertService.info('Atenção!',`O campo Nome não pode ter mais de 128 caracteres.`)
      return
    }

    if (this.category) {
      this.categoryService.updateCategory(this.category)
        .subscribe((updateCategory) => {
          this.alertService.success('Sucesso!',`Categoria atualizada com sucesso.`)
          this.router.navigate([`/categories/details/${this.category.id}`]);
        },(httpError) => {
          this.alertService.error('Error!',`${httpError.error.message}`);
        });
    }
  }

}
