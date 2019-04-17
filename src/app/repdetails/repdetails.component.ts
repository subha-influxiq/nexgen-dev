import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;

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
    public issubmit=0;
    public addnote=0;
    public addthisnote: any;
    public notelist: any;
    public editnoteid: any=null;
    // public addorupdatenote: any='Add';
    public ownerlists;

    modalRef: BsModalRef;
    constructor(kp: FormBuilder, public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,public cookeiservice: CookieService,private route: ActivatedRoute)
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
    this.ownerlist();
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
      noofclinics: ['',Validators.required],
      primarycare: [''],
      pediatrics: [''],
      podiatrist: [''],
      hospitals_that_outsource: [''],
      nursing: [''],
      other: [''],
      othertext: [''],
      noofpersonallycall: ['',Validators.required],
      calleachoffice: [''],
      calleachoffice1: [''],
      calleachoffice2: [''],
      noofdirectaccess: ['',Validators.required],
      workinmedicalfield: ['',Validators.required],
      pcrtesting: ['',Validators.required],
      companyname: [''],
      regionalid: [''],
    });

    $('td').each(function () {

    //  console.log($(this).text());
    });
  }

  ngAfterViewChecked(){
   // console.log($(this).text());
  }
  ownerlist() {
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, {source: 'users',condition:{type:'regional_recruiter'}})
        .subscribe(res => {
          let result:any={};
          result = res;
          this.ownerlists=[];
          this.ownerlists=result.res;
          console.log('this.ownerlists');
          console.log(this.ownerlists);
        })
  }
  geteditdata() {
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'user_regional_legaldoc_status_view',condition:{_id:this.id}})
        .subscribe(res => {
          let result;
          result = res;
          console.log('result');
          console.log(result);
          if(result.status=='error'){
          }else{
            let userdet;
            userdet = result.res[0];
            console.log('userdet.calleachoffice1');
            console.log(userdet.calleachoffice1);
            this.repdetails = result.res[0];
            this.notes();
            this.dataForm = this.kp.group({
              userid: [userdet.unique_id],
              username: [userdet.username],
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
              noofclinics: [userdet.noofclinics,Validators.required],
              primarycare: [userdet.primarycare],
              pediatrics: [userdet.pediatrics],
              podiatrist: [userdet.podiatrist],
              hospitals_that_outsource: [userdet.hospitals_that_outsource],
              nursing: [userdet.nursing],
              other: [userdet.other],
              othertext: [userdet.othertext],
              noofpersonallycall: [userdet.noofpersonallycall,Validators.required],
              calleachoffice: [userdet.calleachoffice],
              calleachoffice1: [userdet.calleachoffice1],
              calleachoffice2: [userdet.calleachoffice2],
              noofdirectaccess: [userdet.noofdirectaccess,Validators.required],
              workinmedicalfield: [userdet.workinmedicalfield,Validators.required],
              pcrtesting: [userdet.pcrtesting,Validators.required],
              companyname: [userdet.companyname],
              regionalid: [userdet.regionalrecruiter_id],
            });
          }
        }, error => {
          console.log('Oooops!');
        });
}
  dosubmit(template:TemplateRef<any>){
    this.issubmit=1;
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
        noofclinics: this.dataForm.value['noofclinics'],
        primarycare: this.dataForm.value['primarycare'],
        pediatrics: this.dataForm.value['pediatrics'],
        podiatrist: this.dataForm.value['podiatrist'],
        hospitals_that_outsource: this.dataForm.value['hospitals_that_outsource'],
        nursing: this.dataForm.value['nursing'],
        other: this.dataForm.value['other'],
        othertext: this.dataForm.value['othertext'],
        noofpersonallycall: this.dataForm.value['noofpersonallycall'],
        calleachoffice: this.dataForm.value['calleachoffice'],
        calleachoffice1: this.dataForm.value['calleachoffice1'],
        calleachoffice2: this.dataForm.value['calleachoffice2'],
        noofdirectaccess: this.dataForm.value['noofdirectaccess'],
        workinmedicalfield: this.dataForm.value['workinmedicalfield'],
        pcrtesting: this.dataForm.value['pcrtesting'],
        companyname: this.dataForm.value['companyname'],
        regionalid: this.dataForm.value['regionalid']
      };
      this._http.post(link, {data:data})
          .subscribe(res => {
            let result:any ={};
            result = res;
            this.issubmit=0;
            console.log('result....');
            console.log(result);
            if(result.status=='error'){
              this.errormg=result.msg;
            }
            if(result.status=='success') {
              this.modalRef = this.modal.show(template, {class: 'successmodal'});
              setTimeout(()=> {
                this.geteditdata();
                this.modalRef.hide();
              },2000);
              // this.router.navigate(['/rep']);
            }
          }, error => {
            console.log('Oooops!');
          });
    }  
    
  }


  togglelockedstatus() {
    let status:any;
    status=this.repdetails.lock;
    if(this.repdetails.lock==null && this.repdetails.lock!=1 && this.repdetails.lock!=0){
      status=1;
    }
    const link = this._commonservice.nodesslurl+'togglelockedstatus?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{id:this.repdetails._id,source:'users',status:status})
        .subscribe(res => {
          this.geteditdata();
        }, error => {
          console.log('Oooops!');
        });
  }

  addnotetodb() {
    let link = this._commonservice.nodesslurl + 'addorupdatedata?token='+this.cookeiservice.get('jwttoken');
    let objarr=['added_to_rep','added_by'];
    let data;
    if(this.editnoteid!=null){
      data={
        id: this.editnoteid,
        note: this.addthisnote,
        added_to_rep: this.repdetails._id,
        added_by: this.cookeiservice.get('userid')
      }
    }else{
      data={
        note: this.addthisnote,
        added_to_rep: this.repdetails._id,
        added_by: this.cookeiservice.get('userid')
      }
    }

    this._http.post(link, {source:'note',data:data,sourceobj:objarr})
        .subscribe(res => {
          let result:any ={};
          result = res;
          console.log('result....');
          console.log(result);
          if(result.status=='error'){
          }
          else {
            this.addthisnote = null;
            this.addnote = 0;
            this.editnoteid=null;
            this.notes();
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  notes(){
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'note_view',condition:{'added_to_rep_object':this.repdetails._id}})
        .subscribe(res => {
          let result;
          result = res;
          this.notelist=result.res;
          console.log(this.notelist);
        }, error => {
          console.log('Oooops!');
        });
  }
  editnote(id){
    this.editnoteid=id;
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'note_view',condition:{'_id':id}})
        .subscribe(res => {
          let result;
          result = res;
          this.addnote = 1;
          this.addthisnote=result.res[0].note;
          console.log(this.addthisnote);
        }, error => {
          console.log('Oooops!');
        });
  }
  deletenote(id){
    const link = this._commonservice.nodesslurl+'deletesingledata?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'note',id:id})
        .subscribe(res => {
          let result;
          result = res;
          this.notes();
        }, error => {
          console.log('Oooops!');
        });
  }
  updateregid(template:TemplateRef<any>){
    const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
    let data={
      id:this.id,
      regionalrecruiter_id:this.dataForm.value['regionalid'],
    }
    this._http.post(link, {source: 'users',data:data,sourceobj:['regionalrecruiter_id']})
        .subscribe(res => {
          let result:any={};
          result = res;
          console.log('result.....');
          console.log(result);
          if(result.status=='success') {
              this.modalRef = this.modal.show(template, {class: 'successmodal'});
              setTimeout(()=> {
                  this.modalRef.hide();
              },2000);
          }
        });
  }

    callforcopy(repdetailsid){
        return this._commonservice.siteurl+'signup/'+repdetailsid;
    }

    showcopied(template){
        this.modalRef=this.modal.show(template, {class: 'successmodal'});
        setTimeout(() => {
            this.modalRef.hide();
        }, 2000);
    }
    showstatusofrep(item){
        if(item.noofclinics==null && (item.password==null || item.password=='')) return 'Not qualified';
        //  if((item.noofclinics<40 || item.noofclinics==null) && (item.password!='' && item.password!=null)) return 'Not Qualified';
        if((item.noofclinics<12 || item.noofclinics==null) && (item.password=='' || item.password==null)) return 'Not Qualified';
        if(item.noofclinics==null && (item.password!=null && item.password!='')) {
            if(item.lock==1){
                return 'Pending Phone Verification';
            }
            if(item.signup_step2==1  && item.contractstep==null && item.reptraininglessonstep==null) { // && item.lock==0
                return 'Pending Contract';
            }/*
             if(item.signup_step2==1  && item.contractstep==null && item.reptraininglessonstep==null) { // && item.lock==1
             return 'Pending Phone Verification';
             }*/
            if(item.signup_step2==1  && item.contractstep==1 && item.reptraininglessonstep==null) { // && item.lock==0
                return 'Pending New Hire Training';
            }
            if(item.signup_step2==1 && item.contractstep==1 && item.reptraininglessonstep==1){ // && item.lock==0
                return 'Dashboard Access';
            }
        }



        if(item.noofclinics>=12 && (item.password==null || item.password=='')) return 'Pending Sign Up';

        if(item.lock==1){
            return 'Pending Phone Verification';
        }
        if(item.signup_step2==1  && item.contractstep==null && item.reptraininglessonstep==null) { // && item.lock==0
            return 'Pending Contract';
        }/*
         if(item.signup_step2==1  && item.contractstep==null && item.reptraininglessonstep==null) { // && item.lock==1
         return 'Pending Phone Verification';
         }*/
        if(item.signup_step2==1  && item.contractstep==1 && item.reptraininglessonstep==null) { // && item.lock==0
            return 'Pending New Hire Training';
        }
        if(item.signup_step2==1 && item.contractstep==1 && item.reptraininglessonstep==1){ // && item.lock==0
            return 'Dashboard Access';
        }
    }
}
