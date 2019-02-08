import { Component, OnInit,TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import {Input} from "@angular/core";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ImageCroppedEvent} from "ngx-image-cropper";
import { CookieService } from 'ngx-cookie-service';
declare var moment:any;
declare var $:any;
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [Commonservices],
})
export class ListingComponent implements OnInit {
  public message: any = '';
  public datalist: any = [];
  public formdataval: any = [];
  modalRef: BsModalRef;
  modalRef1: BsModalRef;
  private selectedid: any;
  public showLoader: any;
  public sourceval: any;
 // public image: any;
  @Input() templatetype = '';
  @Input() sourcetitle = 0;
  @Input() menuval = 0;
  public tabledatalisval:any;
  public formgroup:FormBuilder;
  public dataForm:FormGroup;
  public sourceconditionval:any;
    daterangepickerOptions = {/*
        startDate: '09/01/2017',
        endDate: '09/02/2017',*/
        format: 'DD/MM/YYYY',
        minDate: moment().format("DD/MM/YYYY"),
        noDefaultRangeSelected : true,
       /* singleCalendar : true,*/
    }
  public formsourceval: any=[];
  public selecteditem: any;

    imageChangedEvent: any = [];
   // croppedImage: any = '';
    public croppedImage: any = [];
    public base64imgdata:any='';
    public unsafebase64imgdata:any=[];
    public selectedFile:any;
    public isedit: number=0;
    public usertype: any;
    public minDate: any = new Date();



  @Input()
  set source(source: string) {
    this.sourceval = (source && source.trim()) || '<no name set>';
    console.log('sourceval: ' + this.sourceval);
  }
  @Input()
  set formsource(formsource: string) {
    this.formsourceval = (formsource ) || '<no name set>';
    console.log('formsourceval:');
    console.log(this.formsourceval);
  }
  @Input()
  set tabledatalis(tabledatalis: string) {
    this.tabledatalisval = (tabledatalis) || '<no name set>';
    console.log('tabledatalisval:');
    console.log(this.tabledatalisval);
  }
  @Input()
  set formdata(formdata: string) {
    this.formdataval = (formdata) || '<no name set>';
    console.log('formdataval:');
    console.log(this.formdataval);
  }
  @Input()
  set sourcecondition(sourcecondition: string) {
    this.sourceconditionval = (sourcecondition) || '<no name set>';
    console.log('this.sourcecondition');
    console.log(this.sourceconditionval);
  }

