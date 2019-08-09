import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

/*h*/
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
  providers: [Commonservices],
})
export class AdminheaderComponent implements OnInit {
  public type: any;
  public recphoneno: any;
  public recid: any;
  public sourceval = 'rep_recruiter_view';
  public sourceconditionval: any;
  public datalist: any;
  public allresourcecategory: any;
  public idis: any;
  public repdetails: any;
  public reptraininglessondetails: any;
  public interval;
  public repDetailsNew: any = [];

  constructor(public cookie: CookieService, public router: Router, private _commonservices: Commonservices, private _http: HttpClient) {
    console.log(this.cookie.get('refreshtoken'));
    window.scrollTo(1000, 0);
    this.type = this.cookie.get('usertype');
    this.idis = this.cookie.get('userid');

    if (this.cookie.get('jwttoken') == '' || this.cookie.get('userid') == '') {
      this.router.navigate(['/']);
    } else {
      this.getrepdetails();
      this.getRepDetails();
      this.sourceconditionval = { _id: this.idis };
      if (this.type == 'rep') {
        this.getsignupdetails();

      }
    }
    if (this.type == 'rep' || this.type == 'regional_recruiter') {
      this.resourcecat();
    }
    if (this.cookie.get('lockdornot') == '1') {
      this.router.navigate(['/tempaccess']);
    }
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.getslidervalueforimage();
    }, 35000);
  }

  getRepDetails() {
    let link = this._commonservices.nodesslurl + 'userreport';
    this._http.post(link, { email: this.cookie.get('useremail') })
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
          console.log('Oopss');
        } else {
          this.repDetailsNew = result.data;
          console.log(this.repDetailsNew);
        }
      })
  }
  // http://api.nexgentesting.com:7001/modifyemptyslides
  getslidervalueforimage() {
    const link = this._commonservices.nodesslurl + 'modifyemptyslides';
    this._http.get(link)
      .subscribe(res => {
        let result;
        result = res;
        if (result.status == 'error') {
        } else {
        }
      }, error => {
        console.log('Oooops!');
      });
  }

  getsignupdetails() {
    const link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookie.get('jwttoken');
    this._http.post(link, { source: this.sourceval, condition: this.sourceconditionval })
      .subscribe(res => {
        let result;
        result = res;
        if (result.status == 'error') {
          this.router.navigate(['/']);
        } else {
          this.datalist = [];
          this.datalist = result.res;
          /*    console.log('datalist:');
              console.log(this.datalist);*/
          if (this.datalist.length > 0 && this.datalist[0].recdetails.length > 0) {
            this.recphoneno = this.datalist[0].recdetails[0].phoneno;
            this.recid = this.datalist[0].recdetails[0]._id;
          }
        }
      }, error => {
        console.log('Oooops!');
        this.datalist = [];
      });
  }

  logout() {
    console.log('logout');
    console.log(this.cookie.get('userid'));
    this.cookie.deleteAll('/');
    this.cookie.deleteAll();
    setTimeout(() => {
      console.log(this.cookie.get('userid'));
      this.router.navigate(['/']);
    }, 500);
  }

  getrepdetails() {
    const link = this._commonservices.nodesslurl + 'getrecvalues?token=' + this.cookie.get('jwttoken');
    var data = { _id: this.cookie.get('userid') }
    this._http.post(link, data)
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
        } else {
          this.repdetails = result.res;
          this.reptraininglessondetails = result.res2;
          /*console.log('this.repdetails');
          console.log(this.repdetails);*/
          /* console.log('this.reptraininglessondetails');
           console.log(this.reptraininglessondetails);*/
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  gototrainingsectionwithcat() {
    if (this.reptraininglessondetails != null) {
      console.log('rep');
      var link = 'reptrainingcenter/' + this.reptraininglessondetails.trainingcategory;
      this.router.navigate([link]);
    } else {
      console.log('regional');
      var link = 'reptrainingcenter/5c86b8e9d9705867cdd792e1';
      //   var link = 'reptrainingcenter/5c6d54656fac495dd5c209e9';
      this.router.navigate([link]);
    }
  }
  gotorepevents() {
    if (this.recid != null) {
      //  var link = 'repevent/'+this.recid;
      var link = 'slotview/' + this.recid;
      this.router.navigate([link]);
    }
  }

  resourcecat() {
    this.sourceconditionval = { status: true };
    const link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookie.get('jwttoken');
    this._http.post(link, { source: 'resourcecategory', condition: this.sourceconditionval })
      .subscribe(res => {
        let result;
        result = res;
        if (result.status == 'error') {
        } else {
          this.allresourcecategory = [];
          this.allresourcecategory = result.res;
          /*console.log('allresourcecategory:');
          console.log(this.allresourcecategory);*/
        }
      }, error => {
        console.log('Oooops!');
        this.allresourcecategory = [];
      });
  }
  showphoneno(phn) {
    phn = phn.replace(/ /g, "");
    phn = phn.replace(/-/g, "");
    if (phn != null) return phn.slice(0, 3) + '-' + phn.slice(3, 6) + '-' + phn.slice(6, 10);
    else return phn;
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  openModal() {
    alert('OKK');
  }

}
