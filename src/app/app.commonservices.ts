import {Injectable} from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
declare var moment:any;

@Injectable()
export class Commonservices {
    url: any;
    uploadurl: any;
    fileurl: any;
    public filedeleteurl: string;
    public filepathurl: string;
    public base64encode: any;
    public nodesslurl: any;
    public roletypes: any;
    public uploadsslurl: any;
/*    public traininglessonflag: boolean = false;
    public traininglessoncount: any = 0;
    public lasttrainingid: any = 0;
    public lessonarray: any = [];*/

    constructor(private http: HttpClient, public sanitizer: DomSanitizer) {
        this.url = 'https://nexgen.influxiq.com/php/index.php?q=';
      //  this.nodesslurl = 'https://nodessl.influxiq.com:6027/';
        this.uploadurl = 'http://nexgen.influxiq.com/php/index.php';
        this.filedeleteurl = 'http://nexgen.influxiq.com/php/scrappage.php';
        this.fileurl = 'https://nexgen.influxiq.com/php/uploads/';
        this.filepathurl = 'https://nexgen.influxiq.com/php/uploads/';
        this.base64encode = 'https://nexgen.influxiq.com/php/index.php?encode=encodefile';



        this.nodesslurl = 'http://api.nexgentesting.com:7001/';
        this.uploadsslurl = 'http://api.nexgentesting.com/assets/uploads/';



        this.roletypes=[
            {type0:'admin'},
            {type1:'regional_recruiter'},
            {type2:'rep'},
        ];
      //  console.log(this.roletypes);
        this.sanitizer=sanitizer;
    }
    shorten(str, maxLen, separator = '') {
        if (str.length <= maxLen) return str;
        return str.substr(0, maxLen);
    }
    
    /*htmlshow(htmlarray){

        if(this.traininglessonflag==false){
            for(let i in htmlarray){
                if(htmlarray[i].prerequisite_lesson==null && htmlarray[i].filetype=='html')
                { this.traininglessonflag = true;
                    this.traininglessoncount++;
                    this.lasttrainingid=htmlarray[i]._id;
                 //   return this.sanitizer.bypassSecurityTrustHtml(htmlarray[i].htmleditorvalue);
                 //    return htmlarray[i].htmleditorvalue;
                    return '<p>testing</p>';
                    break;
                }
            }
        }else{
            for(let i in htmlarray){
                if(htmlarray[i].prerequisite_lesson==this.lasttrainingid  && htmlarray[i].filetype=='html')
                {
                    this.traininglessoncount++;
                    this.lasttrainingid=htmlarray[i]._id;
                    //return this.sanitizer.bypassSecurityTrustHtml(htmlarray[i].htmleditorvalue);
                    console.log('htmlarray[i].htmleditorvalue');
                    console.log(htmlarray[i].htmleditorvalue);
                    return '<p>testing</p>';
                    //return htmlarray[i].htmleditorvalue;
                    break;
                }
            }
        }
    }*/
    showdate(dt){
     //   return moment(dt).format("Do, MMM, YYYY");
        return moment(dt).format("MMM Mo YY");
    }
}
