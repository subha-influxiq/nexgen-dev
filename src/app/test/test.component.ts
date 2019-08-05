import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
declare var moment;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [Commonservices]
})
export class TestComponent implements OnInit {
  public id;
  public eventdetails;
  public dataForm: FormGroup;
  public kp;
  modalRef: BsModalRef;
  public dateallarr: any=[];
  public slotarr: any=[];
  public startarr: any=[];
  public flag: any=30;
  public dayarr: any=[];

  constructor(kp: FormBuilder, public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,public cookeiservice: CookieService,private route: ActivatedRoute)
  {
    this.kp = kp;
    this._commonservice=_commonservice;
  }

  ngOnInit() {
    const link = this._commonservice.nodesslurl + 'getevents1';
    this._http.get(link)
        .subscribe(res => {
          let result:any={};
          result = res;
          this.eventdetails=[];
          this.eventdetails=result.res;
          let startdatearr = this.eventdetails.start_date.split("T");
          let starttimearr = this.eventdetails.start_time.split("T");
          let startdatetimefull = startdatearr[0]+'T'+starttimearr[1];
          let enddatearr = this.eventdetails.end_date.split("T");
          let endtimearr = this.eventdetails.end_time.split("T");
          let enddatetimefull = enddatearr[0]+'T'+endtimearr[1];
          let startdateunix=moment(startdatetimefull).unix();
          let enddateunix=moment(enddatetimefull).unix();
          console.log('===========================================');
          console.log(moment(startdatetimefull).format('ddd'));

          let dateallst = {
            startdatetime : startdatetimefull,
            enddatetime : enddatetimefull,
            timezone : this.eventdetails.timezone,
            description : this.eventdetails.description,
            meetingwith : this.eventdetails.meetingwith,
            startdateunix : startdateunix,
            enddateunix : enddateunix,
            differenceinunix : parseInt(enddateunix) - parseInt(startdateunix),
            differenceinunixupdated : (parseInt(enddateunix) - parseInt(startdateunix))/(3600),
          }

          this.dateallarr.push(dateallst);
          this.startslot(dateallst);
          console.log('this.dayarr----------');
          console.log(this.dayarr);

        })
  }
  startslot(val){
    console.log('startslot');
    this.addslot(val.startdatetime,val.enddatetime,val.timezone,val.meetingwith);
  }

  addslot(startdatetime,enddatetime,timezone,meetingwith){
    console.log('addslot');
    let startdatetimeun=moment(startdatetime).unix();
    let enddatetimeun=moment(enddatetime).unix();
    if(startdatetimeun<enddatetimeun){
      let obj={
        startdate:moment(startdatetime).format('MM/DD/YYYY'),
        starttime:moment(startdatetime).unix(),
        endtime:moment(enddatetime).unix(),
        timezone:timezone,
        meetingwith:meetingwith,
      };


      if((moment(obj.startdate).format('ddd')=='Fri' && this.eventdetails.Fri==true) || (moment(obj.startdate).format('ddd')=='Mon' && this.eventdetails.Mon==true) || (moment(obj.startdate).format('ddd')=='Sat' && this.eventdetails.Sat==true) || (moment(obj.startdate).format('ddd')=='Sun' && this.eventdetails.Sun==true) || (moment(obj.startdate).format('ddd')=='Thurs' && this.eventdetails.Thurs==true) || (moment(obj.startdate).format('ddd')=='Tues' && this.eventdetails.Tues==true) || (moment(obj.startdate).format('ddd')=='Wed' && this.eventdetails.Wed==true)){
      if(obj!=null){
        this.dayarr.push(obj);
      }
      }


      this.addslot(moment(startdatetime).add(1, 'days'),enddatetime,timezone,meetingwith);
    }
  }

}