 constructor(public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,formgroup:FormBuilder,private cookeiservice: CookieService)
  {
   this.formgroup=formgroup;
   this._commonservice=_commonservice;
     // this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit()
  {
      this.usertype=this.cookeiservice.get('usertype');
      this.getdatalist();
  }
    togglestatus(item:any) {
      console.log('item.status');
      console.log(item.status);
      let status:any;
      if(item.status!=null) status=1-item.status;
      if(item.status==null) status=1;
        const link = this._commonservice.url+'togglestatus';
        /* console.log('link');
    console.log(link);*/
        this._http.post(link,{id:item._id,source:this.formsourceval.table,status:status})
            .subscribe(res => {
                this.getdatalist();
            }, error => {
                console.log('Oooops!');
               this.getdatalist();
            });
    }
  getdatalist() {
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
   /* console.log('link');
    console.log(link);*/
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
              }
          }, error => {
              console.log('Oooops!');
              this.datalist = [];
          });
  }

  geteditdata() {
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
   /* console.log('link');
    console.log(link);*/
   console.log('this.formsourceval');
   console.log(this.formsourceval);
    this._http.post(link,{source:this.sourceval,condition:{_id:this.selecteditem._id}})
        .subscribe(res => {
          let result;
          result = res;
          console.log('result:');
          console.log(result);
            if(result.status=='error'){
                this.router.navigate(['/']);
            }else{
          let folder:any='';
            console.log(this.dataForm.controls);
            for (let c in this.dataForm.controls){
                console.log(c);
                console.log(result.res[0][c]);
                this.dataForm.controls[c].patchValue(result.res[0][c]);
                for(let j in this.formdataval){
                    if(this.formdataval[j].name==c && this.formdataval[j].inputtype=='daterange'){
                         //let tval=this.getdaterangeval(result.res[0][c]);
                        //$('.dateRangePicker-input').val(tval);
                        console.log('date range !!!');
                        console.log(this.showdate(result.res[0][c]));
                        console.log((result.res[0][c]));
                        console.log((result.res[0][c][0]));
                        console.log((result.res[0][c][1]));
                        $('#inputdate'+this.formdataval[j].name).val(this.showdate(result.res[0][c]));
                        console.log(this.dataForm.controls[c].value);
                        let bsValue = new Date(result.res[0][c][0]);
                        //bsRangeValue: Date[];
                        let maxDate = new Date(result.res[0][c][1]);
                        //maxDate= maxDate.setDate(maxDate.getDate() + 7);
                        console.log('maxDate');
                        console.log(maxDate);
                        console.log('bsValue');
                        console.log(bsValue);
                        let datearr=[bsValue,maxDate];
                        this.dataForm.controls[c].patchValue(datearr);
                    }
                    if(this.formdataval[j].name==c && this.formdataval[j].inputtype=='checkbox'){
                        let checkval=result.res[0][c];
                        if(result.res[0][c]==1) checkval=true;
                        else checkval=false;
                        this.dataForm.controls[c].patchValue(checkval);
                    }
                    if(this.formdataval[j].name==c && this.formdataval[j].inputtype=='image'){
                     folder=this.formdataval[j].imagefolder;
                        const link = this._commonservice.base64encode+'&img='+this.dataForm.controls[c].value+'&type='+folder;
                        this._http.get(link)
                            .subscribe(res => {
                                let result:any;
                                result = res;
                             //   console.log(result);
                                if(result.data!=null){
                                    this.unsafebase64imgdata[j]=result.data;
                                    this.croppedImage[j]=result.data;
                                }
                            }, error => {
                                console.log('Oooops!');
                            });
                    }
                }
            }
            this.dataForm.addControl('id', new FormControl(this.selecteditem._id, Validators.required));
            }
        }, error => {
          console.log('Oooops!');
          this.datalist = [];
        });
  }
  getselectdata(source:any,c:any) {
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
  /*  console.log('link');
    console.log(link);*/
    this._http.post(link,{source:source})
        .subscribe(res => {
          let result;
          result = res;
            if(result.status=='error'){
                this.router.navigate(['/']);
            }else {
                this.formdataval[c].sourceval = result.res;
            }
        }, error => {
            console.log('Oooops!');
            this.formdataval[c].sourceval = [];
        });
  }

  deletdata(val:any,template:TemplateRef<any>){
    this.modalRef1=this.modal.show(template);
    this.selecteditem=val;
  }
  confirmdelete(template:TemplateRef<any>){
    this.modalRef1.hide();
      this.isedit=0;
    this.message="Record deleted successfully!!";
    const link = this._commonservice.url+'deletesingledata';
   /* console.log('link');
    console.log(link);*/
    this._http.post(link,{source:this.formsourceval.table,id:this.selecteditem._id})
        .subscribe(res => {
          let result;
          result = res;
          this.getdatalist();
          this.modalRef1=this.modal.show(template);
          setTimeout(() => {
            this.modalRef1.hide();
            this.isedit=0;
          }, 4000);
        }, error => {
          console.log('Oooops!');
        });

  }
  nodelete(){
          this.modalRef1.hide();
  }
    editmodal(template:TemplateRef<any>,selecteddata:any){
      this.selecteditem=selecteddata;
      this.isedit=1;
      this.openform(template,this.isedit);

  }
  openform(template:TemplateRef<any>,type){
      if(type==0)this.isedit=0;
    let formgrp:any=[];
    this.base64imgdata=[];
    this.unsafebase64imgdata=[];
    // let tempval;
    for(let c in this.formdataval){
        /*  console.log(this.formdataval[c]);
      console.log('this.formdataval[c].validationrule');
      console.log(this.formdataval[c]);
      console.log(this.formdataval[c].validationrule);*/

        if(this.isedit==0 || (this.formdataval[c].isaddonly==null && this.formdataval[c].isaddonly!=true)) {
            if(this.formdataval[c].inputtype=='checkbox') {
                formgrp[this.formdataval[c].name] = [false];
                //alert(6);
            }else{
            console.log('inside it');
            if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.required) formgrp[this.formdataval[c].name] = ['', Validators.required];
            if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.email) formgrp[this.formdataval[c].name] = ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])];
            if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.confirmpass) formgrp[this.formdataval[c].name] = ['', Validators.compose([Validators.required, this.equalToPass('password')])];
            if (this.formdataval[c].validationrule != null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) formgrp[this.formdataval[c].name] = [''];
            if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) formgrp[this.formdataval[c].name] = [''];
            if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value != null) formgrp[this.formdataval[c].name] = [this.formdataval[c].value];
            if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.url) formgrp[this.formdataval[c].name] = ['', Validators.compose([Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')])];
            if (this.formdataval[c].inputtype == 'select') {
                this.getselectdata(this.formdataval[c].sourceview, c);
            }
            this.imageChangedEvent = [];
            this.croppedImage = [];

        }
            if(this.formdataval[c].role!=null){
                console.log('this.formdataval[c].role');
                console.log(this.formdataval[c].role);
                console.log(this.usertype);
                console.log(this.formdataval[c].role.indexOf(this.usertype));
                if(this.formdataval[c].role.indexOf(this.usertype)==-1){
                    console.log('in hidden ...');
                    this.formdataval[c].inputtype='hidden';
                    setTimeout(() => {
                        this.dataForm.controls[this.formdataval[c].name].patchValue(this.cookeiservice.get(this.formdataval[c].defaultval));
                    }, 3000);
                }
            }
        }
    }
    this.dataForm=this.formgroup.group(formgrp);
      if(this.isedit==1){
          this.geteditdata();

      }
    this.modalRef = this.modal.show(template);
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

  //not relevant for now !!
  equalpass(){
    if(this.dataForm!=null) {
      if (this.dataForm.controls['confirmpassword'] == null || this.dataForm.controls['confirmpassword'].value == '') {
        return {'equalpass':true};
      }
      if (this.dataForm.controls['password'] != this.dataForm.controls['confirmpassword']) {
        return {'equalpass':true};
      }
      return null;
    }
  }

  formsubmit(){
    let y: any;
    for (y in this.dataForm.controls) {
      this.dataForm.controls[y].markAsTouched();
    }
    console.log('this.dataForm.value');
    console.log(this.dataForm.value);
    if(this.dataForm.valid){
      const link = this._commonservice.nodesslurl+'addorupdatedata';
      console.log('link');
      console.log(link);
      this._http.post(link,{source:this.formsourceval.table,data:this.dataForm.value,sourceobj:this.formsourceval.objarr})
          .subscribe(res => {
            let result:any;
            result = res;
           //  console.log(result);
             if(result.status=='success'){
               this.dataForm.reset();
            //   this.modalRef.hide();
                 this.isedit=0;
                 setTimeout(() => {
                     this.getdatalist();
                     this.imageChangedEvent=[];
                     this.croppedImage=[];
                     this.modalRef.hide();
                 }, 2000);

             }
          }, error => {
            console.log('Oooops!');
          });
    }
  }

  rangeSelected($event,controlname:any){
    let dval = moment.unix($event.start).unix() + '|' + moment.unix($event.end).unix();
    //hidden field value : startdate|enddate -- it will be inserted to db
    this.dataForm.controls[controlname].patchValue(dval);
  }

    showdate(dateis){
        let st=dateis[0];
        let endt=dateis[1];
        st=moment(st).format('MMM Do YY');
        endt=moment(endt).format('MMM Do YY');
        return st+' To ' +endt;
      /*  if(dateis!=null){
            let datearr = dateis.split('|');
            return 'Start Date: '+moment.unix(datearr[0]/1000).format('MM-DD-YYYY') +',  End Date: '+moment.unix(datearr[1]/1000).format('MM-DD-YYYY');
        }
        else{
            return 'No date selected!';
        }*/
    }

    getdaterangeval(dateis){
        if(dateis!=null){
            let datearr = dateis.split('|');
            return moment.unix(datearr[0]/1000).format('MM/DD/YYYY') +'-'+moment.unix(datearr[1]/1000).format('MM/DD/YYYY');
        }
        else{
            return 'No date selected!';
        }
    }
 /*   onFileChanged(event,control:any,i:any){
        console.log(control);
        console.log(control.name);
        console.log(control.imagefolder);
        this.selectedFile = event.target.files[0];
        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile);
        const link = this._commonservice.uploadurl+'?imagefolder='+control.imagefolder;
        this._http.post(link,uploadData)
            .subscribe(event => {
                let res: any = {};
                res = event;
                if(res.error_code == 0){
                  //  this.image = this._commonservice.filepathurl+ res.filename;
                    this.dataForm.controls[control.name].patchValue(res.filename);
                    this.formdataval[i].filename=control.imagefolder+'/'+res.filename;
                   }
            });
    }*/
    saveimg(control:any,i:any,template:TemplateRef<any>){
      /*  console.log(control);
        console.log(control.name);
        console.log(control.imagefolder);*/
        const uploadData = new FormData();
        if(this.selectedFile==null) this.selectedFile=0;
        uploadData.append('file', this.selectedFile);
        uploadData.append('base64data', this.croppedImage[i]);
        const link = this._commonservice.uploadurl+'?imagefolder='+control.imagefolder;
        this._http.post(link,uploadData)
            .subscribe(event => {
                let res: any = {};
                res = event;
                if(res.error_code == 0){
                    this.dataForm.controls[control.name].patchValue(res.filename);
                    this.formdataval[i].filename=control.imagefolder+'/'+res.filename;
                    this.modalRef1=this.modal.show(template);
                    this.message='Image Saved Successfully !!';
                    setTimeout(() => {
                        this.modalRef1.hide();
                    }, 5000);
                }
            });
    }
    //for image crop
    fileChangeEvent(event: any,i:any): void {
        this.selectedFile = event.target.files[0];
        this.imageChangedEvent[i] = event;
    }
    imageCropped(event: ImageCroppedEvent,item:any,i:any) {
        this.croppedImage[i] = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    loadImageFailed() {
        // show message
    }


}
