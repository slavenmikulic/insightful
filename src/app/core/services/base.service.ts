import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IListPagination } from '../interfaces/list-pagination';
import { prepareParams } from '../utils/params-util';

export abstract class BaseService<T> {
  protected http = inject(HttpClient);

  protected abstract apiUrl: string;

  public list(data?: Partial<IListPagination>): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl, { params: prepareParams(data) });
  }

  public update(id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, data);
  }
}
