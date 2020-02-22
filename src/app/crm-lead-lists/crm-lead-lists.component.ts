import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crm-lead-lists',
  templateUrl: './crm-lead-lists.component.html',
  styleUrls: ['./crm-lead-lists.component.css']
})
export class CrmLeadListsComponent implements OnInit {

  public expandedIndex:any;
  public ActionLists:any;
  public subActionLists:any;

  constructor(public router: Router) { }

  ngOnInit() {
    this.expandedIndex = -1  
    this.ActionLists = [{name:"Status"},{name:"Hipster Ipsum"},{name:"Corporate Ipsum"},{name:"Legal Ipsum"}]
  }

  Collaps(index: number) {  
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    //some values  
    this.subActionLists = [{subitem:"subth1"},{subitem:"subth2"},{subitem:"subth3"}];    
  }

  leaddetailurl(val:any){
    this.router.navigateByUrl('/crm-lead-details');
  }

}
