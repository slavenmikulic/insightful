import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export abstract class ListBaseService<T> {
  protected abstract apiUrl: string;

  protected http = inject(HttpClient);

  public list(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }
}
