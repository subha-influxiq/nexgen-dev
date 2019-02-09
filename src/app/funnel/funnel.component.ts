import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

declare var $: any;
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

  dosubmit(formval) {
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
        email: formval.email,
        firstname: formval.firstname,
        lastname: formval.lastname,
        phoneno: formval.phoneno,
        city: formval.city,
        state: formval.state,
        lead_step:1,
        type: 'rep',
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
              $('html, body').animate({
                scrollTop: $("#funnel_block1_2").offset().top
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
  dosubmit1(formval,template:TemplateRef<any>){
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid) {
      let link = this._commonservices.nodesslurl + 'leadsignupquestionnaireupdate?token='+this.cookeiservice.get('jwttoken');
      let data = {
        id: formval.id,
        email: formval.email,
        firstname: formval.firstname,
        lastname: formval.lastname,
        phoneno: formval.phoneno,
        city: formval.city,
        state: formval.state,
        noofyears:formval.noofyears,
        noofclinics: formval.noofclinics,
        primarycare: formval.primarycare,
        pediatrics: formval.pediatrics,
        podiatrist: formval.podiatrist,
        hospitals_that_outsource: formval.hospitals_that_outsource,
        nursing: formval.nursing,
        homesorhomehealthcare: formval.homesorhomehealthcare,
        other: formval.other,
        noofpersonallycall: formval.noofpersonallycall,
        calleachoffice: formval.calleachoffice,
        noofdirectaccess: formval.noofdirectaccess,
        workinmedicalfield: formval.workinmedicalfield,
        pcrtesting: formval.pcrtesting,
        companyname: formval.companyname,
        questionnaire_step:1,
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
             if(formval.noofclinics>40){
               this.router.navigate(['/signup']);
             }else{
               this.message='You have done your business with less than 40 clinics';
               this.modalRef=this.modal.show(template);
               setTimeout(() => {
                 this.modalRef.hide();
               }, 2000);
             }
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
