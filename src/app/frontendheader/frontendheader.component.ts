import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-frontendheader',
  templateUrl: './frontendheader.component.html',
  styleUrls: ['./frontendheader.component.css'],
    providers: [Commonservices]
})
export class FrontendheaderComponent implements OnInit {

  constructor(public cookie:CookieService,public router:Router,public _commonservices:Commonservices,public _http:HttpClient) { }

  ngOnInit() {
    setInterval(() => {
      this.getslidervalueforimage();
    }, 15000);
  }
  // http://api.nexgentesting.com:7001/modifyemptyslides
  getslidervalueforimage() {
    const link = this._commonservices.nodesslurl+'modifyemptyslides';
    this._http.get(link)
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
          }else{
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  logout(){
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
  }
}
