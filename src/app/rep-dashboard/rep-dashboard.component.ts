import { Component, OnInit, TemplateRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-rep-dashboard',
  templateUrl: './rep-dashboard.component.html',
  styleUrls: ['./rep-dashboard.component.css'],
  providers: [Commonservices]
})
export class RepDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('modalopenlink') link: ElementRef;
  public repdetails: any = [];
  public repDetailsNew: any = [];
  public reptraininglessondetails;
  public recid: any;
  public modalRef: BsModalRef;
  public userId: any;
  public calenderaccess:any;

  constructor(public _commonservice: Commonservices, private router: Router, public _http: HttpClient, public modal: BsModalService, public cookeiservice: CookieService) {

    window.scrollTo(1000, 0);
    this._commonservice = _commonservice;
    //this.userReport();
    console.log(this.cookeiservice.get('calenderaccess'));
    if (this.cookeiservice.get('userid') != null) {
      // this.getrepdetails();
      this.userReport();
      this.userId = this.cookeiservice.get('userid');
      this.calenderaccess = this.cookeiservice.get('calenderaccess');
    }
    
    
    
  }
  copyText(val: string){
    console.log(val);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
}
  ngAfterViewInit() {
  }

  userReport(){
    
    let link = this._commonservice.nodesslurl + 'userreport' ;
    // this._http.post(link,{source:'rep_recruiter_view',condition:{_id_object:this.cookeiservice.get('userid')}})
    let data = { email: this.cookeiservice.get('useremail') }
    this._http.post(link, data)
      .subscribe(res => {
        let result: any;
        result = res;
        console.log(result);
        if (result.status == 'error') {
        } else {
          console.log(result);
          this.repDetailsNew = result.data;
          if(this.repDetailsNew.length>0 && this.repDetailsNew[0].trainingpercentage == 100 && this.repDetailsNew[0].is_discovery == false){
            setTimeout(() => {
              this.link.nativeElement.click();
              console.log(this.link);
              console.log('clicked');
            }, 50);
          }
        }
      }, error => {
        console.log('Oooops!');
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modal.show(template);
    setTimeout(() => {
    this.modalRef.hide();
  }, 10000);
  }
  ngOnInit() {
    this.getrepdetails();
  }
  getRepDetails() {
    let link = this._commonservice.nodesslurl + 'trainingreport';
    this._http.post(link, {})
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
          console.log('Oopss');
        } else {

          // this.singleuserdata = result.data;
          console.log('singledata.......');
          // console.log(this.singleuserdata);
          for (let i in result.data) {
            if (result.data[i].type == 'rep' && result.data[i]._id == this.cookeiservice.get('userid')) {
              this.repDetailsNew.push(result.data[i]);
            }
          }
          console.log(this.repDetailsNew);
          if(this.repDetailsNew.length>0 && this.repDetailsNew[0].trainingpercentage == 100){
            setTimeout(() => {
              this.link.nativeElement.click();
              console.log(this.link);
              console.log('clicked');
            }, 50);
          }
        }
      })
  }

  getrepdetails() {
    const link = this._commonservice.nodesslurl + 'getrecvalues?token=' + this.cookeiservice.get('jwttoken');
    // this._http.post(link,{source:'rep_recruiter_view',condition:{_id_object:this.cookeiservice.get('userid')}})
    var data = { _id: this.cookeiservice.get('userid') }
    this._http.post(link, data)
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
        } else {
          this.repdetails = result.res;
          this.reptraininglessondetails = result.res2;
          if (this.repdetails[0].recdetails.length > 0) this.recid = this.repdetails[0].recdetails[0]._id;
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  gototrainingsectionwithcat() {
    // var link = 'reptrainingcenter/' + this.reptraininglessondetails.trainingcategory;
    // this.router.navigate([link]);
    if (this.reptraininglessondetails != null) {
      console.log('rep');
      var link = 'reptrainingcenter/' + this.reptraininglessondetails.trainingcategory;
      this.router.navigate([link]);
    } else {
      console.log('regional');
      var link = 'reptrainingcenter/5d36d7256778e75a3d6c37ce';
      //   var link = 'reptrainingcenter/5c6d54656fac495dd5c209e9';
      this.router.navigate([link]);
    }
  }
  showphoneno(phn) {
    phn = phn.replace(/ /g, "");
    phn = phn.replace(/-/g, "");
    if (phn != null) return phn.slice(0, 3) + '-' + phn.slice(3, 6) + '-' + phn.slice(6, 10);
    else return phn;
  }
  gotorepevents() {
    if (this.recid != null) {
      var link = 'slotview/' + this.recid;
      this.router.navigate([link]);
    }
  }
}
