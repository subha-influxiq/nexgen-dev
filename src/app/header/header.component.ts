import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [Commonservices],
})
export class HeaderComponent implements OnInit {
  public type:any;
  public idis:any;
  public recphoneno:any;
  public datalist:any;
  public sourceval='rep_recruiter_view';
  public sourceconditionval:any;

  constructor( public router: Router, public route: ActivatedRoute, private _http: HttpClient ,private cookeiservice: CookieService,private _commonservices: Commonservices) {
    this.type=this.cookeiservice.get('usertype');
    this.idis=this.cookeiservice.get('userid');
    this.sourceconditionval ={_id:this.idis};
    if(this.type=='rep'){ this.getsignupdetails(); }
    if(this.cookeiservice.get('jwttoken')=='' || this.cookeiservice.get('userid') == ''){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  getsignupdetails() {
    const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:this.sourceval,condition:this.sourceconditionval})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
            this.router.navigate(['/']);
          }else{
            this.datalist = [];
            this.datalist = result.res;
            console.log('datalist:');
            console.log(this.datalist);
            if(this.datalist.length>0 && this.datalist[0].recdetails.length>0){
             this.recphoneno=this.datalist[0].recdetails[0].phoneno;
            }
          }
        }, error => {
          console.log('Oooops!');
          this.datalist = [];
        });
  }
  logout(){
    this.cookeiservice.deleteAll();
    this.router.navigate(['/']);
  }
}
