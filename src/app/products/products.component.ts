import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public formdata: any;
  public datasource: any;
  public tabledatalist: any[];
  public sourcecondition: any = {};

  constructor() {this.tabledatalist = [
    { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
    // { value: 'multiple_emails', name: 'Emails', role: 0, func: '', class: 'multiple_emails', type: 'text' },
    { value: 'productname', name: 'Product Name', role: 0, func: '', class: 'productname', type: 'text' },
    { value: 'description', name: 'Description', role: 0, func: '', class: 'description', type: 'text' },
    {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox',editrole:['admin']},
    {value:'verification_need',name:'Verification Needed',role:0,func:'',class:'verification_need',type:'checkbox',editrole:['']},
  ];
  this.formdata = [
    { inputtype: 'text', name: 'productname', label: 'Product Name', placeholder: 'Enter Product Name', validationrule: { required: true }, validationerrormsg: 'is required' },
   
    { inputtype: 'textarea', name: 'description', label: 'description', placeholder: 'Enter Description' },
    {inputtype:'checkbox',name:'status',label:'Status',value:false},
    {inputtype:'checkbox',name:'verification_need',label:'Verification Needed',value:false},
    { inputtype: 'text', name: 'multiple_emails', label: 'Emails', placeholder: 'Enter Emails' },
  ];
  this.datasource = { table: 'products', objarr: [] }; }

  ngOnInit() {
  }

}
