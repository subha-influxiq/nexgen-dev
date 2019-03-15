import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-trainingcenterreoprt',
  templateUrl: './trainingcenterreoprt.component.html',
  styleUrls: ['./trainingcenterreoprt.component.css'],
  providers: [Commonservices]
})
export class TrainingcenterreoprtComponent implements OnInit {
  public getonedetails: any;
    public totalreptraining: any;
    public totalnewhiretraining: any;
    public filterval;
    public filterval1;
    public filterval2;

  constructor(public commonservices:Commonservices,public cookie:CookieService,public _http:HttpClient) { }

  ngOnInit() {
    this.trainingcenterdetails();
  }
  trainingcenterdetails() {
    const link = this.commonservices.nodesslurl + 'datalist?token=' + this.cookie.get('jwttoken');
    this._http.post(link, {source: 'user_training'})
        .subscribe(res => {
          let result;
          result = res;
          this.getonedetails = result.res;
          console.log('Get Onedetails');
          console.log(this.getonedetails);
        });
    const link1 = this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this._http.post(link1,{source:'training_group'})
        .subscribe(res=>{
          let result;
          result=res;
          console.log('training group  details');
          console.log(result);

          if(result['res']!=null && result['res'][0]!=null && result['res'][0]['_id']=='New Hire Trainning' ){
            this.totalnewhiretraining=result['res'][0]['count'];
          }

          if(result['res']!=null && result['res'][0]!=null && result['res'][0]['_id']=='Rep Trainning Table' ){
            this.totalreptraining=result['res'][0]['count'];
          }
          if(result['res']!=null && result['res'][1]!=null && result['res'][1]['_id']=='New Hire Trainning' ){
            this.totalnewhiretraining=result['res'][1]['count'];
          }

          if(result['res']!=null && result['res'][1]!=null && result['res'][1]['_id']=='Rep Trainning Table' ){
            this.totalreptraining=result['res'][1]['count'];
          }
        });
  }
    searchbyval() {
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval = this.filterval2 + '|';
        }
        console.log(this.filterval);
    }
}
