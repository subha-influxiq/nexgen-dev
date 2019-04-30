import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
declare var moment: any;
@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.css'],
  providers: [Commonservices]
})
export class AppointmentlistComponent implements OnInit {
  public googleevents:any;
  public googleeventsbackup:any;
  public last: string;
  public filterval;
  // public filterval1;
  // public filterval2;
  public userfilterval;
  public futureevent=1;

  constructor(public _commonservice:Commonservices,public _http:HttpClient,public cookeiservice:CookieService)
  {

  }

  usersearch(){
    if(this.userfilterval==null || this.userfilterval ==''){
      this.googleevents=this.googleeventsbackup;
    }else{
      this.googleevents=[];
      for(let i in this.googleeventsbackup){
        if( this.googleeventsbackup[i].userdata != null && this.googleeventsbackup[i].userdata.unique_id==this.userfilterval){
          this.googleevents.push(this.googleeventsbackup[i]);
        }
      }
    }
  }
  usernamesearch(){
    if(this.filterval==null || this.filterval ==''){
      this.googleevents=this.googleeventsbackup;
    }else{
      this.googleevents=[];
      for(let i in this.googleeventsbackup){
        if( this.googleeventsbackup[i].userdata != null && this.googleeventsbackup[i].userdata.firstname==this.filterval){
          this.googleevents.push(this.googleeventsbackup[i]);
        }
      }
    }
  }

  ngOnInit() {
    this.getgoogleevents();
  }
  getgoogleevents(){
    let sourcecondition;
    if(this.cookeiservice.get('usertype')=='admin'){
      if(this.futureevent==1){
        sourcecondition={ startdate:{$gt: moment().subtract(1, 'days').format('YYYY-MM-DD')}};
      }
      else{
        sourcecondition={ startdate:{$lt: moment().format('YYYY-MM-DD')}};
      }
    }else{
      if(this.futureevent==1){
        sourcecondition={ startdate:{$gt: moment().subtract(1, 'days').format('YYYY-MM-DD')},
          eventuser_object:this.cookeiservice.get('userid')};
      }else{
        sourcecondition={ startdate:{$lt: moment().format('YYYY-MM-DD')},
          eventuser_object:this.cookeiservice.get('userid')};
      }

    }
    // sourcecondition={unique_id:35920};
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'googleevents_view',condition:sourcecondition
    })
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status=='error'){
          }else{
            this.googleevents = result.res;
            this.googleeventsbackup = result.res;
            console.log(this.googleevents);
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  // searchbyval() {
  //   this.filterval = '';
  //   if (this.filterval1 != '' && this.filterval1 != null) {
  //     this.filterval = this.filterval1 + '|';
  //   }
  //   if (this.filterval2 != '' && this.filterval2 != null) {
  //     this.filterval = this.filterval2 + '|';
  //   }
  //   console.log(this.filterval);
  // }
  seteventtime(val){
    this.futureevent=val;
    this.getgoogleevents();
  }
}
