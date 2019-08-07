import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

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
  public issubmit=0;
  modalRef: BsModalRef;

  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private cookeiservice: CookieService,public modal:BsModalService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
    this.nodesslurl = _commonservices.nodesslurl;
    if(this.cookeiservice.get('userid')!=''){
      this.router.navigate(['/useraccountsetting']);
    }
  }

  ngOnInit() {
    this.dataForm = this.kp.group({
      email: ['', Validators.compose([Validators.required, LoginComponent.customValidator])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  static customValidator(inputemail): any {
    if (inputemail.pristine) {
      return null;
    }
    inputemail.markAsTouched();
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (String(inputemail.value).search(filter) == -1) {
      return {
        invalidemail: true

      }
    }
  }

  dosubmit(formval,template:TemplateRef<any>) {
    this.issubmit=1;
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
            this.issubmit=0;
            if (result.status == 'error') {
              this.errormg = result.msg;
            }
            if (result.status == 'success') {
              if(result.item[0].status == 1) {
                this.cookeiservice.set('jwttoken', result.token);
                this.cookeiservice.set('userid', result.item[0]._id);

                if(result.item[0].is_contract_signed == null && result.item[0].type == 'rep') {
                  this.router.navigate(['/agreement']);
                  return ;
                }

                
                this.cookeiservice.set('lockdornot', result.item[0].lock);
                this.cookeiservice.set('usertype', result.item[0].type);
                this.cookeiservice.set('useremail', result.item[0].email);
                this.cookeiservice.set('fullname', result.item[0].firstname + ' ' + result.item[0].lastname);
                if(result.item[0].type=='admin') {
                  this.router.navigate(['/dashboard']);
                }
                if(result.item[0].type=='regional_recruiter') {
                  this.cookeiservice.set('refreshtoken', result.item[0].refreshtoken);
                  this.router.navigate(['/regionaldashboard']);
                }
              /* if(result.item[0].type=='rep')
              {
                this.router.navigate(['/repdashboard']);
              }*/
              if(result.item[0].type=='rep')
              {
                if(result.item[0].status==0) {
                  this.router.navigate(['/tempaccess']);
                  return;
                }

                if(result.item[0].status==1) {
                  this.router.navigate(['/repdashboard']);
                  return;
                }


                if(result.item[0].signup_step2==1 && result.item[0].contractstep==null && result.item[0].reptraininglessonstep==null) this.router.navigate(['/contract']);
                if(result.item[0].signup_step2==1 && result.item[0].contractstep==1 && result.item[0].reptraininglessonstep==null) this.router.navigate(['/reptrainingcenter']);
                if(result.item[0].signup_step2==1 && result.item[0].contractstep==1 && result.item[0].reptraininglessonstep==1) this.router.navigate(['/repdashboard']);
              }
              console.log('jwttoken');
              console.log(this.cookeiservice.get('jwttoken'));
            }
            else{
                this.modalRef=this.modal.show(template);
                setTimeout(() => {
                  this.modalRef.hide();
                }, 4000);
            }
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
