import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private requests: any = { }; 
  public isLoading = new BehaviorSubject(false);
  constructor() { }


  invalidateCache(): void {  
    this.requests = { };  
    console.log('======+++++')
  } 
  put(url: string, response: HttpResponse<any>): void {  
    this.requests[url] = response;  
  }  
  
  get(url: string): HttpResponse<any> | undefined {  
    return this.requests[url];  
  }  
}
