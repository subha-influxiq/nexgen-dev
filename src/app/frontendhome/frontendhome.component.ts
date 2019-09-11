import { Component, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-frontendhome',
  templateUrl: './frontendhome.component.html',
  styleUrls: ['./frontendhome.component.css']
})
export class FrontendhomeComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
  }

}
