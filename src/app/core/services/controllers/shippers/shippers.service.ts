import { inject, Injectable } from '@angular/core';
import { Shippers } from '../../../interfaces/controllers/shippers/shippers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { shippersEndpoints } from './shippers.endpoints';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {
  private httpClient: HttpClient = inject(HttpClient)

  public getShippers(): Observable<Shippers[]> {
    return this.httpClient.get<Shippers[]>(`${environment.urlAPI}${shippersEndpoints.GetShippers}`)
  }
}
