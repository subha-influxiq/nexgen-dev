import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;


@Component({
  selector: 'app-regional-recruiter',
  templateUrl: './regional-recruiter.component.html',
  styleUrls: ['./regional-recruiter.component.css'],
  providers: [Commonservices]
})
export class RegionalRecruiterComponent implements OnInit {

  public tabledatalis:any=[];
  public formdata:any;
  public datasource:any;
  public sourcecondition:any={type:this._commonservices.roletypes[1].type1};
  constructor(public _commonservices:Commonservices) {
    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'unique_id',name:'User ID',role:0,func:'',class:'id',type:'text'},
   /*   {value:'username',name:'Username',role:0,func:'',class:'username',type:'text'},*/
      {value:'firstname',name:'First Name',role:0,func:'',class:'firstname',type:'text'},
      {value:'lastname',name:'Last Name',role:0,func:'',class:'lastname',type:'text'},
      {value:'email',name:'Email Id',role:0,func:'',class:'email',type:'text'},

    /*  {value:'address',name:'Address',role:0,func:'',class:'address',type:'text'},*/
      {value:'state',name:'State/Region',role:0,func:'',class:'state',type:'text'},
      //{value:'telephone',name:'Telophone No',role:0,func:'',class:'telephone',type:'text'},
      {value:'phoneno',name:'Mobile No',role:0,func:'',class:'mobile',type:'phoneno'},
      {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox',editrole:['admin']},
    ];
    this.formdata=[
      {inputtype:'text',name:'firstname',label:'First Name',placeholder:'Enter First Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'text',name:'lastname',label:'Last Name',placeholder:'Enter Last Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'email',name:'email',label:'Email Id',placeholder:'Enter Your Email',validationrule:{required:true,email:true},validationerrormsg:'is required and should be valid'},      /*{inputtype:'text',name:'username',label:'Username',placeholder:'Enter Your Username',validationrule:{required:true},validationerrormsg:'is required'},*/
      {inputtype:'hidden',name:'type',label:"type",placeholder:"Enter Password",value:this._commonservices.roletypes[1].type1},

      {inputtype:'password',name:'password',label:"Password",placeholder:"Enter Password",validationrule:{required:true},validationerrormsg:'is required',isaddonly:true},
      {inputtype:'password',name:'confirmpassword',label:"Confirm Password",placeholder:"Retype Password Again",validationrule:{required:true,confirmpass:true},validationerrormsg:'is required and should match password field',isaddonly:true},

      /*{inputtype:'text',name:'address',label:'Address',placeholder:'Enter Your Address',validationrule:{required:true},validationerrormsg:'is required'},*/
      {inputtype:'select',name:'state',label:'State/Region',defaultchoice:'Select a State/region',sourceview:'states',multiple:true,sourcetype:'static',selectvalue:'name',selectid:'abbreviation',validationrule:{required:true},validationerrormsg:'is required'},
      //{inputtype:'text',name:'telephone',label:'Telephone No',placeholder:'Enter Telephone No',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'text',name:'phoneno',label:'Mobile No',placeholder:'Enter Mobile No',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'checkbox',name:'status',label:'Status',value:false},
    ];
    this.datasource={table:'users',objarr:[]};
  }

  ngOnInit() {
  }

}
