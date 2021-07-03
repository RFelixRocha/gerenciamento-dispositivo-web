import { Component, OnInit } from '@angular/core';
import { Device } from "../../interfaces/device";
import { DeviceService } from "../../services/device.service";
import { AlertService } from "../../services/alert.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  devices: Device[] = []
  constructor( private deviceService: DeviceService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getDevices()
  }
  getDevices(): void {
    this.deviceService.getDevices().subscribe(devices => {
      this.devices = devices
    })
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

        this.devices = this.devices.filter(filter => filter !== device)
        this.deviceService.deleteDevice(device.id).subscribe( (result) => {

          Swal.fire(
            'Sucesso!',
            'Dispositivo excluído com sucesso',
            'success'
          )

        },(httpError) => this.alertService.error('Error!',`${httpError.error.message}`));

      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire(
          'Atenção',
          'Você desistiu de excluir o dispositivo',
          'info'
        )

      }
    })

  }
}
