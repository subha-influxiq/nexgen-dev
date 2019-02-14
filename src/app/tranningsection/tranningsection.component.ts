import { Component, OnInit,ViewChild,EventEmitter,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
@Component({
  selector: 'app-tranningsection',
  templateUrl: './tranningsection.component.html',
  styleUrls: ['./tranningsection.component.css'],
  providers: [Commonservices]
})
export class TranningsectionComponent implements OnInit {
  public dataForm: FormGroup;
  public es;
  public serverurl;
  public divforhtml=false;
  public divforfile=false;
  public divforaudio=false;
  public divforvideo=false;
  public sourceconditionval:any;
  public datalist;
  public htmleditorvalue;
  public errormg='';
  public sourceval='tranningcategory';
  files:UploadFile[];
  uploadInput:EventEmitter<UploadInput>;
  humanizeBytes:Function;
  dragOver:boolean;
  options: UploaderOptions;
  @ViewChild('fileInput1') uploaderInput: ElementRef;

  constructor(es: FormBuilder,public _commonservices: Commonservices,public _cookieservice:CookieService,public _http:HttpClient,public router:Router)
  {
    this.es=es;
    this.serverurl= _commonservices.nodesslurl;
    this.dataForm=this.es.group({
      title:['',Validators.required],
      description:['',Validators.required],
      filetype:['',Validators.required],
      // location:['',Validators.required],
      yesorno:['',Validators.required],
      status:['',Validators.required],
      trainingcategory:['',Validators.required],
      htmleditorvalue:[''],
      fileservername:[''],
      filelocalname:[''],
      audioservername:[''],
      audiolocalname:[''],
      videoservername:[''],
      videolocalname:[''],
    });
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }
  typefile(){
    this.divforhtml=false;
    this.divforfile=false;
    this.divforaudio=false;
    this.divforvideo=false;

    if(this.dataForm.value['filetype']=='html'){
      this.divforhtml=true;
    }

    if(this.dataForm.value['filetype']=='file'){
      this.divforfile=true;
    }
    if(this.dataForm.value['filetype']=='audio'){
      this.divforaudio=true;
    }
    if(this.dataForm.value['filetype']=='video'){
      this.divforvideo=true;
    }
  }
  ngOnInit()
  {
    this.sourceconditionval ={};
    this.gettrainingcategory();
  }
  gettrainingcategory()
  {
    const link = this._commonservices.nodesslurl+'datalist?token='+this._cookieservice.get('jwttoken');
    this._http.post(link,{source:this.sourceval,condition:this.sourceconditionval})
        .subscribe(res=>{
          let result;
          result=res;
          this.datalist=[];
          this.datalist=result.res;
          console.log('datalist');
          console.log(this.datalist);
        })
  }

  onUploadOutput(output:UploadOutput):void {
      this.errormg='';
    this.uploaderInput.nativeElement.value = '';
    if (output.type === 'allAddedToQueue') {
      const event:UploadInput = {
        type: 'uploadAll',
        url: this._commonservices.nodesslurl + 'uploads',
        method: 'POST',
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      if (output.file.response != "") {
        this.files = [];
        this.files.push(output.file);
      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      console.log('this.files');
      console.log(this.files);
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file:UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    console.log('files');
    console.log(this.files);
      if(this.files.length>0 && this.files[0].name!=null && this.files[0].response != null){
          if(this.dataForm.value['filetype']=='file'){
              var last = this.files[0].name.substring(this.files[0].name.lastIndexOf(".") + 1, this.files[0].name.length);
              if(last!='doc' && last!='docx'  && last!='pdf' && last!='ppt' && last!='txt' && last!='xls' ){
                  console.log('No');
                  this.errormg='in error , wrong file uploader ..';
              }
              else {
                  console.log('yes');
                  this.dataForm.patchValue({
                      fileservername : this.files[0].response,
                      filelocalname : this.files[0].name
                  });
              }
          }
          else if(this.dataForm.value['filetype']=='audio'){

              console.log('in audio patch block');
              console.log(this.files);
              console.log(this.files[0].type);
              if(this.files[0].type.indexOf('audio')==-1){
                  console.log('in error , wrong audio file uploader ..');
                  console.log('No');
                  this.errormg='in error , wrong audio file uploader ..';
              }
          else {
                  console.log('yes');
              this.dataForm.patchValue({
                  audioservername : this.files[0].response,
                  audiolocalname : this.files[0].name
              });
          }
         }
      else if(this.dataForm.value['filetype']=='video'){
          if(this.files[0].type.indexOf('video')==-1){
              console.log('in error , wrong video file uploader ..');
              this.errormg='in error , wrong video file uploader ..';
          }
          else {
              this.dataForm.patchValue({
                  videoservername : this.files[0].response,
                  videolocalname : this.files[0].name
              });
          }
      }
    }
  }
  getdata()
  {
    console.log("Change...");
  }

    dosubmit() {
    this.errormg='';

        
    /*mark all touch*/
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
      console.log(this.dataForm.controls[x].valid);
    }

    /*Clear dynamic validations*/
    this.dataForm.controls['htmleditorvalue'].clearValidators();
    this.dataForm.controls["htmleditorvalue"].updateValueAndValidity();
    this.dataForm.controls['fileservername'].clearValidators();
    this.dataForm.controls["fileservername"].updateValueAndValidity();
    this.dataForm.controls['audioservername'].clearValidators();
    this.dataForm.controls["audioservername"].updateValueAndValidity();
    this.dataForm.controls['videoservername'].clearValidators();
    this.dataForm.controls["videolocalname"].updateValueAndValidity();

    //Dynamically add validation
    if(this.dataForm.value['filetype']=='html')
    {
      this.dataForm.controls['htmleditorvalue'].setValidators(Validators.required);
      this.dataForm.controls['htmleditorvalue'].markAsTouched();
      this.dataForm.controls["htmleditorvalue"].updateValueAndValidity();

      this.dataForm.value['fileservername']=null;
      this.dataForm.value['filelocalname']=null;
      this.dataForm.value['audioservername']=null;
      this.dataForm.value['audiolocalname']=null;
      this.dataForm.value['videoservername']=null;
      this.dataForm.value['videolocalname']=null;
    }
    else if(this.dataForm.value['filetype']=='file')
    {
      this.dataForm.controls['fileservername'].setValidators(Validators.required);
      this.dataForm.controls['fileservername'].markAsTouched();
      this.dataForm.controls["fileservername"].updateValueAndValidity();

      this.dataForm.value['htmleditorvalue']=null;
      this.dataForm.value['audioservername']=null;
      this.dataForm.value['audiolocalname']=null;
      this.dataForm.value['videoservername']=null;
      this.dataForm.value['videolocalname']=null;
    }
    else if(this.dataForm.value['filetype']=='audio')
    {
      this.dataForm.controls['audioservername'].setValidators(Validators.required);
      this.dataForm.controls['audiolocalname'].markAsTouched();
      this.dataForm.controls["audioservername"].updateValueAndValidity();

      this.dataForm.value['htmleditorvalue']=null;
      this.dataForm.value['filelocalname']=null;
      this.dataForm.value['fileservername']=null;
      this.dataForm.value['videoservername']=null;
      this.dataForm.value['videolocalname']=null;
    }
    else if(this.dataForm.value['filetype']=='video')
    {
      this.dataForm.controls['videoservername'].setValidators(Validators.required);
      this.dataForm.controls['videolocalname'].markAsTouched();
      this.dataForm.controls["videoservername"].updateValueAndValidity();

      this.dataForm.value['htmleditorvalue']=null;
      this.dataForm.value['filelocalname']=null;
      this.dataForm.value['fileservername']=null;
      this.dataForm.value['audioservername']=null;
      this.dataForm.value['audiolocalname']=null;
    }


    if (this.dataForm.valid) {
      let link = this._commonservices.nodesslurl + 'addtraininglesson?token='+this._cookieservice.get('jwttoken');
      let objarr=['trainingcategory'];
      this._http.post(link, {source:'traininglesson',data:this.dataForm.value,sourceobj:objarr})
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('result....');
            console.log(result);
            if(result.status=='error'){
              this.errormg=result.msg;
            }
            // if(result.status=='success') {
            //   this.dataForm.reset();
            //   this.router.navigate(['/contract']);
            // }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
