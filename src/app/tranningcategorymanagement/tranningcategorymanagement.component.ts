import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tranningcategorymanagement',
  templateUrl: './tranningcategorymanagement.component.html',
  styleUrls: ['./tranningcategorymanagement.component.css'],

})
export class TranningcategorymanagementComponent implements OnInit {
public formdata:any;
public datasource:any;
public tabledatalis:any[];
public sourcecondition:any={};

  constructor() {
  this.tabledatalis=[
    {value:'id',name:'Id',role:0,func:'',class:'id',type:'#'},
    {value:'categoryname',name:'Training Title',role:0,func:'',class:'categoryname',type:'text'},
    {value:'description',name:'Description',role:0,func:'',class:'description',type:'text'},
    {value:'priority',name:'Priority',role:0,func:'',class:'priority',type:'text'},
    {value:'type1',name:'Type',role:0,func:'',class:'type',type:'text'},
    // {value:'roleaccess',name:'Role Access',role:0,func:'',class:'roleaccess',type:'text'},
    {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox',editrole:['admin']},
  ];
  this.formdata=[
    {inputtype:'text',name:'categoryname',label:'Training Title',placeholder:'Enter Training Title',validationrule:{required:true},validationerrormsg:'is required'},
    {inputtype:'textarea',name:'description',label:'Description',placeholder:'Enter Description',validationrule:{required:true},validationerrormsg:'is required'},
    {inputtype:'text',name:'priority',label:'Priority',placeholder:'Enter Priority',validationrule:{required:true},validationerrormsg:'is required'},
    {inputtype:'select',name:'type1',label:'Training Type',defaultchoice:'Select Training',sourceview:'tranning',sourcetype:'static',selectvalue:'name',selectid:'name',validationrule:{required:true},validationerrormsg:'is required'},
    {inputtype:'select',name:'parentcategory',label:'Parent Category',defaultchoice:'Select Category',sourceview:'tranningcategory_view',sourcetype:'',selectvalue:'categoryname',selectid:'_id'},

    // {inputtype:'select',name:'roleaccess',label:'Roles can Access',defaultchoice:'Select Roles',sourceview:'roles',sourcetype:'static',selectvalue:'name',selectid:'id',validationrule:{required:true},validationerrormsg:'is required',multiple:true},
    // {inputtype:'hidden',name:'type',label:"type",value:'tranning'},
    {inputtype:'checkbox',name:'status',label:'Status',value:false},
  ];
    this.datasource={table:'tranningcategory',objarr:[]};
  }

  ngOnInit() {
  }

}
