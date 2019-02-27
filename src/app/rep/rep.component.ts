import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-rep',
  templateUrl: './rep.component.html',
  styleUrls: ['./rep.component.css'],
  providers: [Commonservices]
})
export class RepComponent implements OnInit {
  public tabledatalis:any=[];
  public formdata:any;
  public datasource:any;
  public sourcecondition:any={};
  constructor(private _commonservices: Commonservices,private cookeiservice: CookieService) {
    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'created_at',name:'Date Joined',role:0,func:'',class:'id',type:'unixdate'},
      {value:'unique_id',name:'User Id',role:0,func:'',class:'id',type:'text'},
      {value:'firstname',name:'First Name',role:0,func:'',class:'firstname',type:'text'},
      {value:'lastname',name:'Last Name',role:0,func:'',class:'lastname',type:'text'},
      {value:'email',name:'Email Id',role:0,func:'',class:'email',type:'text'},
      /*{value:'address',name:'Address',role:0,func:'',class:'address',type:'text'},*/
      {value:'recruiter',name:'Owner',role:0,func:'',class:'owner',type:'text'},
      //{value:'telephone',name:'Telophone No',role:0,func:'',class:'telephone',type:'text'},
      {value:'phoneno',name:'Phone',role:0,func:'',class:'mobile',type:'text'},
    ];
    if(this.cookeiservice.get('usertype')=='regional_recruiter'){
      this.sourcecondition={regionalrecruiter_id_object:this.cookeiservice.get('userid')};
    }
    this.formdata=[
      {inputtype:'text',name:'firstname',label:'First Name',placeholder:'Enter First Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'text',name:'lastname',label:'Last Name',placeholder:'Enter Last Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'email',name:'email',label:'Email Id',placeholder:'Enter Your Email',validationrule:{required:true,email:true},validationerrormsg:'is required and should be valid'},
      {inputtype:'hidden',name:'type',label:"type",placeholder:"Enter Password",value:this._commonservices.roletypes[2].type2},
      {inputtype:'password',name:'password',label:"Password",placeholder:"Enter Password",validationrule:{required:true},validationerrormsg:'is required',isaddonly:true},
      {inputtype:'password',name:'confirmpassword',label:"Confirm Password",placeholder:"Retype Password Again",validationrule:{required:true,confirmpass:true},validationerrormsg:'is required and should match password field',isaddonly:true},

      {inputtype:'text',name:'address',label:'Address',placeholder:'Enter Your Address',validationrule:{required:true},validationerrormsg:'is required'},
      //{inputtype:'text',name:'telephone',label:'Telephone No',placeholder:'Enter Telephone No',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'text',name:'phoneno',label:'Mobile No',placeholder:'Enter Mobile No',validationrule:{required:true},validationerrormsg:'is required'},
    ];
    console.log('console.log(this._commonservices.roletypes[2].type2');
    console.log(this._commonservices.roletypes[2].type2);
    this.datasource={table:'users',objarr:[]};
    /*this.datasource={table:'user_training',objarr:[]};*/
  }

  ngOnInit() {
  }
/*  gotorepdetails(idis){
    console.log(idis[0][idis.value]);
  }*/
}