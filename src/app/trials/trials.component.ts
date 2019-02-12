import { Component, OnInit,NgZone, EventEmitter } from '@angular/core';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import {Commonservices} from '../app.commonservices' ;

/*export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}*/

@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.css'],
  // providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
  providers: [Commonservices],
})
export class TrialsComponent implements OnInit {
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  private zone: NgZone;
  public basicOptions: Object;
  constructor(private _commonservices: Commonservices) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
  }
  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.disableuploader = 1;
      console.log('this.disableuploader === before');
      const event: UploadInput = {
        type: 'uploadAll',
        url:   this._commonservices.nodesslurl + 'uploads',
        method: 'POST',
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      if (output.file.response != "") {
        this.files = [];
        this.files.push(output.file);
      }
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      console.log(this.files);
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    console.log('files??');
    console.log(this.files);
  }
  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'https://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }
}