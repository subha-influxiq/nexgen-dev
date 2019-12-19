import { Component, OnInit, TemplateRef } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contract-manager-list',
  templateUrl: './contract-manager-list.component.html',
  styleUrls: ['./contract-manager-list.component.css'],
  providers : [Commonservices]
})
export class ContractManagerListComponent implements OnInit {


  modalRef1: BsModalRef;

public datalist: any;
public selecteditem;
public message;
 headElements = ['ID', 'Date', 'Product Name', 'Rep Name', 'Lead Name', 'Status', 'Notes'];



  constructor(public _commonservice:Commonservices,
   public cookeiservice: CookieService,
    public _http:HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public modal: BsModalService,
    protected _sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.route.data.forEach((data:any ) => {
      // console.log('json',data.results.res);
      this.datalist = data.results.res;


   });
  }

  getdata() {

    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'contract_repote_view'}).subscribe(res => {
        let result: any = res;
        console.log(result.res);
        this.datalist = result.res;
    });
  }

  editRow(val: any) {
    console.log(val);
    this.router.navigateByUrl('/edit-contract-manager/'+val._id);
  }

  deletdata(val: any, template: TemplateRef<any>) {
    this.modalRef1 = this.modal.show(template);
    this.selecteditem = val;
}

makeContract(item: any) {
  console.log(item);
  this.router.navigateByUrl('/make-contract/'+item._id);
}

confirmdelete(template: TemplateRef<any>) {
    this.modalRef1.hide();
    this.message = "Record deleted successfully!!";
    const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
      this._http.post(link, { source:'contract_repote', id: this.selecteditem._id})
          .subscribe((res:any) => {
            console.log(res);
            if (res.status == "success") {
              this.getdata();
              this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
            setTimeout(() => {
                this.modalRef1.hide();
            }, 4000);
            }
            
        }, error => {
            console.log('Oooops!');
        });
  }
  nodelete() {
    this.modalRef1.hide();
  }

}
