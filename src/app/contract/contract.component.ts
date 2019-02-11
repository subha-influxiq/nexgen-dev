import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
declare var moment:any;
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  providers: [Commonservices]

})
export class ContractComponent implements OnInit {
  public datalist:any;
  public sourceconditionval:any;
  public sourceval='users';
  public dataForm: FormGroup;
  public kp;
  public signval;
  modalRef: BsModalRef;

  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private cookeiservice: CookieService,public modal:BsModalService) {
    this.kp = kp;
   console.log(this.cookeiservice.get('userid'));
    this.getsignupdetails();
  }

  ngOnInit() {
    this.dataForm = this.kp.group({
      id: [''],
      firstdate: [moment().format("Do, MMM, YYYY")],
      firstaddress: [''],
      fullname: [''],
      by1: ['']
    });
  }
  getsignupdetails() {
    this.sourceconditionval ={_id:this.cookeiservice.get('userid')};
    const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:this.sourceval,condition:this.sourceconditionval})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='error'){
            //this.router.navigate(['/']);
          }else{
            this.datalist = [];
            this.datalist = result.res;
            console.log('datalist:');
            console.log(this.datalist);
            if(this.datalist.length>0){
              this.dataForm = this.kp.group({
                id: [this.cookeiservice.get('userid')],
                firstdate: [moment().format("Do, MMM, YYYY"),Validators.required],
                firstaddress: [this.datalist[0].address1,Validators.required],
                fullname: [this.datalist[0].firstname+' '+this.datalist[0].lastname,Validators.required],
                by1: ['',Validators.required]
              });
            }
          }
        }, error => {
          console.log('Oooops!');
          this.datalist = [];
        });
  }
  sign1(template:TemplateRef<any>){
    console.log('sign1');
    this.signval=null;
    this.modalRef=this.modal.show(template);
  }
  savesignval(){
    this.dataForm.controls['by1'].patchValue(this.signval);
    this.modalRef.hide();
  }
}
