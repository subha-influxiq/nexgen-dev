import { Component, OnInit,ViewChild,EventEmitter,ElementRef,TemplateRef, Inject } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-replegaldocument',
  templateUrl: './replegaldocument.component.html',
  styleUrls: ['./replegaldocument.component.css'],
  providers:[Commonservices]
})
export class ReplegaldocumentComponent implements OnInit {
  private last;
  private errormg='';
  files:UploadFile[];
  filesid:UploadFile[];
  filesw9:UploadFile[];
  uploadInput:EventEmitter<UploadInput>;
  humanizeBytes:Function;
  dragOver:boolean;
  options: UploaderOptions;
  @ViewChild('fileInput1') uploaderInput: ElementRef;
  public percentageisw9: any;
  public percentageisid: any;
  public datalist1: any;
  public legallist: any;
  public getw9values: any=null;
  public getidvalues: any=null;
  public modalRef1: BsModalRef;
  public isedit: number=0;
  public message:any;
  private selecteditemtype: any;

  constructor(@Inject(WINDOW) private window: Window, public commonservices:Commonservices,public _cookieservice:CookieService,public _http:HttpClient,public modal:BsModalService) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit()
  {
    this.callvaluesfromdb();
  }
  callvaluesfromdb(){
    const link = this.commonservices.nodesslurl+'datalist?token='+this._cookieservice.get('jwttoken');
    this._http.post(link,{source:'legaldocuments',condition:{userid_object:this._cookieservice.get('userid')}})
        .subscribe(res=>{
          let result;
          result=res;
          this.legallist=result.res;
          for(let i in this.legallist){
            if(this.legallist[i].doctype=='W9' || this.legallist[i].doctype=='1099'){
              this.getw9values=this.legallist[i];
            }  if(this.legallist[i].doctype=='ID'){
              this.getidvalues=this.legallist[i];
            }
            // console.log(this.getidvalues);
            // console.log(this.getw9values);
          }
        })
}
  onUploadOutput(output:UploadOutput,ival):void {
    this.errormg = '';
    this.uploaderInput.nativeElement.value = '';
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.commonservices.nodesslurl + 'uploads',
        method: 'POST',
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      if (output.file.response != "") {
        this.files = [];
        this.files.push(output.file);
        if(ival=='W9' || ival=='1099')this.percentageisw9 = this.files[0].progress.data.percentage;
        if(ival=='ID')this.percentageisid = this.files[0].progress.data.percentage;

      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      if(ival=='W9'|| ival=='1099')this.percentageisw9 = this.files[0].progress.data.percentage;
      if(ival=='ID')this.percentageisid = this.files[0].progress.data.percentage;
      //  console.log('this.files==');
      //console.log(this.files);
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    // console.log('files-');
    // console.log(this.files);
    if(ival=='W9' || ival=='1099')this.filesw9 = this.files;
    if(ival=='ID')this.filesid = this.files;
    this.last = this.files[0].name.substring(this.files[0].name.lastIndexOf(".") + 1, this.files[0].name.length);
    if (this.last != 'doc' && this.last != 'docx' && this.last != 'pdf' && this.last != 'ppt' && this.last != 'txt' && this.last != 'xls') {
      this.errormg = 'in error , wrong file uploader ..';
    }
    if( (ival=='W9' || ival=='1099') && this.files[0].response!=null){
      let data;
      let objarr=['userid','_id'];
      if(this.getw9values!=null){
        data={
          id: this.getw9values._id,
          userid: this._cookieservice.get('userid'),
          fileservername:this.files[0].response,
          filelocalname:this.files[0].name,
          doctype:ival
        }
      }else{
        data={
          userid: this._cookieservice.get('userid'),
          fileservername:this.files[0].response,
          filelocalname:this.files[0].name,
          doctype:ival
        }
      }

      const link = this.commonservices.nodesslurl+'addorupdatedata?token='+this._cookieservice.get('jwttoken');
      this._http.post(link,{source:'legaldocuments',data:data,sourceobj:objarr})
          .subscribe(res=>{
            let result;
            result=res;
            this.datalist1=result.res;
            this.callvaluesfromdb();
          })
    }
    if( ival=='ID' && this.files[0].response!=null){
      let data;
      let objarr=['userid','_id'];
      if(this.getidvalues!=null){
       data={
        id: this.getidvalues._id,
        userid: this._cookieservice.get('userid'),
        fileservername:this.files[0].response,
        filelocalname:this.files[0].name,
        doctype:ival
      }
      }else{
         data={
          userid: this._cookieservice.get('userid'),
          fileservername:this.files[0].response,
          filelocalname:this.files[0].name,
          doctype:ival
        }
      }
      const link = this.commonservices.nodesslurl+'addorupdatedata?token='+this._cookieservice.get('jwttoken');
      this._http.post(link,{source:'legaldocuments',data:data,sourceobj:objarr})
          .subscribe(res=>{
            let result;
            result=res;
            this.datalist1=result.res;
            this.callvaluesfromdb();
          })
    }
  }
  deletdata(val:any,template:TemplateRef<any>){
    this.modalRef1=this.modal.show(template);
    this.selecteditemtype=val.doctype;
  }
  confirmdelete(template:TemplateRef<any>){
    this.modalRef1.hide();
    this.isedit=0;
    this.message="Record deleted successfully!!";
    const link = this.commonservices.nodesslurl+'deletesingledata?token='+this._cookieservice.get('jwttoken');
    let idis;
    if(this.selecteditemtype=='W9' || this.selecteditemtype=='1099') idis=this.getw9values._id;
    if(this.selecteditemtype=='ID') idis=this.getidvalues._id;
    this._http.post(link,{source:'legaldocuments',id:idis})
        .subscribe(res => {
          let result;
          result = res;
          if(this.selecteditemtype=='W9' || this.selecteditemtype=='1099'){
            this.getw9values=null;
            this.filesw9=[];
            this.percentageisw9=null;
          }
          if(this.selecteditemtype=='ID'){
            this.getidvalues=null;
            this.filesid=[];
            this.percentageisid=null;
          }

          this.modalRef1=this.modal.show(template, {class: 'successmodal'});
          setTimeout(() => {
            this.modalRef1.hide();
            this.callvaluesfromdb();
            this.isedit=0;
          }, 4000);
        }, error => {
          console.log('Oooops!');
        });

  }
  nodelete(){
    this.modalRef1.hide();
  }
    downloadfullcontract(){
        var url = 'https://backoffice.betoparedes.com/generate-pdf/employment-agreement/index.php?id=' + this._cookieservice.get('userid');
        //"https://backoffice.betoparedes.com/generate-pdf/employment-agreement/index.php?id={{item._id}}"
        this.window.open(url, '_blank');
    }
}
