import { Component, OnInit, Inject } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-about-pcr-testing',
  templateUrl: './about-pcr-testing.component.html',
  styleUrls: ['./about-pcr-testing.component.css']
})
export class AboutPcrTestingComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
  }

}
