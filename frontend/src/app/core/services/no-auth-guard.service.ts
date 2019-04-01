import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService {

  constructor() { }

  canActivate() {
    return true;
  }
}
