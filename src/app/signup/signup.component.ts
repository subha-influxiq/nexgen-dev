import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [Commonservices],
})
export class SignupComponent implements OnInit {
  public dataForm: FormGroup;
  public kp;
  public id;
  public states;
  public serverurl;
  public datalist;
  public errormg='';
  public message=null;
  modalRef: BsModalRef;
  public sourceconditionval:any;
  public sourceval='users';

  constructor(kp: FormBuilder, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, private _http: HttpClient ,private cookeiservice: CookieService,public modal:BsModalService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
    this.getstates('states');
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id=params['id'];
      console.log(this.id);
      this.sourceconditionval ={_id:this.id};
      this.getsignupdetails();
      this.dataForm =  this.kp.group({
        id: [''],
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ["", SignupComponent.validateEmail],
        phoneno: ['',Validators.required],
       // username: ['',Validators.required],
        username: ["", SignupComponent.validateUsername],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
        confirmpassword: ["", Validators.required],
        address1: ['',Validators.required],
        address2: [''],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zip: ['',Validators.required],
        regionalrecruiter_id: [''],
      },{validator: this.matchingPasswords('password', 'confirmpassword')});
    });
  }
  getstates(source){
    this._http.get("assets/data/"+source+".json")
        .subscribe(res => {
          this.states = res;
        }, error => {
          console.log('Oooops!');
        });
  }

  static validateUsername(control: FormControl){
    if(control.value==''){
      return { 'invalidusername': true };
    }

    if ( !control.value.match(/^\S*$/)){
      return { 'invalidusername': true };
    }
  }

  static validateEmail(control: FormControl){
    if(control.value==''){
      return { 'invalidemail': true };
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      return { 'invalidemail': true };
    }
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
  getsignupdetails() {
    const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:this.sourceval,condition:this.sourceconditionval})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
            this.router.navigate(['/']);
          }else{
            this.datalist = [];
            this.datalist = result.res;
            console.log('datalist:');
            console.log(this.datalist);
            if(this.datalist.length>0){
            this.dataForm = this.kp.group({
              id: [this.id],
              firstname: [this.datalist[0].firstname,Validators.required],
              lastname: [this.datalist[0].lastname,Validators.required],
              email: [this.datalist[0].email, SignupComponent.validateEmail],
              phoneno: [this.datalist[0].phoneno,Validators.required],
              username: ["", SignupComponent.validateUsername],
              password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
              confirmpassword: ["", Validators.required],
              address1: ['',Validators.required],
              address2: [''],
              city: [this.datalist[0].city,Validators.required],
              state: [this.datalist[0].state,Validators.required],
              regionalrecruiter_id: [this.datalist[0].regionalrecruiter_id],
              zip: ['',Validators.required],
            },{validator: this.matchingPasswords('password', 'confirmpassword')});
            }
          }
        }, error => {
          console.log('Oooops!');
          this.datalist = [];
        });
  }
  dosubmit() {
    this.errormg='';
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
      console.log(this.dataForm.controls[x].valid);
    }
    if (this.dataForm.valid) {
      let link = this._commonservices.nodesslurl + 'leadsignupquestionnaireupdate?token='+this.cookeiservice.get('jwttoken');
      let objarr=['regionalrecruiter_id'];
      let data = {
        id: this.dataForm.value['id'],
        firstname: this.dataForm.value['firstname'],
        lastname: this.dataForm.value['lastname'],
        email: this.dataForm.value['email'],
        phoneno: this.dataForm.value['phoneno'],
        username: this.dataForm.value['username'],
        password: this.dataForm.value['password'],
        address1: this.dataForm.value['address1'],
        address2: this.dataForm.value['address2'],
        city: this.dataForm.value['city'],
        state: this.dataForm.value['state'],
        zip: this.dataForm.value['zip'],
        regionalrecruiter_id: this.dataForm.value['regionalrecruiter_id'],
        signup_step2:1,
      };
      this._http.post(link, {data:data,sourceobj:objarr})
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('result....');
            console.log(result);
            if(result.status=='error'){
              this.errormg=result.msg;
            }
            if(result.status=='success') {
          //  this.dataForm.reset();
              this.router.navigate(['/contract']);
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
  addregional_recruiter(){
    const link = this._commonservices.nodesslurl+'getregionalrecruiter?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'statewise_regional_rep_view',condition:{state: this.dataForm.value['state']}})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
          }else{
            console.log(result.res);
            if(result.res.length>0){
              this.dataForm.patchValue({regionalrecruiter_id : result.res[0]._id});
            }
          }
        }, error => {
          console.log('Oooops!');
        });
  }
}
