import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-rep-dashboard',
  templateUrl: './rep-dashboard.component.html',
  styleUrls: ['./rep-dashboard.component.css'],
  providers: [Commonservices]
})
export class RepDashboardComponent implements OnInit {
  public repdetails;
  public reptraininglessondetails;
  public recid:any;

  constructor(public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,public cookeiservice: CookieService)
  {
    window.scrollTo(1000,0);
    this._commonservice=_commonservice;
    // console.log(this.cookeiservice.get('userid'));
    if(this.cookeiservice.get('userid')!=null){
    this.getrepdetails();
    }
  }

  ngOnInit() {
  }

  getrepdetails(){
    const link = this._commonservice.nodesslurl+'getrecvalues?token='+this.cookeiservice.get('jwttoken');
   // this._http.post(link,{source:'rep_recruiter_view',condition:{_id_object:this.cookeiservice.get('userid')}})
      var data={_id:this.cookeiservice.get('userid')}
    this._http.post(link,data)
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status=='error'){
          }else{
            this.repdetails = result.res;
            this.reptraininglessondetails = result.res2;
            if(this.repdetails[0].recdetails.length>0)this.recid=this.repdetails[0].recdetails[0]._id;
            }
        }, error => {
          console.log('Oooops!');
        });
  }
    gototrainingsectionwithcat(){
      var link = 'reptrainingcenter/'+this.reptraininglessondetails.trainingcategory;
      this.router.navigate([link]);
    }
  showphoneno(phn){
    phn = phn.replace(/ /g,"");
    phn = phn.replace(/-/g,"");
    if(phn !=null) return phn.slice(0,3)+'-'+phn.slice(3,6)+'-'+phn.slice(6,10);
    else return phn;
  }
  gotorepevents(){
    if(this.recid!=null){
      var link = 'slotview/'+this.recid;
      this.router.navigate([link]);
    }
  }
}
