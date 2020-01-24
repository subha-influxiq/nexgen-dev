import { Component, OnInit, TemplateRef } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-contract-manager-list',
  templateUrl: './contract-manager-list.component.html',
  styleUrls: ['./contract-manager-list.component.css'],
  providers : [Commonservices]
})
export class ContractManagerListComponent implements OnInit {

  daterangepickerOptions = {
    format: 'MM/DD/YYYY',
    minDate: moment().format("MM/DD/YYYY"),
    noDefaultRangeSelected: true
}
bsDatepicker = {
    format: 'MM/DD/YYYY',
    minDate: moment().format("MM/DD/YYYY"),
    noDefaultRangeSelected: true
}
  modalRef1: BsModalRef;

public datalist: any;
public selecteditem;
public message;
 headElements = ['ID', 'Date', 'Product Name', 'Rep Name', 'Lead Name', 'Contract Manager Name', 'Status', 'Notes'];
public productList: any = [];
public prodSelect: any;
public filterValForName: any;
public filterval5: any = '';
public start_date: any = '';
public end_date: any = '';
public notes_list: any = '';

  constructor(public _commonservice:Commonservices,
   public cookeiservice: CookieService,
    public _http:HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public modal: BsModalService,
    protected _sanitizer: DomSanitizer) {
     }

  ngOnInit() {

    this.route.data.forEach((data:any ) => {
      this.datalist = data.results.res;
   });
  //  console.log((this.datalist[0].contentTop));

   

   this.getproduct();
  }

  productSearchbyval(val: any){
    console.log(val);
    if (val != undefined && val != null && val.length > 0) {
      let data: any = {
        "source":"contract_repote_view",
        "condition":{
          "product":val
        }
      }

      const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
          this._http.post(link,data).subscribe(res => {
              let result: any = res;
              console.log(result.res);
              this.datalist = result.res;
          });
    }
  }

  getdata() {
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'contract_repote_view'}).subscribe(res => {
        let result: any = res;
        console.log(result.res);
        this.datalist = result.res;
    });
  }

  searchbyname(val: any) {
    let datalistVal: any = [];
    let allData = this.datalist;
    if (val == null || val == '') {
      this.datalist = allData;
    } else {
      datalistVal = [];
      for (let i in this.datalist) {

        if (this.datalist[i].lead_fullName != null && this.datalist[i].lead_fullName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          datalistVal.push(this.datalist[i]);
        }
      } 
      this.datalist = datalistVal;
    }
  }

  getproduct() {

    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'products'}).subscribe((res:any) => {
        // let result: any = res;
        // console.log(result.res);
        // this.datalist = result.res;
      this.productList = res.res;
    });
  }
  setdatetonull() {
    this.filterval5 = null;
    this.geteventarr();
}

  geteventarr() {

    let cond: any = '';

    if (this.filterval5 != null && this.filterval5 != '') {
        this.start_date = moment(this.filterval5[0]).format('YYYY/MM/DD');
        this.end_date = moment(this.filterval5[1]).format('YYYY/MM/DD');
        cond = {
            date: {
                $lte: this.end_date,
                $gte: this.start_date
            }
        };
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: 'contract_repote_view', condition: cond }).subscribe(res => {
            let result: any = res;
            this.datalist = result.res;
        });
    } else {

        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: 'contract_repote_view', condition: cond }).subscribe(res => {
            let result: any = res;
            this.datalist = result.res;
        });
    }

}
sendToLead(val:any){
console.log(val)
  const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
  this._http.post(link,  { source: 'contract_repote', data: {
   id: val._id,
   notes: val.notes,
   notesByCM:val.notesByCM,
   status:'send_to_lead',
   product: val.product,
   product_id: val.product_id,
   lead_id:val.lead_id,
   contract_manager_id: val.contract_manager_id,
   rep_id:val.rep_id,
   updated_by: this.cookeiservice.get('userid')
    }})
      .subscribe((res: any) => { 
          if (res.status == 'success') {
          // this.router.navigateByUrl('/contract-manager-list');
      }
      });
}
shownotes(val: any, template: TemplateRef<any>){
  console.log(val);
  this.modalRef1 = this.modal.show(template);
  this.notes_list = val;
}

  editRow(val: any) {
    console.log(val);
    this.router.navigateByUrl('/edit-contract-manager/'+val._id);
  }

  deletdata(val: any, template: TemplateRef<any>) {
    this.modalRef1 = this.modal.show(template);
    this.selecteditem = val;
}
openModalData(val: any, template: TemplateRef<any>) {
  this.modalRef1 = this.modal.show(template);
    this.selecteditem = val;
}

makeContract(item: any, val:string) {
  console.log(item);
  if (val == 'edit') {
    this.router.navigateByUrl('/make-contract-edit/'+item._id);
  }else{
    this.router.navigateByUrl('/make-contract/'+item._id);
  }
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


  showdetails(val: any, value: string) {
console.log(val, value);
let source1: string;
    if (value == 'lead') {
      source1= 'leads'
    } else{
      source1= 'users'
    }
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    if (source1 != null) {
      this._http.post(link,{source:source1, condition: {"_id":val}}).subscribe(res => {
          let result: any = res;
          console.log(result.res);
      });  
    }
  }

}
