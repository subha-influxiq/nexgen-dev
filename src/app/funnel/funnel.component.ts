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
  public firstresult;
  public errormg;
  public serverurl;
  public states;
  public regionalrecruiter_id;
  public issubmit=0;

  public message=null;
  modalRef: BsModalRef;

  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient ,private cookeiservice: CookieService,public modal:BsModalService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
    this.getstates('states');
    // console.log(moment(result.item[23].created_at).format('YYYY MM DD'));
    this.calltoken();
  }

  calltoken(){
    let link = this._commonservices.nodesslurl + 'temptoken';
    let data={};
    this._http.post(link,data)
        .subscribe(res => {
          let result:any ={};
          result = res;
          console.log('result....');
          console.log(result);
          if(result.status=='success') {
            this.cookeiservice.set('jwttoken', result.token);
          }
        }, error => {
          console.log('Oooops!');
        });
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
   //   email: ['', Validators.compose([Validators.required, FunnelComponent.customValidator])],
      email: ["", FunnelComponent.validateEmail],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      phoneno: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
    //  regionalrecruiter_id: ['']
    });
    this.dataForm1 = this.kp.group({
    //  email: ['', Validators.compose([Validators.required, FunnelComponent.customValidator])],
      email: ["", FunnelComponent.validateEmail],
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
      // calleachofficeradio: ['',Validators.required],
     calleachoffice: [''],
     calleachoffice1: [''],
     calleachoffice2: [''],
      noofdirectaccess: ['',Validators.required],
      workinmedicalfield: ['',Validators.required],
      pcrtesting: ['',Validators.required],
      companyname: [''],
   //   regionalrecruiter_id: ['']
    });
  }

 /* static customValidator(inputemail): any {
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
  }*/
  static validateEmail(control: FormControl){
    if(control.value==''){
      return { 'invalidemail': true };
    }

    /*if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){*/
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (String(control.value).search(filter) == -1) {
      return { 'invalidemail': true };
    }
  }
  dosubmit(template:TemplateRef<any>) {

    this.issubmit=1;
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
        type: this._commonservices.roletypes[2].type2,
      };
    //  this.dataForm.patchValue({regionalrecruiter_id : this.regionalrecruiter_id});
      this._http.post(link, data)
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('result....');
            console.log(result);
            this.firstresult=result;
            this.issubmit=0;
            if(result.status=='error') {
              this.message=result.msg;
              this.modalRef = this.modal.show(template, {class: 'funnel_modal'});
            }
            if(result.status=='success') {
          /*    this.cookeiservice.set('userid', result.item._id);
              this.cookeiservice.set('jwttoken', result.token);
              this.cookeiservice.set('useremail', result.item.email);
              this.cookeiservice.set('userfirstname', result.item.firstname);
              this.cookeiservice.set('userlastname', result.item.lastname);
              this.cookeiservice.set('usertype', result.item.type);*/
              this.dataForm.reset();
              this.dataForm.value['state']='';
              $('html, body').animate({
                scrollTop: $("#alanding_bootmblock_wrapper").offset().top
              }, 2000);
              let userdet = result.item;
              this.dataForm1 = this.kp.group({
                firstname: [userdet.firstname, Validators.required],
                lastname: [userdet.lastname, Validators.required],
             //   email: [userdet.email,Validators.compose([Validators.required, FunnelComponent.customValidator])],
                email: [userdet.email, FunnelComponent.validateEmail],
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
             //  calleachofficeradio: ['',Validators.required],
                calleachoffice: [''],
                 calleachoffice1: [''],
                calleachoffice2: [''],
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
      console.log('email');
      console.log(this.dataForm1.value['email']);
      if(this.dataForm1.value['email']==null || this.dataForm1.value['email']==''){
          let x:any;
          for (x in this.dataForm1.controls) {
              this.dataForm1.controls[x].markAsTouched();
          }
          console.log(this.dataForm1.valid);
          this.issubmit=1;
      }else{
          this.issubmit=0;
   // console.log('1');
 //   console.log(this.dataForm1.value['id']);
    if(this.dataForm1.value['id']==''){
      let link = this._commonservices.nodesslurl + 'leadsignup';
      let data = {
        email: this.dataForm1.value['email'],
        firstname: this.dataForm1.value['firstname'],
        lastname: this.dataForm1.value['lastname'],
        phoneno: this.dataForm1.value['phoneno'],
        city: this.dataForm1.value['city'],
        state: this.dataForm1.value['state'],
        regionalrecruiter_id: this.regionalrecruiter_id,
        lead_step:1,
        type: this._commonservices.roletypes[2].type2
      };
      console.log('2');
      this._http.post(link, data)
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('3');
            console.log('result....');
            console.log(result);
            console.log('4');
            this.firstresult=result;
            console.log('this.firstresult');
            console.log(this.firstresult);
            if(result.status=='error') {
              this.message=result.msg;
              this.modalRef = this.modal.show(template, {class: 'funnel_modal'});
            }
            else{  this.cookeiservice.set('jwttoken', result.token);
             /* this.cookeiservice.set('userid', result.item._id);
              this.cookeiservice.set('jwttoken', result.token);
              this.cookeiservice.set('useremail', result.item.email);
              this.cookeiservice.set('userfirstname', result.item.firstname);
              this.cookeiservice.set('userlastname', result.item.lastname);
              this.cookeiservice.set('usertype', result.item.type);*/
              let userdet = result.item;
              this.dataForm1.controls['id'].patchValue(userdet._id);

              this.calldosubmit1(template);
    }
          }, error => {
            console.log('Oooops!');
          });
    }
    else{
      this.calldosubmit1(template);
    }
      }
  }
  calldosubmit1(template:TemplateRef<any>){
    console.log('calldosubmit1');
  this.issubmit=1;
  let x: any;
  for (x in this.dataForm1.controls) {
  this.dataForm1.controls[x].markAsTouched();
  console.log(this.dataForm1.controls[x].valid);
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
console.log('valid - '+this.dataForm1.valid);
if (this.dataForm1.valid) {
  let lockunlockval;
  lockunlockval=0;
  if(this.dataForm1.value['noofclinics']<12) {
    lockunlockval = 1;
  }
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
  //   calleachofficeradio:  this.dataForm1.value['calleachofficeradio'],
   calleachoffice: this.dataForm1.value['calleachoffice'],
   calleachoffice1: this.dataForm1.value['calleachoffice1'],
   calleachoffice2: this.dataForm1.value['calleachoffice2'],
    noofdirectaccess:  this.dataForm1.value['noofdirectaccess'],
    workinmedicalfield:  this.dataForm1.value['workinmedicalfield'],
    pcrtesting:  this.dataForm1.value['pcrtesting'],
    companyname:  this.dataForm1.value['companyname'],
    regionalrecruiter_id: this.regionalrecruiter_id,
    questionnaire_step:1,
    lock:lockunlockval
  };
  this._http.post(link, {data:data,sourceobj:objarr})
      .subscribe(res => {
        let result:any ={};
        result = res;
        console.log('result....');
        console.log(result);
        this.issubmit=0;
        if(result.status=='error'){
          this.errormg=result.msg;
        }
        if(result.status=='success') {
          console.log(this.dataForm1.value['noofclinics']);
          if(this.dataForm1.value['noofclinics']>=12){
            console.log('this.firstresult');
            console.log(this.firstresult);
            this.cookeiservice.set('userid', this.dataForm1.value['id']);
            this.cookeiservice.set('jwttoken', this.firstresult.item.token);
            this.cookeiservice.set('useremail', this.dataForm1.value['email']);
            this.cookeiservice.set('userfirstname', this.dataForm1.value['firstname']);
            this.cookeiservice.set('userlastname', this.dataForm1.value['lastname']);
            this.cookeiservice.set('usertype', this.firstresult.item.type);
            this.router.navigate(['/signup',this.dataForm1.value['id']]);
          }else{
            // this.message='You have done your business with less than 40 clinics';
            this.message='We appreciate your interest in becoming a NexGen Testing Sales Rep. While you were not selected for this position, we encourage you to apply again in the future for openings that match your qualifications.';
            this.modalRef = this.modal.show(template, {class: 'funnel_modal'});

            setTimeout(() => {
              this.modalRef.hide();
              this.dataForm1.reset();
              this.dataForm1.value['state']='';
              this.router.navigate(['/']);
            }, 15000);
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
    if(val==0) con={state:[this.dataForm.value['state']],source:'statewise_regional_rep_view'}
    if(val==1) con={state:[this.dataForm1.value['state']],source:'statewise_regional_rep_view'}
  //  "state": ["TX"]

console.log('con========================');
console.log(con);

    this._http.post(link,con)
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
  hide(){
    this.modalRef.hide();
  }
    setvalforcalleach(item){
        this.dataForm1.patchValue({calleachoffice : false});
        this.dataForm1.patchValue({calleachoffice1 : false});
        this.dataForm1.patchValue({calleachoffice2 : false});
      setTimeout(()=>{
          this.dataForm1.controls[item].patchValue(true);
      },100);
    }
}
