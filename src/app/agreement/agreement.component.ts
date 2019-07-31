import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {

  modalref:BsModalRef;

  constructor(public router:Router,public http:HttpClient,public modalservices:BsModalService,public cookie:CookieService,public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  /* Open Modal */
  openModal(template:TemplateRef<any>) {
    this.modalref = this.modalservices.show(template, {class: 'signmodal'});
  }

}
