import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commonservices } from '../app.commonservices';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';


@Component({
  selector: 'app-crm-belk-upload',
  templateUrl: './crm-belk-upload.component.html',
  styleUrls: ['./crm-belk-upload.component.css'],
  providers:[Commonservices]
})
export class CrmBelkUploadComponent implements OnInit {
public data: any;
public csvRecords: any;

dragOver:boolean;
public records: any[] = [];  
@ViewChild('fileInput1') uploaderInput: ElementRef; 
public tabledatalis:any=[];
public formdata:any;
public datasource:any;
uploadInput:EventEmitter<UploadInput>;

  constructor(public commonservices:Commonservices ,public _http:HttpClient) {
    this.uploadInput = new EventEmitter<UploadInput>();

    this.tabledatalis=[
      {value:'id',name:'ID',role:0,func:'',class:'id',type:'#'},
      {value:'created_by',name:'Full Name',role:0,func:'',class:'created_by',type:'text'},
      {value:'productname',name:'Products',role:0,func:'',class:'productname',type:'text'},
      {value:'batch_name',name:'Batch Name',role:0,func:'',class:'batch_name',type:'text'},
      {value:'resc',name:'Number Of Lead',role:0,func:'',class:'resc',type:'text'},
    ];
    this.formdata=[
    { inputtype: 'textarea', name: 'batch_name', label: 'Batch Name', placeholder: 'Enter Batch Name' ,validationrule:{required:true},validationerrormsg:'is required'},

    {inputtype:'select',name:'product',label:'Products',defaultchoice:'Select a Product',sourceview:'products',multiple:true,selectvalue:'productname',selectid:'_id',validationrule:{required:true},validationerrormsg:'is required'},

    { inputtype: 'file', name: 'file', label: 'File', placeholder: 'Select File', buttonname: 'Upload CSV', validationrule: { required: true }, validationerrormsg: 'is required', imagefolder: 'resource' },

    ];
    this.datasource={table:'csv_upload',objarr:[]};

   }

  ngOnInit() {
  }
  // upload(event){
  //   let snap;
  //   let selectedFiles = event.target.files;
  //   console.log(selectedFiles);
  //   const file = selectedFiles.item(0);
  //   console.log(file);
  //   // let currentFileUpload = new Fileup(file);
  //   // console.log(currentFileUpload);
  // }
  
  // uploadListener($event: any): void {  
  
  //   let text = [];  
  //   let files = $event.srcElement.files;  
  
  //   // if (this.isValidCSVFile(files[0])) {  
  
  //     let input = $event.target;  
  //     let reader = new FileReader();  
  //     // reader.readAsBinaryString(input.files[0]);
  //     reader.readAsDataURL(input.files[0])
  //     // reader.readAsText(input.files[0]);  
  
  //     reader.onload = (_event) => {  
  //       let csvData = reader.result;
  //       console.log(csvData);
  //         var postData: any = {
  //           file: csvData,
  //         }
  //   const link = this.commonservices.nodesslurl+'uploads-csv';
  //   this._http.post(link,postData)
  //       .subscribe((res)=>{
  //         console.log(res)
  //       });

  //         }
  //   // }
  // }



  // onUploadOutput(output:UploadOutput,ival):void {
  //   let files: any = [];
  //   // this.errormg = '';
  //   this.uploaderInput.nativeElement.value = '';
  //   if (output.type === 'allAddedToQueue') {
  //     const event: UploadInput = {
  //       type: 'uploadAll',
  //       url: this.commonservices.nodesslurl + 'uploads-csv',
  //       method: 'POST',
  //     };
  //     this.uploadInput.emit(event);
  //   } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
  //     if (output.file.response != "") {
       
  //       files.push(output.file);

  //     }
  //   } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
  //     const index = files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
  //     files[index] = output.file;
  //   } else if (output.type === 'removed') {
  //     files = files.filter((file: UploadFile) => file !== output.file);
  //   } else if (output.type === 'dragOver') {
  //     this.dragOver = true;
  //   } else if (output.type === 'dragOut') {
  //     this.dragOver = false;
  //   } else if (output.type === 'drop') {
  //     this.dragOver = false;
  //   }
  //   if (files.length>0) {
  //     console.log(files[0].response);
  //   }
  // }


  // uploadListener($event: any): void {  
  
  //   let text = [];  
  //   let files = $event.srcElement.files;  
  
  //   if (this.isValidCSVFile(files[0])) {  
  
  //     let input = $event.target;  
  //     let reader = new FileReader();  
  //     reader.readAsText(input.files[0]);  
  
  //     reader.onload = () => {  
  //       let csvData = reader.result;
  //       // console.log(csvData.split(/ /))  
  //       let csvRecordsArray = (<string>csvData).split(/\r\n|\n/); 
  //       let csvRecordsArray1 = (<string>csvData); 
  //       console.log(csvRecordsArray1) 
  
  //       let headersRow = this.getHeaderArray(csvRecordsArray);
  //       this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
  //     };  
  
