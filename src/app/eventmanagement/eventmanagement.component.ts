import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-eventmanagement',
  templateUrl: './eventmanagement.component.html',
  styleUrls: ['./eventmanagement.component.css'],
  providers : [Commonservices]
})
export class EventmanagementComponent implements OnInit {

  public tabledatalis:any=[];
  public formdata:any;
  public datasource:any;
  public sourcecondition:any={type:this._commonservices.roletypes[0].type0};
  constructor(public _commonservices:Commonservices,public cookieservice:CookieService) {
    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'meetingwith',name:'Meeting With',role:0,func:'',class:'meetingwith',type:'text'},
      {value:'start_date',name:'Start Date',role:0,func:'',class:'start_date',type:'dateis'},
      {value:'start_time',name:'Start Time',role:0,func:'',class:'start_time',type:'timeis'},
      {value:'end_date',name:'End Date',role:0,func:'',class:'end_date',type:'dateis'},
      {value:'end_time',name:'End Time',role:0,func:'',class:'end_time',type:'timeis'},
      {value:'description',name:'Description',role:0,func:'',class:'description',type:'text'},
      {value:'timezone',name:'Timezone',role:0,func:'',class:'timezone',type:'text',selectvalue:'show'}
    ];
    this.formdata=[
      {inputtype:'text',name:'meetingwith',label:'Meeting With',placeholder:'Meeting WIth',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'dateis',name:'start_date',label:"Start Date",placeholder:"Enter Date",validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'timeis',name:'start_time',label:"Start Time",placeholder:"Enter Time",validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'dateis',name:'end_date',label:"End Date",placeholder:"Enter Date",validationrule:{required:true},validationerrormsg:'is required'},

      {inputtype:'timeis',name:'end_time',label:"End Time",placeholder:"Enter Time",validationrule:{required:true},validationerrormsg:'is required'},


      {inputtype:'select',name:'timezone',label:'Timezone',defaultchoice:'Select a Timezone',sourceview:'timezone',sourcetype:'static',selectvalue:'show',selectid:'value',validationrule:{required:true},validationerrormsg:'is required'},


      {inputtype:'textarea',name:'description',label:'Description',placeholder:'Description',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'hidden',name:'userid',label:"userid",placeholder:"Enter userid",value:this.cookieservice.get('userid')}
    ];
    this.datasource={table:'events',objarr:['userid']};
  }

  ngOnInit() {
  }

}
