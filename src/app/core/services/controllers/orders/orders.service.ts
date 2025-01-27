import { inject, Injectable } from '@angular/core';
import { CreateOrder, Order } from '../../../interfaces/controllers/orders/orders';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { ordersEndpoints } from './orders.endpoints';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private httpClient: HttpClient = inject(HttpClient)

  public getOrdersByClient(customerid: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.urlAPI}${ordersEndpoints.GetOrdersByClient}${customerid}`)
  }

  public postNewOrder(order: FormGroup<CreateOrder>): Observable<number>{
    return this.httpClient.post<number>(`${environment.urlAPI}${ordersEndpoints.PostNewOrder}`, order.value)
  }
}
