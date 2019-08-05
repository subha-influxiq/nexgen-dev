import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-frontendheader',
  templateUrl: './frontendheader.component.html',
  styleUrls: ['./frontendheader.component.css'],
    providers: [Commonservices]
})
export class FrontendheaderComponent implements OnInit {
public interval;
public repdetails;
public repdashboard=0;
  constructor(public cookie:CookieService,public router:Router,public _commonservices:Commonservices,public _http:HttpClient) { }

  ngOnInit() {

      if( this.cookie.get('userid')!='') {
          this.getrepdetails();
      }


      this.interval =  setInterval(() => {
      this.getslidervalueforimage();
    }, 35000);
  }
  // http://api.nexgentesting.com:7001/modifyemptyslides
  getslidervalueforimage() {
    const link = this._commonservices.nodesslurl+'modifyemptyslides';
    this._http.get(link)
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
          }else{
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  logout(){
      //alert(4);
    this.cookie.deleteAll('/');
      setTimeout(()=>{
          console.log(this.cookie.get('userid'));
          this.router.navigate(['/login']);
      },500);
  }
    gotodashboard(){
        if(this.cookie.get('usertype')=='admin') {
            this.router.navigate(['/dashboard']);
        }
        if(this.cookie.get('usertype')=='regional_recruiter')
        {
            this.router.navigate(['/regionaldashboard']);
        }

    }
    gotorepdashboard(){
        if(this.repdetails[0].lock==1) {
            this.router.navigate(['/tempaccess']);
            return;
        }
        if(this.repdetails[0].signup_step2==1 && this.repdetails[0].contractstep==null && this.repdetails[0].reptraininglessonstep==null) this.router.navigate(['/contract']);

        if(this.repdetails[0].signup_step2==1 && this.repdetails[0].contractstep==1 && this.repdetails[0].reptraininglessonstep==null) this.router.navigate(['/reptrainingcenter']);

        if(this.repdetails[0].signup_step2==1 && this.repdetails[0].contractstep==1 && this.repdetails[0].reptraininglessonstep==1) this.router.navigate(['/repdashboard']);
    }
    getrepdetails(){
        const link = this._commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
        this._http.post(link,{source:'users',condition:{_id:this.cookie.get('userid')}})
            .subscribe(res => {
                let result;
                result = res;
                this.repdetails = [];
                this.repdetails = result.res;
                console.log('repdetails:');
                console.log(this.repdetails);
                if(this.cookie.get('usertype')=='rep' && this.repdetails[0].signup_step2==1 && this.repdetails[0].contractstep==1 && this.repdetails[0].reptraininglessonstep==1)
                {
                    this.repdashboard=1;
                  this.router.navigate(['/repdashboard']);
                }
            }, error => {
                console.log('Oooops!');
                this.repdetails = [];
            });
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
