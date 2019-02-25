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
  private legaldocument:any;

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
    this._http.post(link,{source:'legaldocuments'})
        .subscribe(res => {
          let result;
          result = res;
          this.legaldocument=result.res;
          console.log(this.legaldocument);

        }, error => {
          console.log('Oooops!');
        });
  }

}
