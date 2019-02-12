import { Component, OnInit, EventEmitter,ViewChild } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;


/*Accordian*/
//import { AccordionConfig } from 'ngx-bootstrap/accordion';
/*Accordian*/


/*File Upload*/
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
/*File Upload*/


/*Accordian*/
/*export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}*/
/*Accordian*/



@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.css'],


  /*Accordian*/
  // providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
  /*Accordian*/


  providers: [Commonservices],
})
export class TrialsComponent implements OnInit {


  /*File Upload*/
  files:UploadFile[];
  files1:UploadFile[];
  uploadInput:EventEmitter<UploadInput>;
  humanizeBytes:Function;
  dragOver:boolean;
  options: UploaderOptions;
  @ViewChild('fileInput1') uploaderInput: ElementRef;
  @ViewChild('fileInput2') uploaderInput1: ElementRef;
  /*File Upload*/



  constructor(private _commonservices:Commonservices) {


    /*File Upload*/
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
    /*File Upload*/


  }

  ngOnInit() {
  }


  /*File Upload*/
  onUploadOutput(output:UploadOutput):void {
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
    // console.log('files');
    // console.log(this.files);
  }

  onUploadOutput1(output:UploadOutput):void {
    this.uploaderInput1.nativeElement.value = '';
    if (output.type === 'allAddedToQueue') {
      const event:UploadInput = {
        type: 'uploadAll',
        url: this._commonservices.nodesslurl + 'uploads',
        method: 'POST',
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      if (output.file.response != "") {
        this.files1 = [];
        this.files1.push(output.file);
      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files1.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      console.log('index'+index);
      this.files1[index] = output.file;
      //this.files1.push(output.file);
    } else if (output.type === 'removed') {
      this.files1 = this.files1.filter((file:UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    console.log('files1');
    console.log(this.files1);
  }
  /*File Upload*/



}