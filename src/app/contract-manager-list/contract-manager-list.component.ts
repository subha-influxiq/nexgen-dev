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

  public loader = 0;
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
public placeholderforselect = 0; 
public message;
 headElements = ['ID', 'Date', 'Product Name', 'Rep Name', 'Lead Name', 'Contract Manager Name', 'Status', 'Notes'];
public productList: any = [];
public prodSelect: any = 0;
public filterValForName: any;
public filterval5: any = '';
public start_date: any = '';
public end_date: any = '';
public notes_list: any = '';
public indexCount: number;

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
      // this.datalist = data.results.res;
      // console.log(this.datalist);
      let dataall: any = [];
      for (let item in data.results.res) {
        if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
          data.results.res.splice(item,1)
          // console.log('asDraft', item)
        } else{
          dataall.push(data.results.res[item])
        }
        
      }
      this.datalist = dataall;
   });
  //  console.log((this.datalist[0].contentTop));

   

   this.getproduct();
  }

  productSearchbyval(val: any){
    this.loader = 1;
    console.log(val);
    if (val != undefined && val != null && val.length > 0) {
      let data: any = {
        "source":"contract_manager_list",
        "condition":{
          "product":val
        }
      }

      const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
          this._http.post(link,data).subscribe((res:any) => {
              this.loader =0;
              // this.datalist = res.res;
              let dataall: any = [];
              for (let item in res.res) {
                if (res.res[item].status == 'asDraft' && res.res[item].rep_id != this.cookeiservice.get('userid')) {
                  res.res.splice(item,1)
                  // console.log('asDraft', item)
                } else{
                  dataall.push(res.res[item])
                }
                
              }
              this.datalist = dataall;
          });
    }
  }

  getdata() {
    this.loader = 1;
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'contract_manager_list'}).subscribe((res:any) => {
      this.loader =0;
      this.datalist = res.res;
      this.route.data.forEach((data:any ) => {
        // this.datalist = data.results.res;
        // console.log(this.datalist);
        let dataall: any = [];
        for (let item in data.results.res) {
          if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
            data.results.res.splice(item,1)
            // console.log('asDraft', item)
          } else{
            dataall.push(data.results.res[item])
          }
          
        }
        this.datalist = dataall;
     });
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
    this.loader = 1;
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
        this._http.post(link, { source: 'contract_manager_list', condition: cond }).subscribe((res:any) => {
          this.loader = 0;
          this.datalist = res.res;
          this.route.data.forEach((data:any ) => {
            // this.datalist = data.results.res;
            let dataall: any = [];
            for (let item in data.results.res) {
              if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
                data.results.res.splice(item,1)
                // console.log('asDraft', item)
              } else{
                dataall.push(data.results.res[item])
              }
              
            }
            this.datalist = dataall;
            // console.log('asDraft1', this.datalist)
         });
        });
    } else {

        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: 'contract_manager_list', condition: cond }).subscribe((res:any) => {
          this.loader = 0;
          this.datalist = res.res;
          this.route.data.forEach((data:any ) => {
            // this.datalist = data.results.res;
            let dataall: any = [];
            for (let item in data.results.res) {
              if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
                data.results.res.splice(item,1)
                // console.log('asDraft', item)
              } else{
                dataall.push(data.results.res[item])
              }
              
            }
            this.datalist = dataall;
            // console.log('asDraft1', this.datalist)
         });
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
    // this.modalRef1.hide();
    this.router.navigateByUrl('/edit-contract-manager/'+val._id);
  }
  modification(val: any){
    console.log(val);
    // this.modalRef1.hide();
    this.router.navigateByUrl('/make-contract-edit/'+val._id)
  }
  
openModalData(val: any, template: TemplateRef<any>) {
  this.modalRef1 = this.modal.show(template);
    this.selecteditem = val;
}


safeHtml(html) {
  return this._sanitizer.bypassSecurityTrustHtml(html);
}


makeContract(item: any, val:string) {
  console.log(item);
  if (val == 'edit') {
    this.router.navigateByUrl('/make-contract-edit/'+item._id);
  }else{
    this.router.navigateByUrl('/make-contract/'+item._id);
  }
}
deletdata(val: any, x, template: TemplateRef<any>) {
  this.modalRef1 = this.modal.show(template);
  this.selecteditem = val;
  this.indexCount = x;
  // console.log(x)
}

confirmdelete(template: TemplateRef<any>) {
    this.modalRef1.hide();
    this.message = "Record deleted successfully!!";
    const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
      this._http.post(link, { source:'contract_repote', id: this.selecteditem._id})
          .subscribe((res:any) => {
            // console.log(res);
            if (res.status == "success") {
              // this.getdata();
              this.datalist.splice(this.indexCount, this.indexCount + 1);
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
