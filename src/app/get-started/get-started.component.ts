import { Component, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
  }

}
