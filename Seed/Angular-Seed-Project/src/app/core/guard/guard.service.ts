import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private authService: AuthService) { }
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}

