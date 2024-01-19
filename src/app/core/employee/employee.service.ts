import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from './employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl + '/employees';

  constructor(private http: HttpClient) {}

  public list(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseUrl);
  }
}
