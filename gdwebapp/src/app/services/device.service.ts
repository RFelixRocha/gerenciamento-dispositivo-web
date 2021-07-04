import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Device } from "../interfaces/device";
import {Category} from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private deviceUrl = 'http://18.228.44.227:3000/api/v1/devices';

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  /**
   * Add device
   * */
  addDevice(device: Device): Observable<Device>{
    const url = `${this.deviceUrl}/create`;
    return this.http.post<Device>(url,device,this.httpOptions)
    tap((newCategory: Device) => this.log(`Novo dispositivo cadastrado, id ${newCategory.id}`)),
      catchError(this.handleError<Device>('addDevice'))
  }

  /**  Busca todos os dispositivos */
  getDevices(): Observable<Device[]> {
    const url = `${this.deviceUrl}/all`;
    return this.http.get<Device[]>(url)
      .pipe(
        tap(() => this.log('fetched device')),
        catchError(this.handleError<Device[]>('getDevices', []))
      );
  }

  deleteDevice(id: number): Observable<Device> {
    const url = `${this.deviceUrl}/delete/${id}`;
    return this.http.delete<Device>(url,this.httpOptions)
      .pipe(
        tap(() => this.log(`Dispositivo com id ${id} deletado`)),
        catchError(this.handleError<Device>('deleteDevice' ))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log do Device.service */
  private log(message: string) {
    console.log(message);
  }
}
