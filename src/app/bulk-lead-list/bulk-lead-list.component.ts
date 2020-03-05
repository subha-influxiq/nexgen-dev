import { Component, OnInit, TemplateRef, AfterViewInit, ViewChild } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-bulk-lead-list',
  templateUrl: './bulk-lead-list.component.html',
  styleUrls: ['./bulk-lead-list.component.css'],
  providers : [Commonservices]
})
export class BulkLeadListComponent implements OnInit, AfterViewInit {
  elements: any = [];
  previous: any = [];

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
 headElements = ['ID', 'Date', 'Full Name', 'Phone', 'Company Name', 'Address', 'Web', 'Email', 'Rep Assigned', 'Batch Name', 'Created By', 'Product Name'];
public productList: any = [];
public prodSelect: any = 0;
public filterValForName: any;
public filterval5: any = '';
public start_date: any = '';
public end_date: any = '';
public notes_list: any = '';
public indexCount: number;
public skipCount: number = 50;
masterSelected:boolean = false;
public check_true = false;
checkedList:any;
public checked_ids: any = [];
public allChecked_ids: any = [];
public rep_list: any = '';
public selectedrep:any ='';
public selectedrepflag:boolean = false;
public total_count: any = 0;
public total_page: any;
isNonTrade: boolean = false
checkAllNonTrades: boolean = false

public page: any = {
  "page_count": 50,
  "page_no": 1
};

public search: any = {
  "Email": "",
  "batch_name": "",
  "rep_name": "",
  "fullName": "",
  "prodSelect": "",
  "date_added": "",
};
public lastsearchcond:any={};

public allData: any;
  constructor(public _commonservice:Commonservices,
   public cookeiservice: CookieService,
    public _http:HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public modal: BsModalService,
    protected _sanitizer: DomSanitizer) {
      this.getPageCount();
     }

  ngOnInit() {

    this.route.data.forEach((data:any ) => {
      this.datalist = data.results.data;
      // console.log(this.datalist,'resolve data')
      // this.skipCount = data.results.resc;
      // this.headElements = Object.keys(data.results.data[0]);
   });

this.allData = this.datalist;
  //  console.log((this.datalist[0].contentTop));
   this.getproduct();
  }


  getPageCount(){
    let repostSignCond: any = {
      'condition':this.lastsearchcond
    };
    let link = this._commonservice.nodesslurl + 'lead-datalist-page-count';
    this._http.post(link, repostSignCond).subscribe((res:any) => {
      console.log('count',res.data);
      this.total_count = res.data;
      this.total_page = Math.round(this.total_count / this.page.page_count)
      console.log(this.total_page,'++++')
    });
  }


  isAllSelected(event: any) {

    const checked = event.target.checked;
    if(checked == true){
      this.checked_ids=[];
      this.datalist.forEach((item:any) =>{
       item.selected = checked;
       console.log(item)
       this.checked_ids.push(item.u_id.toString());
       });
      console.log(this.checked_ids)
    } else {
      this.datalist.forEach((item:any) =>{
       item.selected = false;
       console.log(item.u_id)
      this.checked_ids=[];
       });
      console.log(this.checked_ids)
    }
    
    // this.checked_ids = [];
    // if (event.target.checked == true) {
    //   for (var i = 0; i < this.page.page_count; i++ ) {
    //     console.log(this.datalist[i], i);
    //     this.checked_ids.push(this.datalist[i].u_id);
    //     this.check_true = true;
    //   }
    // } else {
    //   for( var i = 0; i < this.checked_ids.length; i++){ 
    //     if ( this.checked_ids[i] === event.target.value) {
    //       this.checked_ids.splice(i, 1);
    //     }
    //  }
    //   this.check_true = false;
    //   // this.checked_ids.splice(event.target.value, 1);
    // }
    // console.log(this.checked_ids)
  }
  checkUncheck(event: any) {



    if (event.target.checked ==true) {
      this.isNonTrade = true
      this.checked_ids.push(event.target.value);
      console.log(this.checked_ids)
    } else {
      this.checked_ids.splice(event.target.value, 1);
      console.log(this.checked_ids)
    }
    // this.allChecked_ids = [];
    // console.log(event.target.name);
    // console.log(event.target.checked);
    // if (event.target.checked == true) {
    //   this.check_true = true;
    //   this.checked_ids.push(event.target.value);
    // } else {
    //   this.check_true = false;
    //   this.checked_ids.splice(event.target.value, 1);
    // }
    // console.log(event.target.value, this.checked_ids);
  }
  assign_to_rep(template: TemplateRef<any>){
    // console.log(this.checked_ids)
    this.modalRef1 = this.modal.show(template);
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: 'for_rep'}).subscribe((res:any) => {
          // this.datalist = res.res;
          // console.log(res);
          this.rep_list = res.res;
        });
  }

  repAssign(template: TemplateRef<any>){
    this.message = "Record Assign successfully!!";
    let data: any;
    // console.log(this.selectedrep);
    if (this.checked_ids.length !=0) {
      data= {
        added_by: this.cookeiservice.get('userid'),
        rep_id: this.selectedrep,
        leads_id: this.checked_ids
         }
    } else {
      data= {
      added_by: this.cookeiservice.get('userid'),
      rep_id: this.selectedrep,
      leads_id: this.allChecked_ids
       }
    }
    const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
  this._http.post(link,  { source: 'assigned_to_rep', data:data})
      .subscribe((res: any) => {
        // console.log(res);
        this.modalRef1.hide();
        this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
        setTimeout(() => {
            this.modalRef1.hide();
        }, 4000);
    }, error => {
        console.log('Oooops!');
    });
      
  }
  ngAfterViewInit() {
  }
