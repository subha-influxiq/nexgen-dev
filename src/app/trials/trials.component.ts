import { Component, OnInit } from '@angular/core';
import { AccordionConfig } from 'ngx-bootstrap/accordion';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class TrialsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
