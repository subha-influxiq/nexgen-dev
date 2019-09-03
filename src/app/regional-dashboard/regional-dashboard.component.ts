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
    public totalreptraining: any;
    public totalnewhiretraining: any;

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
    this._http.post(link,{source:'user_training',condition:{regionalrecruiter_id_object:this.cookeiservice.get('userid')}}) //users
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status=='error'){
          }else{
            this.repdetails_under_this_regional = result.res;
            console.log(this.repdetails_under_this_regional);
            //added start
              const link1 = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
              this._http.post(link1,{source:'training_group'})
                  .subscribe(res=>{
                      let result;
                      result=res;
                      console.log('training group  details');
                      console.log(result);

                      if(result['res']!=null && result['res'][0]!=null && result['res'][0]['_id']=='New Hire Trainning' ){
                          this.totalnewhiretraining=result['res'][0]['count'];
                      }

                      if(result['res']!=null && result['res'][0]!=null && result['res'][0]['_id']=='Rep Training' ){
                          this.totalreptraining=result['res'][0]['count'];
                      }
                      if(result['res']!=null && result['res'][1]!=null && result['res'][1]['_id']=='New Hire Trainning' ){
                          this.totalnewhiretraining=result['res'][1]['count'];
                      }

                      if(result['res']!=null && result['res'][1]!=null && result['res'][1]['_id']=='Rep Training' ){
                          this.totalreptraining=result['res'][1]['count'];
                      }


                  });
              //added end
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
                console.log('this.googleevents');
                console.log(this.googleevents);
            }
        }, error => {
            console.log('Oooops!');
        });
    }

}
