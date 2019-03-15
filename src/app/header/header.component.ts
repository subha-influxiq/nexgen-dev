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
    this.router.navigate(['/login']);
  }
  showphoneno(phn){
/*    let p03=phn.slice(0,3);
    console.log(p03);
    let p36=phn.slice(3,6);
    console.log(p36);
    let p610=phn.slice(6,10);
    console.log(p610);*/
    if(phn !=null) return '('+phn.slice(0,3)+')'+phn.slice(3,6)+'-'+phn.slice(6,10);
    else return phn;
  }
}
