import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IEmployee } from './employee.interface';
import { ListBaseService } from '../services/list-base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ListBaseService<IEmployee> {
  apiUrl = environment.apiUrl + '/employees';

  constructor() {
    super();
  }
}
