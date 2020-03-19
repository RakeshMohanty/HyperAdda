import { MemoryCacheService } from './../cache/memory-cache.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private memoryCache: MemoryCacheService) { }

  public isAuthenticated(): boolean {
    const token = this.memoryCache.getItem('user_Userid');
    return (token != null && token.length >= 4);
  }
}
