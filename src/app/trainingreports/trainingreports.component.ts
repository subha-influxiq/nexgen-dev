import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-trainingreports',
  templateUrl: './trainingreports.component.html',
  styleUrls: ['./trainingreports.component.css'],
  providers: [Commonservices]
})
export class TrainingreportsComponent implements OnInit {
  public trainingReportArr:any=[];
  public formdata: any;
  public datasource: any;
  public tabledatalist: any[];
  public sourcecondition: any = {};
  public hideaddval: any = true;
  public hideactionval: any = true;

  constructor(public router:Router,public http:HttpClient,public cookieservice:CookieService,public commonservices:Commonservices, private route: ActivatedRoute) {
    this.tabledatalist = [
      { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
      { value: 'fullname', name: 'Name', role: 0, func: '', class: 'fullname', type: 'text' },
      { value: 'email', name: 'Email Id', role: 0, func: '', class: 'email', type: 'text' },
      { value: 'reactsum', name: 'Training Completed (%)', role: 0, func: '', class: 'reactsum', type: 'text' },  
      {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox',editrole:['admin']},
    ];
    this.formdata = [
      { inputtype: 'text', name: 'fullname', label: 'Full Name', placeholder: 'Enter Full Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'email', name: 'email', label: 'Email Id', placeholder: 'Enter Your Email', validationrule: { required: true, email: true }, validationerrormsg: 'is required and should be valid' },
      { inputtype: 'hidden', name: 'created_by', label: "created_by", placeholder: "Created By", value: this.cookieservice.get('userid') },
      {inputtype:'checkbox',name:'status',label:'Status',value:false},
    ];
    this.datasource = { table: 'users', objarr: ["created_by"] };

   }

  ngOnInit() {
    
    let link = this.commonservices.nodesslurl+'tranningreportlist';
        this.http.post(link,{})
            .subscribe(res=>{
                let result;
                result=res;
                if(result.status=='error'){
                    console.log('Oopss');
                }else {
                    
                    console.log('Get tranningreportlist data');
                    console.log(result);
                }
            })
  }
  

}
