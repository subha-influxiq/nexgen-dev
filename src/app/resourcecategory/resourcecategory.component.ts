import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-resourcecategory',
  templateUrl: './resourcecategory.component.html',
  styleUrls: ['./resourcecategory.component.css'],
  providers: [Commonservices]
})
export class ResourcecategoryComponent implements OnInit {
  public tabledatalis:any=[];
  public formdata:any;
  public datasource:any;
//  public sourcecondition:any={type:this._commonservices.roletypes[1].type1};
  public sourcecondition:any={};

  constructor(public _commonservices:Commonservices) {
    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'categoryname',name:'Resource Category Title',role:0,func:'',class:'categoryname',type:'text'},
      {value:'description',name:'Description',role:0,func:'',class:'description',type:'text'},
      {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox'},
      {value:'priority',name:'Priority',role:0,func:'',class:'priority',type:'number'},
    ];
    this.formdata=[
      {inputtype:'text',name:'categoryname',label:'Category Name',placeholder:'Enter Category Name',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'textarea',name:'description',label:'Description',placeholder:'Description',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'number',name:'priority',label:'Priority',placeholder:'Enter Priority',validationrule:{required:true},validationerrormsg:'is required'},
      {inputtype:'checkbox',name:'status',label:'Status',value:false}
    ];
    this.datasource={table:'resourcecategory',objarr:[]};
  }
  ngOnInit() {
  }
}
