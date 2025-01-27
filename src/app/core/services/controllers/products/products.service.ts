import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../../interfaces/controllers/products/products';
import { environment } from '../../../../../environment/environment';
import { productsEndpoints } from './products.endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient: HttpClient = inject(HttpClient)

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.urlAPI}${productsEndpoints.GetProducts}`)
  }
}
