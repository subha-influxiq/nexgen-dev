/**
 * Created by kta pc on 7/25/2017.
 */
import {Injectable} from '@angular/core';
/*//import {Http, Response} from '@angular/http';*/
import {  HttpClient } from '@angular/common/http';
@Injectable()
export class Commonservices {
    items: Array<any>;
    url: any;
    uploadurl: any;
    fileurl: any;
    public filedeleteurl: string;
    public verifyurl: any;
    public filepathurl: string;
    public base64encode: any;
    public nodesslurl: any;

    constructor(private http: HttpClient) {
    /*    this.url = 'http://shattarblock.influxiq.com/php/server.php?q=';
        this.verifyurl = 'http://shattarblock.influxiq.com/php/smsverification.php';
        this.uploadurl = 'http://shattarblock.influxiq.com/php/fileupload.php';
        this.filepathurl = 'http://shattarblock.influxiq.com/nodeserver/uploads/';
        this.filedeleteurl = 'http://shattarblock.influxiq.com/php/scrappage.php';
        this.fileurl = 'https://shattarblock.influxiq.com/php/uploads/';
        this.base64encode = 'https://shattarblock.influxiq.com/php/index.php?encode=encodefile';*/

        this.uploadurl = 'http://shattarblock.influxiq.com/php/index.php';
        this.filedeleteurl = 'http://shattarblock.influxiq.com/php/scrappage.php';
        this.fileurl = 'https://shattarblock.influxiq.com/php/uploads/';
        this.filepathurl = 'https://shattarblock.influxiq.com/php/uploads/';
        this.base64encode = 'https://shattarblock.influxiq.com/php/index.php?encode=encodefile';
        this.url = 'https://shattarblock.influxiq.com/php/index.php?q=';
        this.nodesslurl = 'https://nodessl.influxiq.com:6021/';

        /*  if (window.location.hostname == 'localhost') {
         this.url = 'http://localhost:3000/';
         } else {
         //  this.url = 'http://influxiq.com:3014/';
         this.url = 'http://geofencedsp.com:3000/';
         }*/

    }
    shorten(str, maxLen, separator = '') {
        if (str.length <= maxLen) return str;
        //return str.substr(0, str.lastIndexOf(separator, maxLen));
        return str.substr(0, maxLen);
    }
}
