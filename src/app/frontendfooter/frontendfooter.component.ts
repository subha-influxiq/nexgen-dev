import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-frontendfooter',
  templateUrl: './frontendfooter.component.html',
  styleUrls: ['./frontendfooter.component.css'],
  providers: [Commonservices]
})
export class FrontendfooterComponent implements OnInit {
  public stateslist;
  public es;
  public dataForm: FormGroup;
  public serverurl;
  public errormsg:'';
  modalRef1: BsModalRef;
  public issubmit=0;

  constructor(public _http: HttpClient, es: FormBuilder, public _commonservice: Commonservices,public _cookieservice:CookieService,public modal:BsModalService) {
    this.es = es;
    this.serverurl = _commonservice.nodesslurl;
  }

  ngOnInit() {
    this.dataForm = this.es.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, FrontendfooterComponent.customValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required],
      states: ['', Validators.required],

    });
    this.getstatesname();
  }

  static customValidator(inputemail): any {
    if (inputemail.pristine) {
      return null;
    }
    inputemail.markAsTouched();
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    console.log(String(inputemail.value).search(filter) != -1);
    if (String(inputemail.value).search(filter) == -1) {
      console.log('valid');
      return {
        invalidemail: true
      }
    }
  }

  getstatesname() {
    this._http.get("assets/data/states.json")
        .subscribe(res => {
          let result;
          result = res;
          this.stateslist = result;
          console.log('All staes.....');
          console.log(this.stateslist);
        }, error => {
          console.log('Oooops!');
        });
  }

  dosubmit(formval,template:TemplateRef<any>) {
    this.issubmit=1;
    for (let x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid) {
      let data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        phone: formval.phone,
        message: formval.message,
        states: formval.states,
      };
      let link = this._commonservice.nodesslurl + 'contactto';
      this._http.post(link,{source:'contactto',data:data})
          .subscribe(res=>{
            let result;
            result=res;
            this.issubmit=0;
            if(result.status=='error')
            {
              this.errormsg=result.msg;
            }else{
              this.dataForm.reset();
              this.modalRef1=this.modal.show(template, {class: 'conmtactusmodal'});
             /* setTimeout(() =>{
                this.modalRef1.hide();
              },2000);*/
            }
          }, error => {
            console.log('Oooops!');
          });
    }

  }
    ofmodal(){
        this.modalRef1.hide();
    }
}
