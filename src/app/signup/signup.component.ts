import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
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
      this.dataForm = this.kp.group({
        id: [''],
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ['', Validators.compose([Validators.required, SignupComponent.customValidator])],
        phoneno: ['',Validators.required],
        username: ['',Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
        confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15),
          this.equalToPass('password')
        ])],
        address1: ['',Validators.required],
        address2: [''],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zip: ['',Validators.required],
      });
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
  equalToPass(fieldname): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const input = control.value;
      const isValid = control.root.value[fieldname] === input;
      if (!isValid)
        return {
          equalTo: true
        };
    };
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
              email: [this.datalist[0].email, Validators.compose([Validators.required, SignupComponent.customValidator])],
              phoneno: [this.datalist[0].phoneno,Validators.required],
              username: ['',Validators.required],
              password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
              confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15),
                this.equalToPass('password')
              ])],
              address1: ['',Validators.required],
              address2: [''],
              city: [this.datalist[0].city,Validators.required],
              state: [this.datalist[0].state,Validators.required],
              zip: ['',Validators.required]
            });
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
        signup_step2:1,
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
                email: [userdet.email,Validators.compose([Validators.required, SignupComponent.customValidator])],
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
            this.dataForm.reset();
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