//   previouspage(){

//     let count = this.skipCount - 50;
//     this.skipCount = count;
//     // console.log(count,'-')
//     let cond = {
//       "_id": this.route.snapshot.params._id,
//       "skip": (parseInt(this.page.page_no)-1) * parseInt(this.page.page_count),
//       "limit": parseInt(this.page.page_count),
      
//     }
// if (count>=50) {
  
//   // lead-datalist-page-count
//     const link = this._commonservice.nodesslurl + 'lead-datalist';
//         this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
//           this.loader = 0;
//           this.datalist = res.res;
//         });
//   }
// }

  // nextpage(){
  //   let count = this.skipCount + 50;
  //   this.skipCount = count;
  //   // console.log(count,'+');
  //   let cond = {
  //     "_id": this.route.snapshot.params._id,
  //     "skip":count
  //   }

  //   const link = this._commonservice.nodesslurl + 'lead-datalist';
  //       this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
  //         this.loader = 0;
  //         this.datalist = res.res;
  //       });
  // }

  getPageData() {
    let searchcond:any = {};
    let serachval = this.search;
    let searcharr = Object.keys(serachval).map(function (key) { 
      // Using Number() to convert key to number type 
      // Using obj[key] to retrieve key value 
      console.log(searcharr,'searcharr')
      return {key:key, val:serachval[key]};   
  });


  

  // console.log(searcharr,'search arr+++++',Object.keys(searcharr.key));
  // if (searcharr.key == "date_added") {
  // }

  for(let k in searcharr){
    console.log(searchcond.date_added,'++++')
    if(searcharr[k].val!=null && searcharr[k].val!=''){
      if (this.search.date_added != '' && this.search.date_added != null) {
        this.start_date = moment(this.search.date_added[0]).format('YYYY/MM/DD');
        this.end_date = moment(this.search.date_added[1]).format('YYYY/MM/DD');
        searchcond.date_added = {
          date_added: {
                $lte: this.end_date,
                $gte: this.start_date
            }
        }; 
        searchcond[searcharr[k].key]={$regex:searcharr[k].val};
      
        console.log(searcharr[k].val)
      } else{
        searchcond[searcharr[k].key]={$regex:searcharr[k].val};
      } 
    }
  }
  searchcond={$and:[searchcond]}; 
  this.lastsearchcond=searchcond;
  console.log(searchcond,'cond');

    let repostSignCond: any = {
      "source": "data_pece",
      "condition": searchcond,
      "skip": (parseInt(this.page.page_no)-1) * parseInt(this.page.page_count),
      "limit": parseInt(this.page.page_count),
    };
    const link = this._commonservice.nodesslurl + 'lead-datalist';
    this._http.post(link, repostSignCond).subscribe((response:any) => {
      if(response.status == 'success') {
        this.total_count=0;
        this.datalist = response.data;
        console.log(response);
        this.getPageCount();
      } else {
        console.log(response);
      }
    });
  }
  nextPage(flag: string = null) {
    if(flag == 'prev' && this.page.page_no > 1) {
      this.page.page_no--;
    } 

    if(flag == null && this.page.page_no < this.total_count / this.page.page_no) {
      this.page.page_no++;
    }
    this.getPageData();
  }

  productSearchbyval(val: any){
    this.loader = 1;
    // console.log(val);
    if (val != undefined && val != null && val.length > 0) {
      let data: any = {
        "source":"csv_upload_view",
        "condition":{
          "productName":val
        }
      }
      let repostSignCond: any = {
        "condition": {
          "productName":val
        },
        "skip": (parseInt(this.page.page_no)-1) * parseInt(this.page.page_count),
        "limit": parseInt(this.page.page_count),
      };

      const link = this._commonservice.nodesslurl+'lead-datalist';
          this._http.post(link,repostSignCond).subscribe((res:any) => {
              this.loader =0;
              this.datalist = res.data;
              this.getPageCount()
          });
    }
  }

  getdata() {
    // this.loader = 1;
    // const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    // this._http.post(link,{source:'contract_repote_view'}).subscribe((res:any) => {
    //   this.loader =0;
    //   this.datalist = res.res;
    // });
  }

  searchbyname(val: any) {

    // console.log(val)
    let datalistVal: any = [];
    this.allData = this.datalist;
    // console.log(this.allData)
    if (val == null || val == '') {
      this.datalist = this.allData;
    } else {
      datalistVal = [];
      for (let i in this.datalist) {

        if (this.datalist[i].fullName != null && this.datalist[i].fullName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          datalistVal.push(this.datalist[i]);
        }
      } 
      this.datalist = datalistVal;
    }
  }
  searchbyrepname(val: any){
    // console.log(val)
    let datalistVal: any = [];
    // console.log(this.allData)
    if (val == null || val == '') {
      this.datalist = this.allData;
    } else {
      datalistVal = [];
      for (let i in this.datalist) {

        if (this.datalist[i].rep_name != null && this.datalist[i].rep_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          datalistVal.push(this.datalist[i]);
        }
      } 
      this.datalist = datalistVal;
    }
  }

  searchbybatchname(val: any){
    // console.log(val)
    let datalistVal: any = [];
    // console.log(this.allData)
    if (val == null || val == '') {
      this.datalist = this.allData;
    } else {
      datalistVal = [];
      for (let i in this.datalist) {

        if (this.datalist[i].batch_name != null && this.datalist[i].batch_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          datalistVal.push(this.datalist[i]);
        }
      } 
      this.datalist = datalistVal;
    }
  }
  searchbyleademail(val: any){
    // console.log(val)
    let datalistVal: any = [];
    // console.log(this.allData)
    if (val == null || val == '') {
      this.datalist = this.allData;
    } else {
      datalistVal = [];
      for (let i in this.datalist) {

        if (this.datalist[i].Email != null && this.datalist[i].Email.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          datalistVal.push(this.datalist[i]);
        }
      } 
      this.datalist = datalistVal;
    }
  }

  getproduct() {

    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'products', condition: {"status":true}}).subscribe((res:any) => {
      this.productList = res.res;
    });
  }
  setdatetonull() {
    this.filterval5 = null;
    this.getPageData();
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
        this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
          this.loader = 0;
          this.datalist = res.res;
        });
    } else {
      this.getPageData();
        // const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        // this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
        //   this.loader = 0;
        //   this.datalist = res.res;
        // });
    }

}
// sendToLead(val:any){
// // console.log(val)
// //   const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
// //   this._http.post(link,  { source: 'contract_repote', data: {
// //    id: val._id,
// //    notes: val.notes,
// //    notesByCM:val.notesByCM,
// //    status:'send_to_lead',
// //    product: val.product,
// //    product_id: val.product_id,
// //    lead_id:val.lead_id,
// //    contract_manager_id: val.contract_manager_id,
// //    rep_id:val.rep_id,
// //    updated_by: this.cookeiservice.get('userid')
// //     }})
// //       .subscribe((res: any) => { 
// //           if (res.status == 'success') {
// //           // this.router.navigateByUrl('/contract-manager-list');
// //       }
// //       });
// }
shownotes(val: any, template: TemplateRef<any>){
  // console.log(val);
  // this.modalRef1 = this.modal.show(template);
  // this.notes_list = val;
}

  // editRow(val: any) {
  //   // console.log(val);
  //   // // this.modalRef1.hide();
  //   // this.router.navigateByUrl('/edit-contract-manager/'+val._id);
  // }
  
