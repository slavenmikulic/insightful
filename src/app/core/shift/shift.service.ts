import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IShift } from './shift.interface';
import { ListBaseService } from '../services/list-base.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends ListBaseService<IShift> {
  apiUrl = environment.apiUrl + '/shifts';

  constructor() {
    super();
  }

  override list(): Observable<IShift[]> {
    return super
      .list()
      .pipe(
        map((shifts: IShift[]) =>
          shifts.map(shift => ({ ...shift, clockIn: new Date(shift.clockIn), clockOut: new Date(shift.clockOut) }))
        )
      );
  }
}
