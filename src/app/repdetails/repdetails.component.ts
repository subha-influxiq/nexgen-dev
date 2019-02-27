import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-repdetails',
  templateUrl: './repdetails.component.html',
  styleUrls: ['./repdetails.component.css'],
  providers: [Commonservices]
})
export class RepdetailsComponent implements OnInit {
public id;
public repdetails;
  public dataForm: FormGroup;
  public kp;
  public states;
  public errormg='';

  constructor(kp: FormBuilder, public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,private cookeiservice: CookieService,private route: ActivatedRoute)
  {
    this.kp = kp;
    this._commonservice=_commonservice;
    this.getstates('states');
  }

  getstates(source){
    this._http.get("assets/data/"+source+".json")
        .subscribe(res => {
          this.states = res;
        }, error => {
          console.log('Oooops!');
        });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.geteditdata();
    });

    this.dataForm = this.kp.group({
      userid: [""],
      username: [""],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: [""],
      phoneno: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      address1: ['',Validators.required],
      address2: ['',Validators.required],
      zip: ['',Validators.required],
      id: [''],
      noofyears: ['',Validators.required],
      primarycare: [''],
      pediatrics: [''],
      podiatrist: [''],
      hospitals_that_outsource: [''],
      nursing: [''],
      other: [''],
      othertext: [''],
      noofpersonallycall: ['',Validators.required],
      calleachoffice: ['',Validators.required],
      noofdirectaccess: ['',Validators.required],
      workinmedicalfield: ['',Validators.required],
      pcrtesting: ['',Validators.required],
      companyname: [''],
    });
  }

  geteditdata() {
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'users',condition:{_id:this.id}})
        .subscribe(res => {
          let result;
          result = res;
        //  console.log(result);
          if(result.status=='error'){
          }else{
            let userdet;
            userdet = result.res[0];
            this.dataForm = this.kp.group({
              userid: [userdet.unique_id],
              username: [userdet.username, Validators.required],
              firstname: [userdet.firstname, Validators.required],
              lastname: [userdet.lastname, Validators.required],
              email: [userdet.email],
              phoneno: [userdet.phoneno,Validators.required],
              city: [userdet.city,Validators.required],
              state: [userdet.state,Validators.required],
              address1: [userdet.address1,Validators.required],
              address2: [userdet.address2],
              zip: [userdet.zip,Validators.required],
              id: [userdet._id],
              noofyears: [userdet.noofyears,Validators.required],
              primarycare: [userdet.primarycare],
              pediatrics: [userdet.pediatrics],
              podiatrist: [userdet.podiatrist],
              hospitals_that_outsource: [userdet.hospitals_that_outsource],
              nursing: [userdet.nursing],
              other: [userdet.other],
              othertext: [userdet.othertext],
              noofpersonallycall: [userdet.noofpersonallycall,Validators.required],
              calleachoffice: [userdet.calleachoffice,Validators.required],
              noofdirectaccess: [userdet.noofdirectaccess,Validators.required],
              workinmedicalfield: [userdet.workinmedicalfield,Validators.required],
              pcrtesting: [userdet.pcrtesting,Validators.required],
              companyname: [userdet.companyname],
            });
          }
        }, error => {
          console.log('Oooops!');
        });
}
  dosubmit(){
    this.errormg='';
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if(this.dataForm.value['other']==true){
      this.dataForm.controls['othertext'].setValidators(Validators.required);
      this.dataForm.controls['othertext'].markAsTouched();
      this.dataForm.controls["othertext"].updateValueAndValidity();
    }
    else{
      this.dataForm.controls['othertext'].clearValidators();
      this.dataForm.controls["othertext"].updateValueAndValidity();
    }
      if(this.dataForm.value['pcrtesting']==1){
      this.dataForm.controls['companyname'].setValidators(Validators.required);
      this.dataForm.controls['companyname'].markAsTouched();
      this.dataForm.controls["companyname"].updateValueAndValidity();
    }else{
      this.dataForm.controls['companyname'].clearValidators();
      this.dataForm.controls["companyname"].updateValueAndValidity();
    }
    if(this.dataForm.value['pcrtesting']!=1){
      this.dataForm.value['companyname'] = null;
    }
    if (this.dataForm.valid) {
      console.log('====');
      let link = this._commonservice.nodesslurl + 'leadsignupquestionnaireupdate?token='+this.cookeiservice.get('jwttoken');
      let data = {
        id: this.dataForm.value['id'],
        username: this.dataForm.value['username'],
        firstname: this.dataForm.value['firstname'],
        lastname: this.dataForm.value['lastname'],
        phoneno: this.dataForm.value['phoneno'],
        city: this.dataForm.value['city'],
        state: this.dataForm.value['state'],
        address1: this.dataForm.value['address1'],
        address2: this.dataForm.value['address2'],
        zip: this.dataForm.value['zip'],
        noofyears: this.dataForm.value['noofyears'],
        primarycare: this.dataForm.value['primarycare'],
        pediatrics: this.dataForm.value['pediatrics'],
        podiatrist: this.dataForm.value['podiatrist'],
        hospitals_that_outsource: this.dataForm.value['hospitals_that_outsource'],
        nursing: this.dataForm.value['nursing'],
        other: this.dataForm.value['other'],
        othertext: this.dataForm.value['othertext'],
        noofpersonallycall: this.dataForm.value['noofpersonallycall'],
        calleachoffice: this.dataForm.value['calleachoffice'],
        noofdirectaccess: this.dataForm.value['noofdirectaccess'],
        workinmedicalfield: this.dataForm.value['workinmedicalfield'],
        pcrtesting: this.dataForm.value['pcrtesting'],
        companyname: this.dataForm.value['companyname']
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
                this.router.navigate(['/rep']);
            }
          }, error => {
            console.log('Oooops!');
          });
    }  
    
  }
}
