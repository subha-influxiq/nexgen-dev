import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-video',
  templateUrl: './manage-video-category.component.html',
  styleUrls: ['./manage-video-category.component.css']
})
export class ManageVideoCategoryComponent implements OnInit {
  public formdata: any;
  public datasource: any;
  public tabledatalist: any[];
  public sourcecondition: any = {};
  public hideaddval: any = false;
  constructor(public cookieservice: CookieService) {
    // add or edit form fields added here
    this.formdata = [
      // category name
      { inputtype: 'text', name: 'categoryname', label: 'Category Name', placeholder: 'Enter Category Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      // parent category
      {inputtype:'select',name:'parentcategory',label:'Parent Category',defaultchoice:'Select a Category',sourceview:{source:'videocategory','condition':{'status':true}},selectvalue:'categoryname',selectid:'_id'},
      // description
      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description' },
      // priority
      { inputtype: 'text', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' },
      // status
      {inputtype:'checkbox',name:'status',label:'Status',value:false},
      // created by
      { inputtype: 'hidden', name: 'created_by', label: "created_by", placeholder: "Created By", value: this.cookieservice.get('userid') }

    ];
    this.datasource = { table: 'videocategory', objarr: ["created_by","parentcategory"] };
      this.sourcecondition = {};
      this.hideaddval = false;
      // data which will be displayed in the list
      this.tabledatalist = [
        { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
        { value: 'categoryname', name: 'Category Name', role: 0, func: '', class: 'categoryname', type: 'text' },
        { value: 'parentcategoryname', name: 'Parent Category', role: 0, func: '', class: 'lastname', type: 'text' },
        { value: 'description', name: 'Description ', role: 0, func: '', class: 'company', type: 'text' },
        { value: 'priority', name: 'Priority ', role: 0, func: '', class: 'priority', type: 'text' },
        {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox',editrole:['admin']},
      ];
   }

  ngOnInit() {
  }

}
