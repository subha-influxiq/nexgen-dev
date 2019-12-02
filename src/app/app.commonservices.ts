import {Injectable} from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
declare var moment:any;

@Injectable()
export class Commonservices {
    url: any;
    uploadurl: any;
    fileurl: any;
    public filedeleteurl: string;
    public filepathurl: string;
    public base64encode: any;
    // public nodesslurl: any;
    public siteurl: any;
    public roletypes: any;
    public uploadsslurl: any= environment["download_url"];
    public downloadurl: any= environment["downloadurl_2"];
    public fileimgsslurl: any;
    public gapisslurl: any;
    public pdfsslurl: any;
    public totaltimezone: any;
    public serverfileurl:any= environment["serverfileurl"] ;
    public nodesslurl =  environment["api_url"];
    public uploadurl_old = environment["download_url_old"] ;
    public productid =  environment["productid"];
    public awstrainingid = environment["awstrainingid"];
    public mdstocktrainingid = environment["mdstocktrainingid"];
    public userid:any = '';
/*    public traininglessonflag: boolean = false;
    public traininglessoncount: any = 0;
    public lasttrainingid: any = 0;
    public lessonarray: any = [];
    https://nodessl.influxiq.com:6005/test1*/

    constructor(private http: HttpClient, public sanitizer: DomSanitizer, public cookie: CookieService) {
        this.userid = this.cookie.get('userid');
        this.url = 'https://nexgen.influxiq.com/php/index.php?q=';
      //  this.nodesslurl = 'https://nodessl.influxiq.com:6027/';
        this.uploadurl = 'http://nexgen.influxiq.com/php/index.php';
        this.filedeleteurl = 'http://nexgen.influxiq.com/php/scrappage.php';
        this.fileurl = 'https://nexgen.influxiq.com/php/uploads/';
        this.filepathurl = 'https://nexgen.influxiq.com/php/uploads/';
        this.base64encode = 'https://nexgen.influxiq.com/php/index.php?encode=encodefile';
  
       // this.nodesslurl = 'https://api.influxhostserver.com:6005/';
       // this.uploadsslurl = 'http://192.169.196.208:5005/download';
        this.fileimgsslurl = 'http://api.nexgentesting.com/';
      //  this.serverfileurl = 'https://www.betoparedes.com/betoparedesbackend/uploads/'
        this.siteurl = 'https://nexgentesting.com/';
        this.pdfsslurl = 'http://api.nexgentesting.com/testpdf/html2pdf/';
        this.gapisslurl = 'http://api.nexgentesting.com/gapi/t2.php';



        this.roletypes=[
            {type0:'admin'},
            {type1:'regional_recruiter'},
            {type2:'rep'},
            {type3:'contract_manager'},
        ];
      //  console.log(this.roletypes);
        this.sanitizer=sanitizer;


        this.http.get("assets/data/timezone.json")
            .subscribe(res => {
                let result;
                this.totaltimezone=result = res;
               // console.log(result);
            }, error => {
               // console.log('Oooops!');
            });
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
        return moment(dt).format("MMM Do YY");
    }
    showdateforreplegal(dt){
        //return moment(dt).format("MMMM Do, YYYY");
        return moment(dt).format("MM/DD/YYYY");
    }
    showunixtodate(dt){
     //   return moment(dt).format("Do, MMM, YYYY");
        if(dt ==null || dt.length<5) return "N/A";
        return moment.unix(dt/1000).format("MMM Do YY");
    }
    showunixtodate1(dt){
     //   return moment(dt).format("Do, MMM, YYYY");
        if(dt ==null || dt.length<5) return "N/A";
        return moment.unix(dt/1000).format("MM/DD/YYYY");
    }
    unixtodate(dt){
     //   return moment(dt).format("Do, MMM, YYYY");
        if(dt ==null || dt.length<5) return "N/A";
        return moment.unix(dt).format("MMM Do YY , HH:mm");
    }
    unixtotime(dt){
        //   return moment(dt).format("Do, MMM, YYYY");
        if(dt ==null || dt.length<5) return "N/A";
        return moment.unix(dt).format(" HH:mm A");
    }
    gettype(filename){
        // console.log('filename');
        // console.log(filename);
        //if(filename=='') return "DOC";
       var last;
        last = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
        if(last=='doc') return 'DOC';
        if(last=='docx') return 'DOCX';
        if(last=='pdf') return 'PDF';
        if(last=='ppt') return 'PPT';
        if(last=='txt') return 'TXT';
        if(last=='xls') return 'XLS';
        if(last=='jpg') return 'JPG';
        if(last=='png') return 'PNG';
    }
    showtimezone(timezn){
        for(let i in this.totaltimezone){
            if(this.totaltimezone[i].value==timezn){
                return this.totaltimezone[i].show;
            }
        }
    }

    showtimezoneByzonename(timezn){
        for(let i in this.totaltimezone){
            if(this.totaltimezone[i].timezone==timezn){
                return this.totaltimezone[i].show;
            }
        }
    }
    
    showcontractdate(){
        return moment().format("MM/DD/YYYY");
    }
    showtime(tm){
        return moment(tm).format('hh:mm A');
    }
    showdatetimeforuser(dt){
        return moment(dt).format("MM/DD/YYYY   hh:mm A");
    }
    //to convert 24-hour time to 12-hour time format
    tConv24(time24) {
        let ts = time24;
        let H = +ts.substr(0, 2);
        let h :any;
        h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
      }
      timeConv24to12(timeString){
        var H = +timeString.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? " AM" : " PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        return timeString;
      }
}
