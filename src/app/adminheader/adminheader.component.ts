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
  public consultantrole: any;
  public interval;
  public repDetailsNew: any = [];
  public videoCategoryarry: any = [];
  public checkOldCookie: any;
  public oldcookiedata: any;

  constructor(public cookie: CookieService, public old_cookie: CookieService, public router: Router, private _commonservices: Commonservices, private _http: HttpClient) {
    this.checkOldCookie = this.cookie.check('oldcookie'); //check if oldcookie exists or not;returns boolean data
    if (this.cookie.check('oldcookie') == true) {
      this.oldcookiedata = JSON.parse(this.cookie.get('oldcookie'));
    }

    window.scrollTo(1000, 0);
    this.type = this.cookie.get('usertype');
    this.idis = this.cookie.get('userid');
    this.consultantrole = this.cookie.get('is_consultant');
    if (this.cookie.check('jwttoken') == false || this.cookie.check('userid') == false) {
      this.router.navigate(['/']);
    } else {
      this.getRepDetails();
      this.getrepdetails();
      this.getvideocatagory();

      this.sourceconditionval = { _id: this.idis };
      if (this.type == 'rep') {

      }
    }
    if (this.type == 'rep' || this.type == 'regional_recruiter') {
      this.resourcecat();
    }
    if (this.cookie.get('lockdornot') == '1') {
      this.router.navigate(['/tempaccess']);
    }


  }


  getvideocatagory() {
    let link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookie.get('jwttoken');
    console.log(link);
    this._http.post(link, { source: "videocategory_view_with_parent", condition: { status: 1 } })
      .subscribe(res => {
        let result;
        result = res;
        if (result.status == 'error') {

        } else {
          this.videoCategoryarry = [];
          this.videoCategoryarry = result.res;
          console.log('videoCategoryarry:');
          console.log(this.videoCategoryarry);

        }
      }, error => {
        console.log('Oooops!');
        this.videoCategoryarry = [];
      });
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.getRepDetails();
      //this.getslidervalueforimage();
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
          this.cookie.set('calenderaccess', this.repDetailsNew[0].calenderaccess);
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
    this.cookie.deleteAll();
    this.cookie.deleteAll();
    //this.cookie.deleteAll('/');
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
      var link = 'reptrainingcenter/5d36d7256778e75a3d6c37ce';
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
  logBackToOldProfile() {
    this.cookie.deleteAll();  ///deleting new cookie here to fetch old data
    //setting old cookie
    let link = this._commonservices.nodesslurl + 'datalist?token=' + this.oldcookiedata.jwttoken;
    let data = { source: 'users', condition: { email: this.oldcookiedata.useremail } };
    this._http.post(link, data)
      .subscribe(res => {
        let result: any;
        result = res;
        console.log(result);
        if (result.resc == 1 && result.res != null && result.res[0] != null) {
          if (result.res[0].status == 1) {
            this.cookie.set('jwttoken', this.oldcookiedata.jwttoken);
            this.cookie.set('userid', result.res[0]._id);

            if (result.res[0].is_contract_signed == null && result.res[0].type == 'rep') {
              this.router.navigate(['/agreement']);
              return;
            }


            this.cookie.set('lockdornot', result.res[0].lock);
            this.cookie.set('usertype', result.res[0].type);
            this.cookie.set('useremail', result.res[0].email);
            this.cookie.set('calenderaccess', result.res[0].calenderaccess);
            this.cookie.set('is_consultant', result.res[0].is_consultant);
            this.cookie.set('fullname', result.res[0].firstname + ' ' + result.res[0].lastname);
            if (result.res[0].type == 'admin') {
              this.router.navigate(['/dashboard']);
            }
            if (result.res[0].type == 'regional_recruiter') {
              this.cookie.set('refreshtoken', result.res[0].refreshtoken);
              this.router.navigate(['/regionaldashboard']);
            }
            if (result.res[0].type == 'rep') {
              if (result.res[0].status == 0) {
                this.router.navigate(['/tempaccess']);
                return;
              }

              if (result.res[0].status == 1) {
                this.router.navigate(['/repdashboard']);
                return;
              }


              if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == null && result.res[0].reptraininglessonstep == null) this.router.navigate(['/contract']);
              if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == 1 && result.res[0].reptraininglessonstep == null) this.router.navigate(['/reptrainingcenter']);
              if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == 1 && result.res[0].reptraininglessonstep == 1) this.router.navigate(['/repdashboard']);
            }

          }
        }
      })

  }

}
