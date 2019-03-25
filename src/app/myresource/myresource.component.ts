import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-myresource',
  templateUrl: './myresource.component.html',
  styleUrls: ['./myresource.component.css'],
  providers: [Commonservices],
})
export class MyresourceComponent implements OnInit {
  public sourceconditionval:any;
  public resources:any;
  public catid:any;

    constructor(public cookie:CookieService,public router:Router,private _commonservices: Commonservices,private _http: HttpClient, public route:ActivatedRoute) {
  }

  ngOnInit() {
        this.route.params.subscribe(params=>{
            this.catid=params['catid'];
            this.resourcecat();
        })
  }
    resourcecat() {
        if(this.catid!=null){
            this.sourceconditionval ={category_object:this.catid};
        }else{
            this.sourceconditionval ={status:true};
        }
        const link = this._commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
        this._http.post(link,{source:'resourcecategory_view',condition:this.sourceconditionval})
            .subscribe(res => {
                let result;
                result = res;
          if(result.status=='error'){
          }else{
            this.resources = [];
            this.resources = result.res;
            console.log('resources??????????????????:');
            console.log(this.resources);
          }
        }, error => {
          console.log('Oooops!');
          this.resources = [];
        });
  }
}
