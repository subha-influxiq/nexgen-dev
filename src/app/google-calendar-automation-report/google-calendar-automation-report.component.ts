import { Component, OnInit, TemplateRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {Commonservices} from '../app.commonservices' ;
@Component({
  selector: 'app-google-calendar-automation-report',
  templateUrl: './google-calendar-automation-report.component.html',
  styleUrls: ['./google-calendar-automation-report.component.css'],
  providers: [Commonservices]
})
export class GoogleCalendarAutomationReportComponent implements OnInit {
  modalRef1: BsModalRef;
public commonevents: any;
public usergoogleevent: any;
public cron: any;
headElementsCommonevents = ['ID', '_id', 'Data'];
headElementsUsergoogleevent = ['ID', '_id', 'Data'];
headElementsCron = ['ID', '_id', 'Data'];

  constructor(public _commonservices: Commonservices,
     public cookeiservice: CookieService,
     public http: HttpClient,
     public modal: BsModalService) {
       let useremail:any;
       useremail = this.cookeiservice.get('useremail');
       console.log(useremail);
       let link = this._commonservices.nodesslurl + 'commoneventdata';
       let data = {
        "daterange" : "2019-11-13",
        "email" : useremail
       }
       this.http.post(link, {data: data}).subscribe((res: any)=>{
         console.log(res);
         this.commonevents = res.data.commonevents;
         this.usergoogleevent = res.data.usergoogleevent;
         this.cron = res.data.cron;
       })
  }



  ngOnInit() {
  }

}
