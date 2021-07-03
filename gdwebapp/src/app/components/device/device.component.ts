import { Component, OnInit } from '@angular/core';
import { Device } from "../../interfaces/device";
import { DeviceService } from "../../services/device.service";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  devices: Device[] = []
  constructor( private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getDevices()
  }
  getDevices(): void {
    this.deviceService.getDevices().subscribe(devices => {
      this.devices = devices
    })
  }

  delete(device: Device): void {
    this.devices = this.devices.filter(filter => filter !== device)
    this.deviceService.deleteDevice(device.id).subscribe();
  }
}
