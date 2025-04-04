
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*title = 'nexgetest';*/

  public url;
  public loading: boolean = false;
  constructor(private router: Router) {
    /* Universal Loader for Reslove */
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let curUrlTree = this.router.parseUrl(this.router.url);
        //  console.info(this.router.url);
        this.url = this.router.url;

        if (this.url == '/') {
          $('.nav-item').removeClass('active');
          $('.nav-item').eq(0).addClass('active');
        }
        if (this.url == '/who_we_are') {
          $('.nav-item').removeClass('active');
          $('.nav-item').eq(1).addClass('active');
        }
        if (this.url == '/about_pcr_testing') {
          $('.nav-item').removeClass('active');
          $('.nav-item').eq(2).addClass('active');
        }
        if (this.url == '/get_started') {
          $('.nav-item').removeClass('active');
          $('.nav-item').eq(3).addClass('active');
        }
        if (this.url == '/contact_us') {
          $('.nav-item').removeClass('active');
          $('.nav-item').eq(4).addClass('active');
        }
      }
    });
  }
}
