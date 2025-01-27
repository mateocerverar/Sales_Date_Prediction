import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { customersEndpoints } from './customers.endpoints';
import { Observable } from 'rxjs';
import { SalesDatePrediction } from '../../../interfaces/controllers/customers/customers';
import { FormGroup } from '@angular/forms';
import { CreateOrder } from '../../../interfaces/controllers/orders/orders';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private httpClient: HttpClient = inject(HttpClient)

  public getSalesDatePrediction(): Observable<SalesDatePrediction[]>{
    return this.httpClient.get<SalesDatePrediction[]>(`${environment.urlAPI}${customersEndpoints.GetSalesDatePrediction}`)
  }
}
