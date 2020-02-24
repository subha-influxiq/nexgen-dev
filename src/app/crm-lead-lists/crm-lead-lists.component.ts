import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crm-lead-lists',
  templateUrl: './crm-lead-lists.component.html',
  styleUrls: ['./crm-lead-lists.component.css']
})
export class CrmLeadListsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }


  leaddetailurl(){
    this.router.navigateByUrl('/crm-lead-details');
  }

}
