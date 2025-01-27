import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Employee } from '../../../interfaces/controllers/employees/employees';
import { employeesEndpoints } from './employees.endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private httpClient: HttpClient = inject(HttpClient)

  public getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.urlAPI}${employeesEndpoints.GetEmployees}`)
  }
}
