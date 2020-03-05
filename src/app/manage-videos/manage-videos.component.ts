import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-videos',
  templateUrl: './manage-videos.component.html',
  styleUrls: ['./manage-videos.component.css']
})
export class ManageVideosComponent implements OnInit {
  public formdata: any;
  public datasource: any;
  public tabledatalist: any[];
  public sourcecondition: any = {};
  public hideaddval: any = false;

  constructor(public cookieservice: CookieService) {
    // title , category, description, youtube url, priority, status
    // add or edit form fields added here
    this.formdata = [
      // title
      { inputtype: 'text', name: 'video_title', label: 'Title', placeholder: 'Enter Title', validationrule: { required: true }, validationerrormsg: 'is required' },
      // category
      {inputtype:'select',name:'category',label:'Category',defaultchoice:'Select a Category',sourceview:{source:'videocategory','condition':{'status':true}},selectvalue:'categoryname',selectid:'_id'},
      // description
      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description' },
      // youtube url
      { inputtype: 'text', name: 'youtube_url', label: 'YouTube URL', placeholder: 'Enter youtube url', validationrule: { required: true }, validationerrormsg: 'is required' },
       // priority
       { inputtype: 'text', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' },
      // status
      {inputtype:'checkbox',name:'status',label:'Status',value:false},
      // added by
      { inputtype: 'hidden', name: 'added_by', label: "added_by", placeholder: "Added By", value: this.cookieservice.get('userid') },
      { inputtype: 'hidden', name: 'thumbnail_youtube', label: "thumbnail_youtube", placeholder: "thumbnail_youtube" },

    ];
    this.datasource = { table: 'videos', objarr: ["added_by","category"] };
      this.sourcecondition = {};
      this.hideaddval = false;
      // data which will be displayed in the list
      this.tabledatalist = [
        { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
        { value: 'video_title', name: 'Title', role: 0, func: '', class: 'video_title', type: 'text' },
        { value: 'categoryname', name: 'Category', role: 0, func: '', class: 'category', type: 'text' },
        { value: 'thumbnail_youtube', name: 'Video thumbnail', role: 0, func: '', class: 'thumbnail_youtube', type: 'img' },
        { value: 'description', name: 'Description ', role: 0, func: '', class: 'company', type: 'text' },
        { value: 'priority', name: 'Priority ', role: 0, func: '', class: 'priority', type: 'text' },
        {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox',editrole:['admin']},
      ]; }

  ngOnInit() {
  }

}
