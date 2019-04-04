import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
declare  var $:any;

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
  public ownerlists;
  public istypeadmin: boolean ;
  public id;
  public onedatarecruiter;
  public states:any=[];
  public issubmitted:any=0;
    modalRef: BsModalRef;

  constructor(public _commonservices:Commonservices,public cookeiservice:CookieService,public _http:HttpClient,es:FormBuilder,public modal:BsModalService, public route:ActivatedRoute)
  {
    this.es=es;
    this.serverurl=_commonservices.nodesslurl;
    this.dataForm=this.es.group({
      datejoin:['',Validators.required],
      userids:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      username:[''],
      password:[''],
      confirmpassword:[''],
      email:['',Validators.required],
      phonenumber:['',Validators.required],
      address:[''],
      address2:[''],
      city:['',Validators.required],
      state:['',Validators.required],
      zip:['',Validators.required],
      accounttype:['',Validators.required],
      owner:[''],
     // status:['',Validators.required],
    })

      if(this.cookeiservice.get('usertype')=='admin'){
        this.istypeadmin = true;
      }else{
          this.istypeadmin = false;
      }
  }

  ngOnInit()
  {
      this.ownerlist();
      this.route.params.subscribe(params => {
          this.id=params['id'];
          this.alluserdata();
      })

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
        let sourcecondition;
        if(this.id!=null)sourcecondition = this.id;
        else sourcecondition = this.cookeiservice.get('userid');

        const link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        // this._http.post(link, {source: 'rep_view',condition:{_id_object:this.cookeiservice.get('userid')}})
        this._http.post(link, {source: 'user_view',condition:{_id_object:sourcecondition}})
            .subscribe(res => {
                let result:any={};
                result = res;
              //  console.log('result.....');
              //  console.log(result);
                let onedata=[];
                onedata=result.res;
                if(result.res[0].recruiter!=null)this.onedatarecruiter=result.res[0].recruiter;
                console.log('onedata');
                console.log(onedata);
                console.log(this.onedatarecruiter);
                if(onedata[0].created_at!=null)this.dataForm.controls['datejoin'].patchValue(this._commonservices.showunixtodate1(onedata[0].created_at));
                else this.dataForm.controls['datejoin'].patchValue(onedata[0].created_at);
                this.dataForm.controls['userids'].patchValue(onedata[0].unique_id);
                this.dataForm.controls['firstname'].patchValue(onedata[0].firstname);
                this.dataForm.controls['lastname'].patchValue(onedata[0].lastname);
                this.dataForm.controls['username'].patchValue(onedata[0].username);
                this.dataForm.controls['email'].patchValue(onedata[0].email);
                this.dataForm.controls['phonenumber'].patchValue(onedata[0].phoneno);
                this.dataForm.controls['address'].patchValue(onedata[0].address);
                this.dataForm.controls['address2'].patchValue(onedata[0].address1);
                this.dataForm.controls['city'].patchValue(onedata[0].city);
                this.dataForm.controls['state'].patchValue(onedata[0].state);
                this.dataForm.controls['zip'].patchValue(onedata[0].zip);
                this.dataForm.controls['accounttype'].patchValue(onedata[0].type);
                this.dataForm.controls['owner'].patchValue(onedata[0].regionalrecruiter_id);
              // this.dataForm.controls['owner'].patchValue(onedata[0].recruiter);
                //this.dataForm.controls['status'].patchValue(onedata[0].status);

            })

    }

    ownerlist() {
        const link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, {source: 'users',condition:{type:'regional_recruiter'}})
            .subscribe(res => {
                let result:any={};
                result = res;
               // console.log('result.....');
               // console.log(result);
                 this.ownerlists=[];
                this.ownerlists=result.res;
                console.log('this.ownerlists');
                console.log(this.ownerlists);
            })
    }
    goback(){
        window.history.back();
    }

    formsubmit(template:TemplateRef<any>){
        this.dataForm.controls['confirmpassword'].clearValidators();
        this.dataForm.controls["confirmpassword"].updateValueAndValidity();
        console.log('form submit');
        this.issubmitted=1;
        if((this.id==null ||  this.id!=null && this.cookeiservice.get('usertype')=='admin') && (this.dataForm.controls['password'].value!=null && this.dataForm.controls['password'].value!='')){
            this.dataForm.controls['confirmpassword'].setValidators(Validators.compose([Validators.required, this.equalToPass('password')]));
            this.dataForm.controls['confirmpassword'].markAsTouched();
            this.dataForm.controls["confirmpassword"].updateValueAndValidity();
        }
        console.log(this.dataForm.valid);

        if(this.dataForm.valid){
            let data:any={};

            if(this.id!=null) data.id = this.id;
            else  data.id = this.cookeiservice.get('userid');
           // data.id=this.cookeiservice.get('userid');

            data.firstname=this.dataForm.controls['firstname'].value;
            data.lastname=this.dataForm.controls['lastname'].value;
            data.phonenumber=this.dataForm.controls['phonenumber'].value;
            data.address=this.dataForm.controls['address'].value;
            data.address2=this.dataForm.controls['address2'].value;
            data.city=this.dataForm.controls['city'].value;
            data.state=this.dataForm.controls['state'].value;
            data.zip=this.dataForm.controls['zip'].value;
            data.regionalrecruiter_id=this.dataForm.controls['owner'].value;
            console.log(this.dataForm.controls['password'].value);
            if(this.dataForm.controls['password'].value!=null && this.dataForm.controls['password'].value!=''){
               data.password=this.dataForm.controls['password'].value;
            }
            const link = this._commonservices.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
            this._http.post(link, {source: 'users',data:data,sourceobj:['regionalrecruiter_id']})
                .subscribe(res => {
                    let result:any={};
                    result = res;
                    console.log('result.....');
                    console.log(result);
                    if(result.status=='success') {
                        this.modalRef = this.modal.show(template, {class: 'successmodal'});
                        setTimeout(()=>{
                            this.modalRef.hide();
                        },2000);
                    }
                });
        }
    }
    equalToPass(fieldname): ValidatorFn {                                 //password match custom function
        return (control: AbstractControl): { [key: string]: any } => {      ///abstractcontrol function call here with key string any type

            let input = control.value;      //class create here
            let isValid = control.root.value[fieldname] == input;       //value valid or not
            if (!isValid)
                return{
                    equalTo:true            //this value will be called
                };
        };
    }
}
