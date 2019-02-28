import { Component, OnInit,TemplateRef } from '@angular/core';
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
  public val;
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
      fullname: ['',Validators.required],
      by1: ['',Validators.required],
      by2: ['',Validators.required],
      printname1: [''],
      printname2: [''],
      title1: [''],
      title2: [''],
      printvalue: [''],
      consultant1: ['',Validators.required],
      date2: [''],
      printname3: [''],
      by3: ['',Validators.required],
      printname4: [''],
      title3: [''],
      date3: [''],
      blank1: [''],
      by4: ['',Validators.required],
      printname5: [''],
      title4: [''],
      date4: [''],
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
                firstdate: [moment().format("Do, MMM, YYYY")],
                firstaddress: [this.datalist[0].address1],
                fullname: [this.datalist[0].firstname+' '+this.datalist[0].lastname,Validators.required],
                by1: ['',Validators.required],
                by2: ['',Validators.required],
                printname1: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                printname2: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                title1: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                title2: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                printvalue: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                consultant1: ['',Validators.required],
                date2: [moment().format("Do, MMM, YYYY")],
                printname3: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                by3: ['',Validators.required],
             //   printname4: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                printname4: [''],
              //  title3: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                title3: [''],
              /*  date3: [moment().format("Do, MMM, YYYY")],*/
                date3: [''],
                blank1: [''],
                by4: ['',Validators.required],
                printname5: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                title4: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                date4: [moment().format("Do, MMM, YYYY")],
              });
            }
          }
        }, error => {
          console.log('Oooops!');
          this.datalist = [];
        });
  }
  sign1(template:TemplateRef<any>,val){
    this.val=val;
   // console.log('sign1');
    this.signval=null;
    this.modalRef=this.modal.show(template);

    if(this.val==1 && this.dataForm.value['by1']!=null){
      this.signval=this.dataForm.value['by1'];
    }
    if(this.val==2 && this.dataForm.value['by2']!=null){
      this.signval=this.dataForm.value['by2'];
    }
    if(this.val==3 && this.dataForm.value['by3']!=null){
      this.signval=this.dataForm.value['by3'];
    }
    if(this.val==4 && this.dataForm.value['by4']!=null){
      this.signval=this.dataForm.value['by4'];
    }
    if(this.val==5 && this.dataForm.value['consultant1']!=null){
      this.signval=this.dataForm.value['consultant1'];
    }
  }
  savesignval(){
    if(this.val==1){
    this.dataForm.controls['by1'].patchValue(this.signval);
    }
    if(this.val==2){
    this.dataForm.controls['by2'].patchValue(this.signval);
    }
    if(this.val==3){
    this.dataForm.controls['by3'].patchValue(this.signval);
    }
    if(this.val==4){
    this.dataForm.controls['by4'].patchValue(this.signval);
    }
    if(this.val==5){
    this.dataForm.controls['consultant1'].patchValue(this.signval);
    }
    this.modalRef.hide();
  }
  dosubmit(){
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid) {
      console.log('valid');
      let link = this._commonservices.nodesslurl + 'leadsignupquestionnaireupdate?token='+this.cookeiservice.get('jwttoken');
      let data = {
        id: this.cookeiservice.get('userid'),
        contractstep: 1
      }
      this._http.post(link, {data:data})
          .subscribe(res => {
            let result: any = {};
            result = res;
            console.log('result....');
            console.log(result);
            this.router.navigate(['/reptrainingcenter'])
          });
    }
  }
}
