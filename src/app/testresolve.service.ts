import { Injectable } from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface EndpointComponent {
    endpoint: string;
}

@Injectable()
export class TestresolveService implements Resolve<EndpointComponent> {
    public userid:any;

     constructor(private _apiService: ApiService, public cookieservice: CookieService) {
        if(this.cookieservice.get('userid')!=null)
        this.userid = this.cookieservice.get('userid');
    }



    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let endpoint=route.data.link;
        let source=route.data.source;
        let condition=route.data.condition;
        let requestData: any = route.data.requestcondition;
        if(route.data.requestcondition.trainingcategory!=null){
            requestData.trainingcategory =  route.params.cid;
            requestData.userid =this.userid;
        }
        else if(route.data.requestcondition.condition.id_object == 'id_object'){
            // console.log(route.data.requestcondition)
            requestData.condition.id_object =  route.params._id;
            delete requestData.condition._id
        }
        else if(route.data.requestcondition.condition!=null){
                // console.log(route.data.requestcondition)
            requestData.condition._id =  route.params._id;
            // requestData.userid =this.userid;
        }else requestData.condition = Object.assign(requestData.condition, route.params);

//old code
            /*var result = new Promise((resolve) => {this._http.post(this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken'),
                {source:source,condition:condition}/!*JSON.stringify(data)*!/).pipe(map(res => res));
            return result;*/

        // return new Promise((resolve) => { this._apiService.postData(endpoint,source,condition).subscribe(api_object => {
        //     if (api_object) {
        //         return resolve(api_object);
        //     } else { // id not found
        //       //  this.router.navigateByUrl('dashboard');
        //         return true;
        //     }
        // });
        
        // });
        return new Promise ((resolve)=>{
            this._apiService.customRequest(route.data.requestcondition, route.data.endpoint)
            .subscribe(api_object =>{
                if (api_object) {
                    return resolve(api_object);
                } else { // id not found
                  //  this.router.navigateByUrl('dashboard');
                    return true;
                }
            })
        });
    }
}

