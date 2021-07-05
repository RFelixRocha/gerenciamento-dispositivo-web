import { Component, OnInit } from '@angular/core';
import { Device } from "../../interfaces/device";
import { Category } from "../../interfaces/category";
import { DeviceService } from "../../services/device.service";
import { CategoryService } from "../../services/category.service";
import { AlertService } from "../../services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-device-update',
  templateUrl: './device-update.component.html',
  styleUrls: ['./device-update.component.css']
})
export class DeviceUpdateComponent implements OnInit {

  device : Device = {
    id: 0,
    color: '',
    partNumber: '',
    category: '',
    categoryId: ''
  }
  categories: Category[] = []

  constructor(private deviceService: DeviceService, private categoryService: CategoryService, private alertService: AlertService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.searchDevice();
    this.getCategories();
  }

  searchDevice(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.deviceService.searchDevice(id)
      .subscribe(device => {
          if (device === undefined){
            this.alertService.info('Antenção!',`Dispositivo não encontrado`)
            this.router.navigate(['/devices']);
          }

          this.device = device
        console.log(device)
        },
        (httpError) => this.alertService.error('Error!',`${httpError.error.message}`));
  }


  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }

  saveUpdate(): void{

    let expressaoLetras = /[^a-zA-Z]/g;

    this.device.color = this.device.color.trim();
    this.device.partNumber = this.device.partNumber;
    this.device.category = this.device.category;

    if (!this.device.partNumber){
      this.alertService.info('Atenção!',`O campo número da peça é obrigatório.`)
      return
    }

    if (this.device.partNumber === '' || parseInt(this.device.partNumber) < 0)
    {
      this.alertService.info('Atenção!',`O campo número da peça é um número inteiro positivo.`)

      return;
    }

    if (!this.device.color){
      this.alertService.info('Atenção!',`O campo Cor é obrigatório.`)
      return
    }

    if (this.device.color.length > 16){
      this.alertService.info('Atenção!',`O campo Cor não pode ter mais de 16 caracteres.`)
      return
    }

    if(this.device.color.match(expressaoLetras)){
      this.alertService.info('Atenção!',`O campo Cor só aceita letras.`)
      return;
    }

    if (this.device) {
      this.deviceService.updateDevice(this.device)
        .subscribe((updateDevice) => {
          this.alertService.success('Sucesso!',`Dispositivo atualizado com sucesso.`)
          this.router.navigate([`/devices`]);
        },(httpError) => {
          this.alertService.error('Error!',`${httpError.error.message}`);
        });
    }

  }

}