  //     reader.onerror = function () {  
  //       console.log('error is occured while reading file!');  
  //     };  
  
  //   } else {  
  //     alert("Please import valid .csv file.");  
  //     this.fileReset();  
  //   }  
  // }  
  
  // getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
  //   let csvArr = [];  
  //       console.log(csvRecordsArray);
  //       console.log(headerLength);
  
  //   for (let i = 1; i < csvRecordsArray.length; i++) {  
  //     let curruntRecord = csvRecordsArray[i].split(",");  
  //     if (curruntRecord.length == headerLength) {  
  //       let csvRecord: CSVRecord = new CSVRecord();  
  //       csvRecord.id  = i;  
  //       csvRecord.firstName = curruntRecord[0].trim();  
  //       csvRecord.lastName = curruntRecord[1].trim();  
  //       csvRecord.company_name = curruntRecord[3].trim();  
  //       csvRecord.address = curruntRecord[4].trim();  
  //       csvRecord.city = curruntRecord[5].trim();  
  //       csvRecord.county = curruntRecord[6].trim();  
  //       csvRecord.state = curruntRecord[7].trim();  
  //       csvRecord.zip = curruntRecord[8].trim();  
  //       csvRecord.phone1 = curruntRecord[9].trim();  
  //       csvRecord.phone2 = curruntRecord[10].trim();  
  //       csvRecord.email = curruntRecord[11].trim();  
  //       csvRecord.web = curruntRecord[12].trim();  
  //       csvArr.push(csvRecord);  
  //     }  
  //   }  
  //   return csvArr;  
  // }  
  
  // isValidCSVFile(file: any) {  
  //   return file.name.endsWith(".csv");  
  // }  
  
  // getHeaderArray(csvRecordsArr: any) {  
  //   // let headers = csvRecordsArr[0].split(‘,’);      
  //   let headers = csvRecordsArr[0].split(',');  
  //   let headerArray = [];            
     
  //  for (let j = 0; j < headers.length; j++) {        
  //              headerArray.push(headers[j]);      
  //  }
  // return headerArray; 
  // }  
  
  // fileReset() {  
  //   this.csvReader.nativeElement.value = "";  
  //   this.records = [];  
  // }  
}   

//   isCSVFile(file: any) {

//     return file.name.endsWith(".csv");
 
//  }

//  getHeaderArray(csvRecordsArr: any) 
// {      
//    let headers = csvRecordsArr[0].split(',');      
//    let headerArray = [];            
     
//    for (let j = 0; j < headers.length; j++) {        
//                headerArray.push(headers[j]);      
//    }        
//   return headerArray; 
// }

// getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) 
// {     
//           var dataArr = []          

//           for (let i = 1; i < csvRecordsArray.length; i++) {         
//                let data = csvRecordsArray[i].split(',');         
//                // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS         
//                // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA        
              
//                if (data.length == headerLength) {            
//                     var csvRecord: CSVRecord = new CSVRecord();                                           
//                     csvRecord.firstName = data[0].trim();  
//                     csvRecord.lastName = data[1].trim();         
//                     csvRecord.email = data[2].trim();         
//                     csvRecord.phoneNumber = data[3].trim();      
//                     csvRecord.title = data[4].trim();      
//                     csvRecord.occupation = data[5].trim();                           
//                     dataArr.push(csvRecord);          
//                }       
//            }   
//            console.log(dataArr)
//     return dataArr; 
// } 

// fileChangeListener($event: any): void {     
//   var text = [];     
//   var files = $event.srcElement.files;          
 
//   if (this.isCSVFile(files[0])) {         
//      var input = $event.target;         
//      var reader = new FileReader();          
//      reader.readAsText(input.files[0]);         

//      reader.onload = (data) => {            
//           let csvData: any; 
//           csvData = reader.result;            
//           let csvRecordsArray = csvData.split(/\r\n|\n/);             
//           let headersRow = this.getHeaderArray(csvRecordsArray);             
//           this.csvRecords =  
//              this.getDataRecordsArrayFromCSVFile(csvRecordsArray,                                    
//              headersRow.length);
//             // console.log('___',headersRow)
//             }               

//              reader.onerror = function() {                  
//              };      
//     } else {          
//            alert("Please import valid .csv file.");          
//           //  this.fileReset();      
//     } 
// } 
  
//  fileChangeListener($event: any): void {     
//   var text = [];     
//   var files = $event.srcElement.files;          
 
//   console.log(files)
// } 
// fileChangeListener(files: FileList){
//   console.log(files);
//   if(files && files.length > 0) {
//      let file : File = files.item(0); 
//        console.log(file.name);
//        console.log(file.size);
//        console.log(file.type);
//        let reader: FileReader = new FileReader();
//        reader.readAsText(file);
//        reader.onload = (e) => {
//           let csv: string = reader.result as string;
//           console.log(csv);
//           this.data = csv;
//        }
//     }
// }
// }
