import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-frontendheader',
  templateUrl: './frontendheader.component.html',
  styleUrls: ['./frontendheader.component.css']
})
export class FrontendheaderComponent implements OnInit {

  constructor(public cookie:CookieService) { }

  ngOnInit() {
  }

}
