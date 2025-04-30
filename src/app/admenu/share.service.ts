import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  private _listeners = new Subject<string>();

  listen(): Observable<string> {
    return this._listeners.asObservable();
  }

  triggerReload(data: string) {
    this._listeners.next(data);
  } 
}
