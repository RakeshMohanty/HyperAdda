import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoryCacheService {
  private cache: Map<string, any> = new Map<string, any>();

  constructor() { }

  setItem(key: string, value: any): void {
    this.cache.set(key, value);
  }

  getItem(key: string): any {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    } else {
      return null;
    }
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}

