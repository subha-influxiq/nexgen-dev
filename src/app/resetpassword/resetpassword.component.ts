import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers: [Commonservices]
})
export class ResetpasswordComponent implements OnInit {
  public dataForm: FormGroup;
  public fb;
  static invalidpassword;
  public addcookie: CookieService;
  public cookiedetails;
  public serverurl;
  public passmatchvalidate;
  public is_error;
  public accesscode;
  public userdetails;
  public modalpasswordupdated;
  public sourceconditionval;
  public id;
  modalRef: BsModalRef;
  public issubmit=0;

  constructor(fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _http: HttpClient ,private cookie: CookieService,public modal:BsModalService) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accesscode = params['id'];
      console.log(this.accesscode);
      this.getuserdetails();
    });
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      confirmpassword: ["", Validators.required]
    },{validator: this.matchingPasswords('password', 'confirmpassword')});
  }




  getuserdetails() {
    this.sourceconditionval ={accesscode:this.accesscode};
    const link = this._commonservices.nodesslurl+'datalist2';
    this._http.post(link,{source:'users',condition:this.sourceconditionval})
        .subscribe(res=>{
          let result:any;
          result=res;
          this.userdetails=result.res;
          console.log('this.userdetails------------');
          console.log(this.userdetails);
          this.id = this.userdetails[0]._id;
          console.log(this.id);
        })
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup): {[key: string]: any} => {

      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value){
        confirmPassword.setErrors({'incorrect': true});
        console.log('true');
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  dosubmit(formval,template:TemplateRef<any>) {
    this.issubmit=1;
    console.log(this.dataForm.valid);
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    this.is_error = 0;
    if (this.dataForm.valid ) {
      let link = this._commonservices.nodesslurl + 'newpassword';
      let data = {id: this.id, password: formval.password};
      this._http.post(link, data)
          .subscribe(res => {
            let result:any;
            result=res;
            console.log(result);
            this.issubmit=0;
            if (result.status == 'success') {
              this.modalRef = this.modal.show(template, {class: 'successmodal'});
              setTimeout(() => {
                this.modalRef.hide();
                this.router.navigate(['/login']);
              }, 3000);
            }
            else {
              this.is_error = 'Some internal problem happened! Please try again later.';
            }
          }, error => {
            console.log('Oooops!');
          });
    }


  }
  onHidden() {
    this.modalpasswordupdated = false;
    this.router.navigate(['/']);
  }
}
