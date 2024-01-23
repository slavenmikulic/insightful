import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IShift } from './shift.interface';
import { BaseService } from '../services/base.service';
import { map, Observable } from 'rxjs';
import { IListPagination } from '../interfaces/list-pagination';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends BaseService<IShift> {
  apiUrl = environment.apiUrl + '/shifts';

  constructor() {
    super();
  }

  override list(data?: Partial<IListPagination>): Observable<IShift[]> {
    return super
      .list(data)
      .pipe(
        map((shifts: IShift[]) =>
          shifts.map(shift => ({ ...shift, clockIn: new Date(shift.clockIn), clockOut: new Date(shift.clockOut) }))
        )
      );
  }

  override update(id: string, data: IShift): Observable<IShift> {
    return super
      .update(id, data)
      .pipe(map(shift => ({ ...shift, clockIn: new Date(shift.clockIn), clockOut: new Date(shift.clockOut) })));
  }
}
