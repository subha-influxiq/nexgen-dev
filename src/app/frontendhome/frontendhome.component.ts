import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontendhome',
  templateUrl: './frontendhome.component.html',
  styleUrls: ['./frontendhome.component.css']
})
export class FrontendhomeComponent implements OnInit {

  constructor() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
  }

}
