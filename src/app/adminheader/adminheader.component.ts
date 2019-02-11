import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


/*h*/
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
})
export class AdminheaderComponent implements OnInit {
public type:any;
  constructor(public cookie:CookieService) {
    this.type=this.cookie.get('usertype');
    console.log('type');
    console.log(this.type);
  }

  ngOnInit() {
  }

}
