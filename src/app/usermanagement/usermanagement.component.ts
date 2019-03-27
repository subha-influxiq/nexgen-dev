import { Component, OnInit,TemplateRef } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
  providers: [Commonservices]
})
export class UsermanagementComponent implements OnInit {
  public singleuserdata: any;
    public filterval;
    public filterval1;
    public filterval2;
    public selecteditem;
    public message;
    modalRef: BsModalRef;

  constructor(public commonservices:Commonservices,public cookieservice:CookieService,public _http:HttpClient,public modal:BsModalService)
  {

  }

  ngOnInit()
  {
    this.userdetails();
  }
  userdetails()
  {
    const link = this.commonservices.nodesslurl+'datalist?token='+this.cookieservice.get('jwttoken');
    this._http.post(link,{source:'rep_view'})
        .subscribe(res=>{
          let result;
          result=res;
          this.singleuserdata=result.res;
          console.log('singledata.......');
          console.log(this.singleuserdata);
        })
  }

  togglestatus(item:any) {
    console.log('item.status');
    console.log(item.status);
    let status:any;
    /*      if(item.status!=null) status=1-item.status;
     if(item.status==null) status=1;*/
    if(item.status!=null && item.status!=1 && item.status!=0){
      status=0;
    }
    if(item.status==null) status=1;
    console.log('item.status99');
    console.log(item.status);
    const link = this.commonservices.nodesslurl+'togglestatus?token='+this.cookieservice.get('jwttoken');
    /* console.log('link');
     console.log(link);*/
    this._http.post(link,{id:item._id,source:'users',status:status})
        .subscribe(res => {
          this.userdetails();
        }, error => {
          console.log('Oooops!');
          this.userdetails();
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
    deletdata(val:any,template:TemplateRef<any>){
        this.modalRef=this.modal.show(template);
        this.selecteditem=val;
    }
    confirmdelete(template:TemplateRef<any>){
        this.modalRef.hide();
        this.message="Record deleted successfully!!";
        const link = this.commonservices.nodesslurl+'deletesingledata?token='+this.cookieservice.get('jwttoken');
        this._http.post(link,{source:'users',id:this.selecteditem})
            .subscribe(res => {
                let result;
                result = res;
                this.userdetails();
                this.modalRef=this.modal.show(template,{class: 'successmodal'});
                setTimeout(() => {
                    this.modalRef.hide();
                }, 4000);
            }, error => {
                console.log('Oooops!');
            });

    }
    nodelete(){
        this.modalRef.hide();
    }
}
