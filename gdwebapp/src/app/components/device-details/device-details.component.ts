import { Component, OnInit } from '@angular/core';
import { Device } from "../../interfaces/device";
import { DeviceService } from "../../services/device.service";
import { CategoryService } from "../../services/category.service";
import { AlertService } from "../../services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  device : Device = {
    id: 0,
    color: '',
    partNumber: '',
    category: '',
    categoryId: ''
  }

  constructor(private deviceService: DeviceService, private categoryService: CategoryService, private alertService: AlertService,private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    this.searchDevice();
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

  delete(device: Device): void {

    Swal.fire({
      title: 'Atenção!',
      text: "Você ira excluir o dispositivo selecionado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!',
      cancelButtonText: 'Não, Cancelar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.deviceService.deleteDevice(device.id).subscribe( (result) => {

          Swal.fire(
            'Sucesso!',
            'Dispositivo excluído com sucesso',
            'success'
          )

          this.router.navigate(['/devices']);
          
        },(httpError) => this.alertService.error('Error!',`${httpError.error.message}`));

      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    })

  }

}
