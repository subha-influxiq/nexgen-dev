import { Injectable } from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
/*import {Commonservices} from './app.commonservices' ;
import { HttpClient } from '@angular/common/http';

import { switchMap, map, takeWhile } from 'rxjs/operators';*/

export interface EndpointComponent {
    endpoint: string;
}

@Injectable()
export class TestresolveService implements Resolve<EndpointComponent> {
    public userid:any;

 //   constructor(private _apiService: ApiService, private router: Router,public _http:HttpClient,public cookie:CookieService,public commonservices:Commonservices) {}
    constructor(private _apiService: ApiService, public cookieservice: CookieService) {
        if(this.cookieservice.get('userid')!=null)
        this.userid = this.cookieservice.get('userid');
    }



    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        //let id = route.params['id'];
        console.log('resolve route data');
        console.log(route.data);
        console.log(state);
        let endpoint=route.data.link;
        let source=route.data.source;
        let condition=route.data.condition;
        // let requestData: any = route.data.requestcondition;
        // console.log(this.userid);
        // if(route.data.requestcondition.trainingcategory!=null){
        //     console.log('yeah!');
        //     requestData.trainingcategory = Object.assign(requestData.trainingcategory, route.params.cid);
        //     requestData.userid = Object.assign(requestData.userid,this.userid);
        // }else
        //     requestData.condition = Object.assign(requestData.condition, route.params);


            /*var result = new Promise((resolve) => {this._http.post(this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken'),
                {source:source,condition:condition}/!*JSON.stringify(data)*!/).pipe(map(res => res));
            return result;*/

        return new Promise((resolve) => { this._apiService.postData(endpoint,source,condition).subscribe(api_object => {
            if (api_object) {
                return resolve(api_object);
            } else { // id not found
              //  this.router.navigateByUrl('dashboard');
                return true;
            }
        });
        
        });
        // console.log('route.data.requestcondition');
        // console.log(route.data.requestcondition);
        // return new Promise ((resolve)=>{
        //     this._apiService.customRequest(route.data.requestcondition, route.data.endpoint)
        //     .subscribe(api_object =>{
        //         if (api_object) {
        //             return resolve(api_object);
        //         } else { // id not found
        //           //  this.router.navigateByUrl('dashboard');
        //             return true;
        //         }
        //     })
        // });
    }
}

