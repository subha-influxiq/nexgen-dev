import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Commonservices]
})
export class LoginComponent implements OnInit {
  public dataForm: FormGroup;
  public kp;
  public serverurl;
  public nodesslurl;
  public errormg: any = '';


  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private cookeiservice: CookieService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
    this.nodesslurl = _commonservices.nodesslurl;
    /*console.log(this.cookeiservice.get('userid'));
    if(this.cookeiservice.get('userid')!=''){
      this.router.navigate(['/dashboard']);
    }*/
  }

  ngOnInit() {
    this.dataForm = this.kp.group({
      email: ['', Validators.compose([Validators.required, LoginComponent.customValidator])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  static customValidator(inputemail): any {
    console.log('inputemail');
    console.log(inputemail);
    if (inputemail.pristine) {
      return null;
    }
    inputemail.markAsTouched();
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    console.log(String(inputemail.value).search(filter) != -1);
    if (String(inputemail.value).search(filter) == -1) {
      console.log('valid');
      return {
        invalidemail: true

      }
    }
  }

  dosubmit(formval) {
    this.errormg = '';
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
      console.log(this.dataForm.controls[x].valid);
    }
    if (this.dataForm.valid) {
      const link = this.nodesslurl + 'login';
      const data = {
        email: formval.email,
        password: formval.password,

      };
      this._http.post(link, data)
          .subscribe(res => {
            let result: any = {};
            result = res;
            console.log('result:');
            console.log(result);
            if (result.status == 'error') {
              this.errormg = result.msg;
            }
            if (result.status == 'success') {
              this.cookeiservice.set('userid', result.item[0]._id);
              this.cookeiservice.set('usertype', result.item[0].type);
              this.cookeiservice.set('useremail', result.item[0].email);
                this.cookeiservice.set('fullname', result.item[0].firstname + ' ' + result.item[0].lastname);
                if(result.item[0].type=='admin') {
                  this.router.navigate(['/dashboard']);
                }
                if(result.item[0].type=='regional_recruiter')
                {
                  this.router.navigate(['/regionaldashboard']);
                }
              if(result.item[0].type=='rep')
              {
                this.router.navigate(['/repdashboard']);
              }
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
