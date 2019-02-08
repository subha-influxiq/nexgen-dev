import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient ,private cookeiservice: CookieService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
  /*  this.states=listing.getselectdata('states',0);
    console.log(this.states);*/
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
      noofclinics: ['',Validators.required],
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
             $("#funnel_block1_2").offset().top;
                let userdet = result.item;
                this.dataForm1 = this.kp.group({
                  firstname: [userdet.firstname, Validators.required],
                  lastname: [userdet.lastname, Validators.required],
                  email: [userdet.email,Validators.compose([Validators.required, FunnelComponent.customValidator])],
                  phoneno: [userdet.phoneno,Validators.required],
                  city: [userdet.city,Validators.required],
                  state: [userdet.state,Validators.required],
                  id: [userdet._id],
                  noofclinics: ['',Validators.required]
                });
            /*
              if (result.msg.type == 'admin' || result.msg.type == 'brand' || result.msg.type == 'Customerservice') {
                this.router.navigate(['/dashboard']);
              }
              if (result.msg.type == 'employee') {
                this.router.navigate(['/training']);
              }*/
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
  dosubmit1(formval){
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
      let link = this._commonservices.nodesslurl + 'leadsignupupdate?token='+this.cookeiservice.get('jwttoken');
      let data = {
        id: formval.id,
        email: formval.email,
        firstname: formval.firstname,
        lastname: formval.lastname,
        phoneno: formval.phoneno,
        city: formval.city,
        state: formval.state,
        noofclinics: formval.noofclinics
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
              console.log('login success');
              this.cookeiservice.set('userid', result.id);
              this.cookeiservice.set('jwttoken', result.token);
              //  $( "p:last" ).text( "scrollTop:" + p.scrollTop() );
              $("#funnel_block1_2").offset().top;
              /*  console.log(result.msg.type);
               this.cookeiservice.set('useremail', result.msg.email);
               this.cookeiservice.set('userfirstname', result.msg.firstname);
               this.cookeiservice.set('userlastname', result.msg.lastname);
               this.cookeiservice.set('usertype', result.msg.type);
               if (result.msg.type == 'admin' || result.msg.type == 'brand' || result.msg.type == 'Customerservice') {
               this.router.navigate(['/dashboard']);
               }
               if (result.msg.type == 'employee') {
               this.router.navigate(['/training']);
               }*/
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
  hi(){
    console.log($('#funnel_block1_2').html());
      $("#funnel_block1_2").offset().top;

  }
}
