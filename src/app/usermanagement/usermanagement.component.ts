import { Component, OnInit, TemplateRef } from '@angular/core';
import { Commonservices } from "../app.commonservices";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
  providers: [Commonservices]
})
export class UsermanagementComponent implements OnInit {
  public singleuserdata: any=[];
  public filterval;
  public filterval1;
  public filterval2;
  public selecteditem;
  public message;
  modalRef: BsModalRef;
  public loader : any = 0;
  public eventList:any = [];
  public eventtype:any;

  constructor(public commonservices: Commonservices, public cookieservice: CookieService, public _http: HttpClient, public modal: BsModalService) {
   this.getUserLists();
   this.commonservices.timeConv24to12("18:00:00");
  }

  getUserLists(){
    this.singleuserdata = [];
    this.loader = 1;
    let link = this.commonservices.nodesslurl+'trainingreport';
    this._http.post(link,{})
        .subscribe(res=>{
            let result;
            result=res;
            if(result.status=='error'){
                console.log('Oopss');
            }else {
                for(let i in result.data){
                  if(result.data[i].type=='rep'){
                    this.singleuserdata.push(result.data[i]);
                    setTimeout(()=>{
                      this.loader = 0;
                    },1000);
                    
                  }
                  
                }
                }
        })
  }

  ngOnInit() {
    // this.userdetails();
  }
  userdetails() {
    const link = this.commonservices.nodesslurl + 'datalist?token=' + this.cookieservice.get('jwttoken');
    this._http.post(link, { source: 'rep_view', condition: { password: { $exists: true } } })
      .subscribe(res => {
        let result;
        result = res;
        this.singleuserdata = result.res;
        console.log('singledata.......');
        console.log(this.singleuserdata);
      })
  }

  togglestatus(item: any) {
    this.loader = 1;
    let status: any;
         if(item.status!=null) status=1-item.status;
     if(item.status==null) status=1;
    // if (item.status != null && item.status != 1 && item.status != 0) {
    //   status = 0;
    // }
    // if (item.status == null) status = 1;
    console.log('item.status99');
    console.log(item.status);
    console.log('status----------'+status);
    const link = this.commonservices.nodesslurl + 'togglestatus?token=' + this.cookieservice.get('jwttoken');
    /* console.log('link');
     console.log(link);*/
    this._http.post(link, { id: item._id, source: 'users', status: status })
      .subscribe(res => {
        this.getUserLists();
        this.loader = 0;
      }, error => {
        console.log('Oooops!');
        this.getUserLists();
        this.loader = 0;
      });
  }

  toggleCalenderAccess(item: any) {
    this.loader = 1;
    let calenderaccess: any;
    if(item.calenderaccess!=null) calenderaccess=1-item.calenderaccess;
    if (item.calenderaccess == null) calenderaccess = 1;
    console.log('item.calenderaccess');
    console.log(item.calenderaccess);
    const link = this.commonservices.nodesslurl + 'addorupdatedata';
    /* console.log('link');
     console.log(link);*/
    this._http.post(link, { source: 'users', data: { id: item._id, calenderaccess: calenderaccess } })
      .subscribe(res => {
        this.getUserLists();
        this.loader = 0;
      }, error => {
        console.log('Oooops!');
        this.loader = 0;
        this.getUserLists();
      });
  }

  toggleConsultantRole(item: any) {
    this.loader = 1;
    let consultantrole: any;
    if(item.is_consultant!=null) consultantrole=1-item.consultantrole;
    if (item.is_consultant == null) consultantrole = 1;
    console.log('item.is_consultant');
    console.log(item.is_consultant);
    const link = this.commonservices.nodesslurl + 'addorupdatedata';
    /* console.log('link');
     console.log(link);*/
    this._http.post(link, { source: 'users', data: { id: item._id, is_consultant: consultantrole } })
      .subscribe(res => {
        this.getUserLists();
        this.loader = 0;
      }, error => {
        console.log('Oooops!');
        this.loader = 0;
        this.getUserLists();
      });
  }
  searchbyval() {
    this.filterval = '';
    if (this.filterval1 != '' && this.filterval1 != null) {
      this.filterval = this.filterval1 + '|';
    }
    if (this.filterval2 != '' && this.filterval2 != null) {
      this.filterval = this.filterval2 + '|';
    }
    console.log(this.filterval);
  }
  deletdata(val: any, template: TemplateRef<any>) {
    this.modalRef = this.modal.show(template);
    this.selecteditem = val;
  }
  confirmdelete(template: TemplateRef<any>) {
    this.modalRef.hide();
    this.message = "Record deleted successfully!!";
    const link = this.commonservices.nodesslurl + 'deletesingledata?token=' + this.cookieservice.get('jwttoken');
    this._http.post(link, { source: 'users', id: this.selecteditem })
      .subscribe(res => {
        let result;
        result = res;
        this.getUserLists();
        this.modalRef = this.modal.show(template, { class: 'successmodal' });
        setTimeout(() => {
          this.modalRef.hide();
        }, 4000);
      }, error => {
        console.log('Oooops!');
      });

  }
  nodelete() {
    this.modalRef.hide();
  }
  openModal(item:any,template:TemplateRef<any>,type:any){
    console.log(item);
    
    this.eventtype = type;
    this.getEventDetails(item.email,type);
    this.modalRef = this.modal.show(template,{class: 'modal-md'});

  }
  getEventDetails(email:any,type:any){
    this.eventList = [];
    const link = this.commonservices.nodesslurl + 'datalist?token=' + this.cookieservice.get('jwttoken');
    let data :any = {};
    if(type == 'Onboarding'){
      data = { source: 'googleevents_view', condition: {"emailid":email,"is_onboarding":true} };
    }
    if(type == 'Discovery'){
      data = { source: 'googleevents_view', condition: {"emailid":email,"is_discovery":true} };
    }
    this._http.post(link,data )
      .subscribe(res => {
        let result;
        result = res;
       console.log('result in events...');
       console.log(result);
       for (let i in result.res){
         if (result.res[i].eventdata!=null){
           this.eventList.push(result.res[i]);
         }
       }
       console.log(this.eventList);
      //  this.eventList = result.res;

      })
  }
}
