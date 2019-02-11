import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

declare var $: any;
//declare var moment: any;
@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.css'],
  providers: [Commonservices],
})
export class FunnelComponent implements OnInit {
  public dataForm: FormGroup;
  public dataForm1: FormGroup;
  public kp;
  public serverurl;
  public states;
  public errormg='';
  public message=null;
  modalRef: BsModalRef;

  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient ,private cookeiservice: CookieService,public modal:BsModalService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
    this.getstates('states');
   // console.log(moment(result.item[23].created_at).format('YYYY MM DD'));

  }
  getstates(source){
    this._http.get("assets/data/"+source+".json")
        .subscribe(res => {
          this.states = res;
          //  console.log(this.states);
        }, error => {
          console.log('Oooops!');
        });
  }
  ngOnInit() {
    this.dataForm = this.kp.group({
      email: ['', Validators.compose([Validators.required, FunnelComponent.customValidator])],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      phoneno: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
    });
    this.dataForm1 = this.kp.group({
      email: ['', Validators.compose([Validators.required, FunnelComponent.customValidator])],
      id: [''],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      phoneno: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      noofyears: ['',Validators.required],
      noofclinics: ['',Validators.required],
      primarycare: [''],
      pediatrics: [''],
      podiatrist: [''],
      hospitals_that_outsource: [''],
      nursing: [''],
      homesorhomehealthcare: [''],
      other: ['',Validators.required],
      noofpersonallycall: ['',Validators.required],
      calleachoffice: ['',Validators.required],
      noofdirectaccess: ['',Validators.required],
      workinmedicalfield: ['',Validators.required],
      pcrtesting: ['',Validators.required],
      companyname: ['',Validators.required],
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

  dosubmit() {
    // console.log(this.dataForm.value['email']);
    this.errormg='';
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
      console.log(this.dataForm.controls[x].valid);
    }
    console.log("this.dataForm.value");
    console.log(this.dataForm.value);
    console.log("this.dataForm.valid");
    console.log(this.dataForm.valid);

    if (this.dataForm.valid) {
      let link = this._commonservices.nodesslurl + 'leadsignup';
      let data = {
        email: this.dataForm.value['email'],
        firstname: this.dataForm.value['firstname'],
        lastname: this.dataForm.value['lastname'],
        phoneno: this.dataForm.value['phoneno'],
        city: this.dataForm.value['city'],
        state: this.dataForm.value['state'],
        lead_step:1,
        type: this._commonservices.roletypes[2].type2
      };
      this._http.post(link, data)
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('result....');
            console.log(result);
            if(result.status=='error'){
              this.errormg=result.msg;
            }
            if(result.status=='success') {
              this.cookeiservice.set('userid', result.item._id);
              this.cookeiservice.set('jwttoken', result.token);
              this.cookeiservice.set('useremail', result.item.email);
              this.cookeiservice.set('userfirstname', result.item.firstname);
              this.cookeiservice.set('userlastname', result.item.lastname);
              this.cookeiservice.set('usertype', result.item.type);
              this.dataForm.reset();
              this.dataForm.value['state']='';
              $('html, body').animate({
                scrollTop: $("#alanding_bootmblock_wrapper").offset().top
              }, 2000);
              let userdet = result.item;
              this.dataForm1 = this.kp.group({
                firstname: [userdet.firstname, Validators.required],
                lastname: [userdet.lastname, Validators.required],
                email: [userdet.email,Validators.compose([Validators.required, FunnelComponent.customValidator])],
                phoneno: [userdet.phoneno,Validators.required],
                city: [userdet.city,Validators.required],
                state: [userdet.state,Validators.required],
                id: [userdet._id],
                noofyears: ['',Validators.required],
                noofclinics: ['',Validators.required],
                primarycare: [''],
                pediatrics: [''],
                podiatrist: [''],
                hospitals_that_outsource: [''],
                nursing: [''],
                homesorhomehealthcare: [''],
                other: ['',Validators.required],
                noofpersonallycall: ['',Validators.required],
                calleachoffice: ['',Validators.required],
                noofdirectaccess: ['',Validators.required],
                workinmedicalfield: ['',Validators.required],
                pcrtesting: ['',Validators.required],
                companyname: ['',Validators.required]
              });
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
  dosubmit1(template:TemplateRef<any>){
    let x: any;
    for (x in this.dataForm1.controls) {
      this.dataForm1.controls[x].markAsTouched();
    }
// console.log(this.da);
    if (this.dataForm1.valid) {
      let link = this._commonservices.nodesslurl + 'leadsignupquestionnaireupdate?token='+this.cookeiservice.get('jwttoken');
      let data = {
        id: this.dataForm1.value['id'],
        email: this.dataForm1.value['email'],
        firstname: this.dataForm1.value['firstname'],
        lastname: this.dataForm1.value['lastname'],
        phoneno: this.dataForm1.value['phoneno'],
        city: this.dataForm1.value['city'],
        state: this.dataForm1.value['state'],
        noofyears: this.dataForm1.value['noofyears'],
        noofclinics: this.dataForm1.value['noofclinics'],
        primarycare: this.dataForm1.value['primarycare'],
        pediatrics: this.dataForm1.value['pediatrics'],
        podiatrist: this.dataForm1.value['podiatrist'],
        hospitals_that_outsource:  this.dataForm1.value['hospitals_that_outsource'],
        nursing:  this.dataForm1.value['nursing'],
        homesorhomehealthcare:  this.dataForm1.value['homesorhomehealthcare'],
        other:  this.dataForm1.value['other'],
        noofpersonallycall:  this.dataForm1.value['noofpersonallycall'],
        calleachoffice: this.dataForm1.value['calleachoffice'],
        noofdirectaccess:  this.dataForm1.value['noofdirectaccess'],
        workinmedicalfield:  this.dataForm1.value['workinmedicalfield'],
        pcrtesting:  this.dataForm1.value['pcrtesting'],
        companyname:  this.dataForm1.value['companyname'],
        questionnaire_step:1,
      };
      this._http.post(link, {data:data})
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('result....');
            console.log(result);
            if(result.status=='error'){
              this.errormg=result.msg;
            }
            if(result.status=='success') {
              console.log(this.dataForm1.value['noofclinics']);
              if(this.dataForm1.value['noofclinics']>40){
                this.router.navigate(['/signup',this.dataForm1.value['id']]);
              }else{
                this.message='You have done your business with less than 40 clinics';
                this.modalRef=this.modal.show(template);
                setTimeout(() => {
                  this.modalRef.hide();
                  this.dataForm1.reset();
                  this.dataForm1.value['state']='';
                }, 2000);
              }
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
