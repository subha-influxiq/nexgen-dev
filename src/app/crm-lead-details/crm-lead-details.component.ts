import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crm-lead-details',
  templateUrl: './crm-lead-details.component.html',
  styleUrls: ['./crm-lead-details.component.css']
})
export class CrmLeadDetailsComponent implements OnInit {
  showMyInfoUpdateBox: boolean = false;
  showUpdateNotes: boolean = false;
  showSaveNote: boolean = false;
  showEditNote: boolean = false;
  showMyInfoBox: boolean = false;
  public expandedIndex:any;
  public ActionLists:any;
  public subActionLists:any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.expandedIndex = -1  
    this.ActionLists = [{name:"Status"},{name:"Hipster Ipsum"},{name:"Corporate Ipsum"},{name:"Legal Ipsum"}]
  }

  Collaps(index: number) {  
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    //some values  
    this.subActionLists = [{subitem:"subth1"},{subitem:"subth2"},{subitem:"subth3"}];    
  }     

}
