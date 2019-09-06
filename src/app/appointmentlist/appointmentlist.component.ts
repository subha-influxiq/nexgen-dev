import { Component, OnInit, TemplateRef } from '@angular/core';
import { Commonservices } from "../app.commonservices";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
//added by Chandrani
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
declare var moment: any;
declare var $: any;
@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.css'],
  providers: [Commonservices]
})
export class AppointmentlistComponent implements OnInit {
  public googleevents: any;
  public googleeventsbackup: any;
  public last: string;
  public filterval;
  // public filterval1;
  // public filterval2;
  public userfilterval;
  public futureevent = 1;
  //added by Chandrani
  public selectedlead: any = {};
  public modalRef2: BsModalRef;
  public activeFlag:any = 0;
  public selectedstatus:any;
  public pricepoint:any;
  public issubmitprice: any=0;
  public optionlist:any = [{value:'Pending',name:'Pending'},{value:'Closed',name:'Closed'},{value:'No Sale',name:'No Sale'}];
  public usertype:any;

  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService) {
    this.usertype = this.cookeiservice.get('usertype');

  }

  usersearch() {
    if (this.userfilterval == null || this.userfilterval == '') {
      this.googleevents = this.googleeventsbackup;
    } else {
      this.googleevents = [];
      for (let i in this.googleeventsbackup) {
        if (this.googleeventsbackup[i].userdata != null && this.googleeventsbackup[i].userdata.unique_id == this.userfilterval) {
          this.googleevents.push(this.googleeventsbackup[i]);
        }
      }
    }
  }
  usernamesearch() {
    if (this.filterval == null || this.filterval == '') {
      this.googleevents = this.googleeventsbackup;
    } else {
      this.googleevents = [];
      for (let i in this.googleeventsbackup) {
        if (this.googleeventsbackup[i].userdata != null && this.googleeventsbackup[i].userdata.firstname == this.filterval) {
          this.googleevents.push(this.googleeventsbackup[i]);
        }
      }
    }
  }

  ngOnInit() {
    this.getgoogleevents();
  }
  getgoogleevents() {
    let sourcecondition;
    if (this.cookeiservice.get('usertype') == 'admin') {
      if (this.futureevent == 1) {
        sourcecondition = { startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') },is_canceled:{$ne:1} };
      }
      else {
        sourcecondition = { startdate: { $lt: moment().format('YYYY-MM-DD') } ,is_canceled:{$ne:1}};
      }
    } else {
      if (this.futureevent == 1) {
        sourcecondition = {
          startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') },
          eventuser_object: this.cookeiservice.get('userid'),is_canceled:{$ne:1}
        };
      } else {
        sourcecondition = {
          startdate: { $lt: moment().format('YYYY-MM-DD') },
          eventuser_object: this.cookeiservice.get('userid'),is_canceled:{$ne:1}
        };
      }

    }



    if (this.cookeiservice.get('usertype') == 'rep') {
      if (this.futureevent == 1) {
        sourcecondition = { startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') },is_canceled:{$ne:1},booked_by:this.cookeiservice.get('userid') };
      }
      else {
        sourcecondition = { startdate: { $lt: moment().format('YYYY-MM-DD') } ,is_canceled:{$ne:1},booked_by:this.cookeiservice.get('userid')};
      }
    }
    // sourcecondition={unique_id:35920};
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, {
      source: 'googleevents_view', condition: sourcecondition
    })
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
        } else {
          this.googleevents = result.res;
          this.googleeventsbackup = result.res;
          console.log(this.googleevents);
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  // searchbyval() {
  //   this.filterval = '';
  //   if (this.filterval1 != '' && this.filterval1 != null) {
  //     this.filterval = this.filterval1 + '|';
  //   }
  //   if (this.filterval2 != '' && this.filterval2 != null) {
  //     this.filterval = this.filterval2 + '|';
  //   }
  //   console.log(this.filterval);
  // }
  seteventtime(val) {
    this.activeFlag = val;
    this.futureevent = val;
    this.getgoogleevents();
  }
  // added by Chandrani 
  notesdata(val: any, template: TemplateRef<any>) {
    this.selectedlead = val;
    console.log(this.selectedlead);
    setTimeout(() => {
      this.modalRef2 = this.modal.show(template);
    }, 2000);


  }
  getCanceledAppoint(){
    let sourcecondition;
    if (this.cookeiservice.get('usertype') == 'admin') {
      if (this.futureevent == 1) {
        sourcecondition = { startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') },is_canceled:1 };
      }
      else {
        sourcecondition = { startdate: { $lt: moment().format('YYYY-MM-DD') } ,is_canceled:1};
      }
    } else {
      if (this.futureevent == 1) {
        sourcecondition = {
          startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') },
          eventuser_object: this.cookeiservice.get('userid'),is_canceled:1
        };
      } else {
        sourcecondition = {
          startdate: { $lt: moment().format('YYYY-MM-DD') },
          eventuser_object: this.cookeiservice.get('userid'),is_canceled:1
        };
      }

    }
    // sourcecondition={unique_id:35920};
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, {
      source: 'googleevents_view', condition: sourcecondition
    })
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
        } else {
          this.activeFlag = 2;
          this.googleevents = result.res;
          this.googleeventsbackup = result.res;
          console.log(this.googleevents);
        }
      }, error => {
        console.log('Oooops!');
      });
  }

  cancelAppointment(google_event_id: any, refresh_token: any, eid: any) {
    let link = 'http://gapi.betoparedes.com/deleteevent.php?event=' + google_event_id + '&refresh_token=' + refresh_token;
    console.log(link);
    this._http.get(link)
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'success') {
          let linkfordb = this._commonservice.nodesslurl + 'addorupdatedata';
          let datafordb = {
            "source": "googleevents", "data": {
              "is_canceled": 1, "id": eid
            }, sourceobj: []
          };
          console.log(datafordb);
          this._http.post(linkfordb, datafordb)
            .subscribe(response => {
              let result2: any;
              result2 = response;
              if (result2.status == 'success') {
              this.getgoogleevents();
            }
            }, error => {
              console.log('Oooops!!!');
            });
        }else{
          console.log(result);
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  toggleStatusInArray(item){
    console.log('item in toggleStatusInArray');
    console.log(item);
    console.log(item.status);
    if(item.status == null)item.status = 'Pending';
    $('.statusspan').removeClass('hide');
    $('.statusspan').addClass('show');
    $('.selectintable').removeClass('show');
    $('.selectintable').addClass('hide');
    $('#span'+item._id).removeClass('show');
    $('#span'+item._id).addClass('hide');
    $('#select'+item._id).removeClass('hide');
    $('#select'+item._id).addClass('show');
   
    
    
    // $('#select'+item._id).removeClass('hide');
    // $('#select'+item._id).addClass('show');
}

toggleFromSelect(event:any,item:any){
    console.log('event');
    console.log(event);
    console.log('item');
    console.log(item);
    console.log(item.status);
    let status: any;
    status=event;
    this.selectedstatus = status;
    console.log(status);
    const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
    /* console.log('link');
     console.log(link);*/
     let data  = { 
        source:'googleevents',
        data: { id: item._id, status: status}
      };
      console.log(data);
    this._http.post(link, { 
        source:'googleevents',
        data: { id: item._id, status: status}}
      )
        .subscribe(res => {
            this.getgoogleevents();
        }, error => {
            console.log('Oooops!');
            this.getgoogleevents();
        });
}

openPricepointModal(item:any,template:TemplateRef<any>){
    console.log(item);
    this.selectedlead = item;
    this.modalRef2 = this.modal.show(template);
}
addPrice(){
    // if(this.pricepoint==''){
    //     this.issubmitprice = 1;
    // }else{
    //     this.issubmitprice = 0;
    // }
    
    if(this.pricepoint == '' || this.pricepoint == null ){
        console.log('error');
        this.issubmitprice = 1;
    }else{
        const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
        /* console.log('link');
         console.log(link);*/
        this._http.post(link, { 
            source:'googleevents',
            data: { id: this.selectedlead._id, pricepoint:this.pricepoint}}
          )
            .subscribe(res => {
                this.pricepoint ='';
                this.getgoogleevents();
                this.modalRef2.hide();
            }, error => {
                console.log('Oooops!');
                this.pricepoint ='';
                this.getgoogleevents();
            });
    }
    
}
  
}