// openModalData(val: any, template: TemplateRef<any>) {
//   // this.modalRef1 = this.modal.show(template);
//   //   this.selecteditem = val;
// }


// safeHtml(html) {
//   // return this._sanitizer.bypassSecurityTrustHtml(html);
// }


// makeContract(item: any, val:string) {
//   // console.log(item);
//   // if (val == 'edit') {
//   //   this.router.navigateByUrl('/make-contract-edit/'+item._id);
//   // }else{
//   //   this.router.navigateByUrl('/make-contract/'+item._id);
//   // }
// }

// deleteLead(val: any){

//   let link = this._commonservice.nodesslurl + 'deletelead?token=' + this.cookeiservice.get('jwttoken');
//         this._http.post(link, { 
//         "id":val._id,
//         "u_id":val.u_id}).subscribe((res:any) => {
//           console.log('success',res)
//         })
// }
deletdata(val: any, x, template: TemplateRef<any>) {
  this.modalRef1 = this.modal.show(template);
  this.selecteditem = val;
  this.indexCount = x;
  // console.log(val)
  // console.log(x)
}

confirmdelete(template: TemplateRef<any>) {
    this.modalRef1.hide();
    this.message = "Record deleted successfully!!";
    const link = this._commonservice.nodesslurl + 'deletelead?token=' + this.cookeiservice.get('jwttoken');
      this._http.post(link, {"u_id":this.selecteditem.u_id, id: this.selecteditem._id})
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
// console.log(val, value);
// let source1: string;
//     if (value == 'lead') {
//       source1= 'leads'
//     } else{
//       source1= 'users'
//     }
//     const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//     if (source1 != null) {
//       this._http.post(link,{source:source1, condition: {"_id":val}}).subscribe(res => {
//           let result: any = res;
//           console.log(result.res);
//       });  
//     }
  }

}
