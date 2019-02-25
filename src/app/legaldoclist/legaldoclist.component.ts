import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'app-legaldoclist',
    templateUrl: './legaldoclist.component.html',
    styleUrls: ['./legaldoclist.component.css'],
    providers: [Commonservices]
})
export class LegaldoclistComponent implements OnInit {
    public legaldocument:any;
    public last: string;

    constructor(public _commonservices:Commonservices,public _http:HttpClient,public cookeiservice:CookieService)
    {

    }

    ngOnInit()
    {
        this.getreplegaldoc();
    }
    getreplegaldoc()
    {
        const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
        // this._http.post(link,{source:'legaldocuser_view'})
        this._http.post(link,{source:'user_regional_legaldoc_view'})
            .subscribe(res => {
                let result;
                result = res;
                this.legaldocument=result.res;
                console.log(this.legaldocument);
               /* for (let y in this.legaldocument) {
                    this.last = this.legaldocument[y].filelocalname.substring(this.legaldocument[y].filelocalname.lastIndexOf(".") + 1, this.legaldocument[y].filelocalname.length);
                }*/
            }, error => {
                console.log('Oooops!');
            });
    }

}
