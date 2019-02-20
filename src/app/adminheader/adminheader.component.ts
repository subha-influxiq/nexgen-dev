import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, Params } from '@angular/router';


/*h*/
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
})
export class AdminheaderComponent implements OnInit {
public type:any;
  constructor(public cookie:CookieService,public router:Router) {
    this.type=this.cookie.get('usertype');
    console.log('type');
    console.log(this.type);
  }
  logout(){
    this.cookie.deleteAll();
    this.router.navigate(['/']);
  }



  ngOnInit() {
  }

}
