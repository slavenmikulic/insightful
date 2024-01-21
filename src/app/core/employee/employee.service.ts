import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IEmployee } from './intefaces/employee.interface';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<IEmployee> {
  apiUrl = environment.apiUrl + '/employees';

  constructor() {
    super();
  }
}
