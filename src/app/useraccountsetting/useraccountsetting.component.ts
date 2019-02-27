import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-useraccountsetting',
  templateUrl: './useraccountsetting.component.html',
  styleUrls: ['./useraccountsetting.component.css'],
  providers: [Commonservices]
})
export class UseraccountsettingComponent implements OnInit {
 // public alldata: any;
  public dataForm: FormGroup;
  public es;
  public serverurl;
  public states:any=[];
  public issubmitted:any=0;

  constructor(public _commonservices:Commonservices,public cookeiservice:CookieService,public _http:HttpClient,es:FormBuilder)
  {
    this.es=es;
    this.serverurl=_commonservices.nodesslurl;
    this.dataForm=this.es.group({
      datejoin:['',Validators.required],
      userids:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      username:['',Validators.required],
      email:['',Validators.required],
      phonenumber:['',Validators.required],
      address:['',Validators.required],
      address2:[''],
      city:['',Validators.required],
      state:['',Validators.required],
      zip:['',Validators.required],
      accounttype:['',Validators.required],
      owner:['',Validators.required],
     // status:['',Validators.required],
    })
  }

  ngOnInit()
  {
    this.alluserdata();

    this._http.get("assets/data/states.json")
        .subscribe(res => {
          let result;
          this.states=result = res;
          console.log(result);
        }, error => {
          console.log('Oooops!');
          this.states = [];
        });
  }
  alluserdata() {
    const link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, {source: 'rep_view',condition:{_id_object:this.cookeiservice.get('userid')}})
        .subscribe(res => {
          let result:any={};
          result = res;
          console.log('result.....');
          console.log(result);
          let onedata=[];
          onedata=result.res;
          console.log('onedata');
          console.log(onedata);
          this.dataForm.controls['datejoin'].patchValue(onedata[0].created_at);
          this.dataForm.controls['userids'].patchValue(onedata[0].unique_id);
          this.dataForm.controls['firstname'].patchValue(onedata[0].firstname);
          this.dataForm.controls['lastname'].patchValue(onedata[0].lastname);
          this.dataForm.controls['username'].patchValue(onedata[0].username);
          this.dataForm.controls['email'].patchValue(onedata[0].email);
          this.dataForm.controls['phonenumber'].patchValue(onedata[0].phoneno);
          this.dataForm.controls['address'].patchValue(onedata[0].address1);
          this.dataForm.controls['address2'].patchValue(onedata[0].address2);
          this.dataForm.controls['city'].patchValue(onedata[0].city);
          this.dataForm.controls['state'].patchValue(onedata[0].state);
          this.dataForm.controls['zip'].patchValue(onedata[0].zip);
          this.dataForm.controls['accounttype'].patchValue(onedata[0].type);
          this.dataForm.controls['owner'].patchValue(onedata[0].recruiter);
          //this.dataForm.controls['status'].patchValue(onedata[0].status);

        })
  }
  formsubmit(){
    console.log('form submit');
    this.issubmitted=1;
    console.log(this.dataForm.valid);

    if(this.dataForm.valid){
      let data:any={};
      data.id=this.cookeiservice.get('userid');
      data.firstname=this.dataForm.controls['firstname'].value;
      data.lastname=this.dataForm.controls['lastname'].value;
      data.phonenumber=this.dataForm.controls['phonenumber'].value;
      data.address=this.dataForm.controls['address'].value;
      data.address2=this.dataForm.controls['address2'].value;
      data.city=this.dataForm.controls['city'].value;
      data.state=this.dataForm.controls['state'].value;
      data.zip=this.dataForm.controls['zip'].value;
      const link = this._commonservices.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
      this._http.post(link, {source: 'users',data:data})
          .subscribe(res => {
            let result:any={};
            result = res;
            console.log('result.....');
            console.log(result);

          });
    }
  }

}
