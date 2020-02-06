import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(private loaderService: LoaderService) { }
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


            // remove request from queue when cancelled
            // catchError((error: HttpErrorResponse) => {
            //     let data = {};
            //     data = {
            //         reason: error && error.error.reason ? error.error.reason : '',
            //         status: error.status
            //     };
            //     // this.errorDialogService.openDialog(data);
            //     console.log(data,'++++++')
            //     return throwError(error);
            // })
    // pass along non-cacheable requests and invalidate cache  
        // if(req.method !== 'GET') {  
        //     console.log(`Invalidating cache: ${req.method} ${req.url}`);  
        //     this.loaderService.invalidateCache();  
        //     return next.handle(req);  
        // } 
         // attempt to retrieve a cached response  
    // const cachedResponse: HttpResponse<any> = this.loaderService.get(req.url);  
  
    // return cached response  
    // if (cachedResponse) {  
    //   console.log(`++ Returning a cached response: ${cachedResponse.url}`);  
    //   console.log(cachedResponse);  
    //   return of(cachedResponse);  
    // }      
  
  // send request to server and add response to cache  
//   return next.handle(req)  
//   .pipe(  
//     tap(event => {  
//       if (event instanceof HttpResponse) {  
//         console.log(`+++++ Adding item to cache: ${req.url}`);  
//         // this.loaderService.put(req.url, event);  
//       }  
//     })  
//   );  

// }  
// }  

        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => {
                        console.log('Error occord.');
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }

    
}