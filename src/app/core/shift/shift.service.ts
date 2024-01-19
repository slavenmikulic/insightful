import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IShift } from './shift.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private baseUrl = environment.apiUrl + '/shifts';

  constructor(private http: HttpClient) {}

  public list(): Observable<IShift[]> {
    return this.http.get<IShift[]>(this.baseUrl);
  }
}
