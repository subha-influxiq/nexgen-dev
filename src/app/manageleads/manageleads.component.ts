import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manageleads',
  templateUrl: './manageleads.component.html',
  styleUrls: ['./manageleads.component.css']
})
export class ManageleadsComponent implements OnInit {
  public formdata: any;
  public datasource: any;
  public tabledatalist: any[];
  public sourcecondition: any = {};
  public hideaddval: any = false;
  constructor(public cookieservice: CookieService) {
    this.formdata = [
      { inputtype: 'text', name: 'firstname', label: 'First Name', placeholder: 'Enter First Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'text', name: 'lastname', label: 'Last Name', placeholder: 'Enter Last Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'text', name: 'company', label: 'Company ', placeholder: 'Enter Company Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'email', name: 'email', label: 'Email Id(s)', placeholder: 'Enter Your Email (Put multiple values in , separated)', validationrule: { required: true, email: true }, validationerrormsg: 'is required and should be valid' },
      { inputtype: 'textarea', name: 'address', label: 'Address', placeholder: 'Enter Address' },
      { inputtype: 'text', name: 'phoneno', label: 'Phone No.', placeholder: 'Enter Mobile Number' },
      { inputtype: 'text', name: 'website', label: 'Website Url.', placeholder: 'Enter Website Url ' },
      { inputtype: 'text', name: 'mobile', label: 'Mobile No.', placeholder: 'Enter Mobile No ' },
      {inputtype:'select',name:'product',label:'Products',defaultchoice:'Select a Product',sourceview:'products',multiple:true,selectvalue:'productname',selectid:'_id',validationrule:{required:true},validationerrormsg:'is required'},
      { inputtype: 'hidden', name: 'status', label: "status", placeholder: "status", value: 'Pending' },
      { inputtype: 'hidden', name: 'created_by', label: "created_by", placeholder: "Created By", value: this.cookieservice.get('userid') }
    ];
    this.datasource = { table: 'leads', objarr: ["created_by"] };
    if (this.cookieservice.get('usertype') == 'admin' ) {
      this.sourcecondition = {};
      this.hideaddval = true;
      this.tabledatalist = [
        { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
        { value: 'fullname', name: 'Full Name', role: 0, func: '', class: 'firstname', type: 'text' },
        { value: 'company', name: 'Company ', role: 0, func: '', class: 'company', type: 'text' },
        { value: 'website', name: 'Website ', role: 0, func: '', class: 'website', type: 'text' },
        { value: 'only_productname', name: 'Products ', role: 0, func: '', class: 'productname', type: 'text' },
        { value: 'email', name: 'Email Id', role: 0, func: '', class: 'email', type: 'text' },
        { value: 'phoneno', name: 'Mobile No', role: 0, func: '', class: 'phone', type: 'phoneno' },
        { value: 'mobile', name: 'Phone No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
        { value: 'address', name: 'Address', role: 0, func: '', class: 'address', type: 'text' },
        { value: 'rep_name', name: 'Rep Details', role: 0, func: '', class: 'fullname', type: 'text' },
        {value: 'status', name: 'Status',defaultchoice:'Pending',optionlist:[{value:'Pending',name:'Pending'},{value:'Closed',name:'Closed'},{value:'No Sale',name:'No Sale'}], role: 0, func: '', class: 'status', type: 'select'},
        
      ];
    } else {
      this.sourcecondition = { 'created_by_object': this.cookieservice.get('userid') };
      this.hideaddval = false;

     if(this.cookieservice.get('usertype') ==  'regional_recruiter'){
      this.tabledatalist = [
        { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
        { value: 'firstname', name: 'First Name', role: 0, func: '', class: 'firstname', type: 'text' },
        { value: 'lastname', name: 'Last Name', role: 0, func: '', class: 'lastname', type: 'text' },
        { value: 'company', name: 'Company ', role: 0, func: '', class: 'company', type: 'text' },
        { value: 'website', name: 'Website ', role: 0, func: '', class: 'website', type: 'text' },
        { value: 'email', name: 'Email Id', role: 0, func: '', class: 'email', type: 'text' },
        { value: 'phoneno', name: 'Mobile No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
        { value: 'mobile', name: 'Phone No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
        { value: 'address', name: 'Address', role: 0, func: '', class: 'address', type: 'text' },
        // {value: 'status', name: 'Status',defaultchoice:'Pending',optionlist:[{value:'Pending',name:'Pending'},{value:'Closed',name:'Closed'},{value:'No Sale',name:'No Sale'}], role: 0, func: '', class: 'status', type: 'select'}
      ];
     }else{
       this.tabledatalist = [
      { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
      { value: 'firstname', name: 'First Name', role: 0, func: '', class: 'firstname', type: 'text' },
      { value: 'lastname', name: 'Last Name', role: 0, func: '', class: 'lastname', type: 'text' },
      { value: 'company', name: 'Company ', role: 0, func: '', class: 'company', type: 'text' },
      { value: 'website', name: 'Website ', role: 0, func: '', class: 'website', type: 'text' },
      { value: 'email', name: 'Email Id', role: 0, func: '', class: 'email', type: 'text' },
      { value: 'phoneno', name: 'Mobile No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
      { value: 'mobile', name: 'Phone No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
      { value: 'address', name: 'Address', role: 0, func: '', class: 'address', type: 'text' },
      // { value: 'status', name: 'Status', role: 0, func: '', class: 'address', type: 'text' }
    ];}
    
    }
  }

  ngOnInit() {
  }

}
