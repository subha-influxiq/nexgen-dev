import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lead-contract',
  templateUrl: './lead-contract.component.html',
  styleUrls: ['./lead-contract.component.css']
})
export class LeadContractComponent implements OnInit {
public all_data: any;
public today: any = new Date;
  constructor(
    public route: ActivatedRoute,
    protected _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.data.forEach((data:any ) => {
      console.log(data.results.res[0]);
      this.all_data = data.results.res[0];
   });
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
