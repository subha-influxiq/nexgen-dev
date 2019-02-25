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
  public regionalrecruiter_id;
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
    //  regionalrecruiter_id: ['']
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
      other: [''],
      othertext: [''],
      noofpersonallycall: ['',Validators.required],
      calleachoffice: ['',Validators.required],
      noofdirectaccess: ['',Validators.required],
      workinmedicalfield: ['',Validators.required],
      pcrtesting: ['',Validators.required],
      companyname: [''],
   //   regionalrecruiter_id: ['']
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
   // console.log(this.dataForm.value['state']);
    // console.log(this.dataForm.value['email']);
    this.errormg='';
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid) {
      let link = this._commonservices.nodesslurl + 'leadsignup';
      let data = {
        email: this.dataForm.value['email'],
        firstname: this.dataForm.value['firstname'],
        lastname: this.dataForm.value['lastname'],
        phoneno: this.dataForm.value['phoneno'],
        city: this.dataForm.value['city'],
        state: this.dataForm.value['state'],
        regionalrecruiter_id: this.regionalrecruiter_id,
        lead_step:1,
        type: this._commonservices.roletypes[2].type2
      };
    //  this.dataForm.patchValue({regionalrecruiter_id : this.regionalrecruiter_id});
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
                other: [''],
                othertext: [''],
                noofpersonallycall: ['',Validators.required],
                calleachoffice: ['',Validators.required],
                noofdirectaccess: ['',Validators.required],
                workinmedicalfield: ['',Validators.required],
                pcrtesting: ['',Validators.required],
                companyname: ['',Validators.required],
            //    regionalrecruiter_id: ['']
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

    if(this.dataForm1.value['other']==true){
      this.dataForm1.controls['othertext'].setValidators(Validators.required);
      this.dataForm1.controls['othertext'].markAsTouched();
      this.dataForm1.controls["othertext"].updateValueAndValidity();
    }
    else{
     // this.dataForm1.controls['othertext'].clearAsyncValidators();
      this.dataForm1.controls['othertext'].clearValidators();
      this.dataForm1.controls["othertext"].updateValueAndValidity();
    }
    if(this.dataForm1.value['pcrtesting']==1){
      this.dataForm1.controls['companyname'].setValidators(Validators.required);
      this.dataForm1.controls['companyname'].markAsTouched();
      this.dataForm1.controls["companyname"].updateValueAndValidity();
    }else{
      this.dataForm1.controls['companyname'].clearValidators();
      this.dataForm1.controls["companyname"].updateValueAndValidity();
    }
    if(this.dataForm1.value['pcrtesting']!=1){
      this.dataForm1.value['companyname'] = null;
    }

    if (this.dataForm1.valid) {
      let objarr=['regionalrecruiter_id'];
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
        othertext:  this.dataForm1.value['othertext'],
        noofpersonallycall:  this.dataForm1.value['noofpersonallycall'],
        calleachoffice: this.dataForm1.value['calleachoffice'],
        noofdirectaccess:  this.dataForm1.value['noofdirectaccess'],
        workinmedicalfield:  this.dataForm1.value['workinmedicalfield'],
        pcrtesting:  this.dataForm1.value['pcrtesting'],
        companyname:  this.dataForm1.value['companyname'],
        regionalrecruiter_id: this.regionalrecruiter_id,
        questionnaire_step:1,
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
  addregional_recruiter(val){
    this.regionalrecruiter_id=null;
    // const link = this._commonservices.nodesslurl+'getregionalrecruiter?token='+this.cookeiservice.get('jwttoken');
    const link = this._commonservices.nodesslurl+'getregionalrecruiter';
    let con;
    if(val==0) con={state: this.dataForm.value['state']}
    if(val==1) con={state: this.dataForm1.value['state']}
    this._http.post(link,{source:'statewise_regional_rep_view',condition:con})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
          }else{
            console.log(result.res);
            if(result.res.length>0){
              this.regionalrecruiter_id=result.res[0]._id;
            }
          }
        }, error => {
          console.log('Oooops!');
        });
  }
}
