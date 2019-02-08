import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-regional-recruiter',
  templateUrl: './regional-recruiter.component.html',
  styleUrls: ['./regional-recruiter.component.css']
})
export class RegionalRecruiterComponent implements OnInit {

  public tabledatalis:any=[];
  public formdata:any;
  public datasource:any;
  public sourcecondition:any={type:'regional_recruiter'};
  constructor() {
    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'firstname',name:'First Name',role:0,func:'',class:'firstname',type:'text'},
      {value:'lastname',name:'Last Name',role:0,func:'',class:'lastname',type:'text'},
      {value:'email',name:'Email Id',role:0,func:'',class:'email',type:'text'},
      {value:'address',name:'Address',role:0,func:'',class:'address',type:'text'},
      //{value:'telephone',name:'Telophone No',role:0,func:'',class:'telephone',type:'text'},
      {value:'phoneno',name:'Mobile No',role:0,func:'',class:'mobile',type:'text'},
    ];
    this.formdata=[
      {inputtype:'text',name:'firstname',label:'First Name',placeholder:'Enter First Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'text',name:'lastname',label:'Last Name',placeholder:'Enter Last Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'email',name:'email',label:'Email Id',placeholder:'Enter Your Email',validationrule:{required:true,email:true},validationerrormsg:'is required and should be valid'},
      {inputtype:'hidden',name:'type',label:"type",placeholder:"Enter Password",value:'regional_recruiter'},

      {inputtype:'password',name:'password',label:"Password",placeholder:"Enter Password",validationrule:{required:true},validationerrormsg:'is required',isaddonly:true},
      {inputtype:'password',name:'confirmpassword',label:"Confirm Password",placeholder:"Retype Password Again",validationrule:{required:true,confirmpass:true},validationerrormsg:'is required and should match password field',isaddonly:true},

      {inputtype:'text',name:'address',label:'Address',placeholder:'Enter Your Address',validationrule:{required:true},validationerrormsg:'is required'},
      //{inputtype:'text',name:'telephone',label:'Telephone No',placeholder:'Enter Telephone No',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'text',name:'phoneno',label:'Mobile No',placeholder:'Enter Mobile No',validationrule:{required:true},validationerrormsg:'is required'},
    ];
    this.datasource={table:'users',objarr:[]};
  }

  ngOnInit() {
  }

}
