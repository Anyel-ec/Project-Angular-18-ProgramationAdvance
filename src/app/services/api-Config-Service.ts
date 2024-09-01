import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private baseUrl: string = 'http://34.127.73.228:3001/';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
