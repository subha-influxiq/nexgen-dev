import {Injectable} from '@angular/core';
import {  HttpClient } from '@angular/common/http';

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

    constructor(private http: HttpClient) {
        this.url = 'https://nexgen.influxiq.com/php/index.php?q=';
        this.nodesslurl = 'https://nodessl.influxiq.com:6027/';
        this.uploadurl = 'http://nexgen.influxiq.com/php/index.php';
        this.filedeleteurl = 'http://nexgen.influxiq.com/php/scrappage.php';
        this.fileurl = 'https://nexgen.influxiq.com/php/uploads/';
        this.filepathurl = 'https://nexgen.influxiq.com/php/uploads/';
        this.base64encode = 'https://nexgen.influxiq.com/php/index.php?encode=encodefile';
        this.roletypes=[
            {type0:'admin'},
            {type1:'regional_recruiter'},
            {type2:'rep'}
        ];
        console.log(this.roletypes);
    }
    shorten(str, maxLen, separator = '') {
        if (str.length <= maxLen) return str;
        return str.substr(0, maxLen);
    }
}
