import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
  providers: [Commonservices]
})
export class ResourcesComponent implements OnInit {
  public tabledatalis:any=[];
  public formdata:any;
  public datasource:any;
  public sourcecondition:any={};

  constructor(public _commonservices:Commonservices) {
    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'resourcename',name:'Resource Title',role:0,func:'',class:'recourcename',type:'text'},
      {value:'file',name:'Resource File',role:0,func:'',class:'recourcefile',type:'file',filepath:'filelocalname'},
      {value:'categoryname',name:'Category Name',role:0,func:'',class:'categoryname',type:'text'},
      {value:'description',name:'Description',role:0,func:'',class:'description',type:'text'},
      {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox'},
    ];
    this.formdata=[
      {inputtype:'text',name:'resourcename',label:'Resource Name',placeholder:'Enter Resource Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'textarea',name:'description',label:'Description',placeholder:'Description',validationrule:{required:true},validationerrormsg:'is required'},
     /* {inputtype:'select',name:'categoryname',label:'Category Name',defaultchoice:'Select Category',sourceview:'resourcecategory',sourcetype:'static',selectvalue:'categoryname',selectid:'_id',validationrule:{required:true},validationerrormsg:'is required'},*/

      {inputtype:'select',name:'category',label:'Category Name',placeholder:'Select Category',validationrule:{required:true},validationerrormsg:'is required',sourceview:'resourcecategory',defaultchoice:'Select a category',selectvalue:'categoryname',multiple:null,selectid:'_id'},


      {inputtype:'file',name:'file',label:'File',placeholder:'Select File',buttonname:'Upload Resource File',validationrule:{required:true},validationerrormsg:'is required',imagefolder:'resource'},
      {inputtype:'hidden',name:'filelocalname',label:'filelocalname',placeholder:'filelocalname'},

      {inputtype:'checkbox',name:'status',label:'Status',value:false}
    ];
    this.datasource={table:'resource',objarr:['category']};
  }
  ngOnInit() {
  }
}
