import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

/*h*/
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
  providers: [Commonservices],
})
export class AdminheaderComponent implements OnInit {
  public type:any;
  public recphoneno:any;
  public sourceval='rep_recruiter_view';
  public sourceconditionval:any;
  public datalist:any;
  public idis:any;
  public repdetails:any;
  public reptraininglessondetails:any;

  constructor(public cookie:CookieService,public router:Router,private _commonservices: Commonservices,private _http: HttpClient) {
    this.type=this.cookie.get('usertype');
    this.idis=this.cookie.get('userid');

    if(this.cookie.get('jwttoken')=='' || this.cookie.get('userid') == ''){
      this.router.navigate(['/']);
    }else{
      this.getrepdetails();
      this.sourceconditionval ={_id:this.idis};
      if(this.type=='rep'){
        this.getsignupdetails();
      }
    }
  }

  ngOnInit() {
  }

  getsignupdetails() {
    const link = this._commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this._http.post(link,{source:this.sourceval,condition:this.sourceconditionval})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
            this.router.navigate(['/']);
          }else{
            this.datalist = [];
            this.datalist = result.res;
           /* console.log('datalist:');
            console.log(this.datalist);*/
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
    this.cookie.deleteAll();
    this.router.navigate(['/']);
  }

  getrepdetails(){
    const link = this._commonservices.nodesslurl+'getrecvalues?token='+this.cookie.get('jwttoken');
    var data={_id:this.cookie.get('userid')}
    this._http.post(link,data)
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status=='error'){
          }else{
            this.repdetails = result.res;
            this.reptraininglessondetails = result.res2;
          /*  console.log(this.repdetails);
            console.log(this.reptraininglessondetails);*/
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  gototrainingsectionwithcat(){
    var link = 'reptrainingcenter/'+this.reptraininglessondetails.trainingcategory;
    this.router.navigate([link]);
  }
}
