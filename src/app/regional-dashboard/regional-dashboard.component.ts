import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
declare var moment: any;
@Component({
  selector: 'app-regional-dashboard',
  templateUrl: './regional-dashboard.component.html',
  styleUrls: ['./regional-dashboard.component.css'],
  providers: [Commonservices]
})
export class RegionalDashboardComponent implements OnInit {
  public repdetails_under_this_regional;
  public googleevents;

  constructor(public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,private cookeiservice: CookieService)
  {
    this._commonservice=_commonservice;
    if(this.cookeiservice.get('userid')!=null){
      this.getreplistunderthisregion();
      this.getgoogleevents();
    }
  }

  ngOnInit() {
  }

  getreplistunderthisregion(){
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'users',condition:{regionalrecruiter_id_object:this.cookeiservice.get('userid')}})
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status=='error'){
          }else{
            this.repdetails_under_this_regional = result.res;
            console.log(this.repdetails_under_this_regional);
          }
        }, error => {
          console.log('Oooops!');
        });
  }

    getgoogleevents(){
        const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'googleevents_view',condition:{
            startdate:{$gt: moment().subtract(1, 'days').format('YYYY-MM-DD')},
            eventuser_object:this.cookeiservice.get('userid')
        }
    })
    .subscribe(res => {
            let result:any;
            result = res;
            if(result.status=='error'){
            }else{
                  this.googleevents = result.res;
                console.log(this.googleevents);
            }
        }, error => {
            console.log('Oooops!');
        });
    }

}
