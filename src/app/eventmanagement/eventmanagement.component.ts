import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";


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
  public sourcecondition:any;
  private val: any;
  public accesstoken: any;
  private rt: any;
  constructor(public _commonservices:Commonservices,public cookieservice:CookieService,public route:ActivatedRoute, public _http:HttpClient) {
    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'meetingwith',name:'Event Title',role:0,func:'',class:'meetingwith',type:'text'},
      {value:'timespan',name:'Event Span',role:0,func:'',class:'timespan',type:'text'},
      {value:'start_date',name:'Start Date',role:0,func:'',class:'start_date',type:'dateis'},
      {value:'end_date',name:'End Date',role:0,func:'',class:'end_date',type:'dateis'},
      {value:'start_time',name:'Start Time',role:0,func:'',class:'start_time',type:'timeis'},
      {value:'end_time',name:'End Time',role:0,func:'',class:'end_time',type:'timeis'},
     /* {value:'description',name:'Description',role:0,func:'',class:'description',type:'text'},*/
      {value:'timezone',name:'Timezone',role:0,func:'',class:'timezone',type:'timezone',selectvalue:'show'}
    ];
    // if(this.cookieservice.get('usertype')=='admin'){
    //   this.sourcecondition={};
    // }else{
      this.sourcecondition={'userid_object':this.cookieservice.get('userid')};
    // }

    this.formdata=[
      {inputtype:'text',name:'meetingwith',label:'Event Title',placeholder:'Meeting WIth',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'dateis',name:'start_date',label:"Start Date",placeholder:"Enter Date",validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'dateis',name:'end_date',label:"End Date",placeholder:"Enter Date",validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'checkbox',name:'Sun',label:'Sun',value:false, class:'daycheckbox'},
      {inputtype:'checkbox',name:'Mon',label:'Mon',value:false, class:'daycheckbox'},
      {inputtype:'checkbox',name:'Tues',label:'Tues',value:false, class:'daycheckbox'},
      {inputtype:'checkbox',name:'Wed',label:'Wed',value:false, class:'daycheckbox'},
      {inputtype:'checkbox',name:'Thurs',label:'Thurs',value:false, class:'daycheckbox'},
      {inputtype:'checkbox',name:'Fri',label:'Fri',value:false, class:'daycheckbox'},
      {inputtype:'checkbox',name:'Sat',label:'Sat',value:false, class:'daycheckbox'},
      {inputtype:'timeis',name:'start_time',label:"Start Time",placeholder:"Enter Time",validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'timeis',name:'end_time',label:"End Time",placeholder:"Enter Time",validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'radio',name:'timespan',value:'90',valuelabel:'Minute',label:"",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},
      {inputtype:'radio',name:'timespan',value:'60',valuelabel:'Minute',label:"Time Span",placeholder:"",validationrule:{required:true},validationerrormsg:'is required', class:'radioclass'},
      {inputtype:'radio',name:'timespan',value:'30',valuelabel:'Minute',label:"",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},
      {inputtype:'radio',name:'timespan',value:'15',valuelabel:'Minute',label:"",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},
      {inputtype:'select',name:'timezone',label:'Timezone',defaultchoice:'Select a Timezone',sourceview:'timezone',sourcetype:'static',selectvalue:'show',selectid:'value',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'textarea',name:'description',label:'Event Details',placeholder:'Event Details',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'checkbox',name:'is_onboarding',label:'On Boarding Call',value:false},
      {inputtype:'checkbox',name:'is_discovery',label:'90 min game plan',value:false},
      {inputtype:'checkbox',name:'is_custom',label:'General Call(for Beto only)',value:false},
      {inputtype:'checkbox',name:'is_qna',label: 'Q&A', value:false},
      {inputtype:'hidden',name:'userid',label:"userid",placeholder:"Enter userid",value:this.cookieservice.get('userid')}
    ];
    this.datasource={table:'events',objarr:['userid']};
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{

      this.accesstoken=params['at'];
      this.val=params['val'];
      this.rt=params['rt'];
    if(this.accesstoken!=null && this.val!=null && this.rt!=null){
      const link = this._commonservices.nodesslurl+'addorupdatedata';
      let data={
        id:this.cookieservice.get('userid'),
        accesstoken:this.accesstoken,
        // refreshtoken:this.val+'/'+this.rt,
        refreshtoken:this.rt,
      };
      this._http.post(link,{source:'users',data:data})
          .subscribe(res => {
            let result:any;
            result = res;
          }, error => {
            console.log('Oooops!');
          });
    }else{
    }
    })
     
  }

}
