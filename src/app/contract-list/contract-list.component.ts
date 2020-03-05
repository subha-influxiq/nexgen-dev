import { Component, OnInit, TemplateRef, Renderer2 } from '@angular/core';
import { Commonservices } from '../app.commonservices';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css'],
  providers: [Commonservices]
})
export class ContractListComponent implements OnInit {


  modalRef1: BsModalRef;
  public classList: any;

  public datalist: any;
  public selecteditem;
  public message;
  public loader = 0;
  headElements = ['ID', 'Date', 'Product Name', 'Created_by', 'Notes', 'Status'];

  public filterval4: any;
  public prodSelect = 0;
  public product_list: any;

  constructor(public _commonservice: Commonservices,
    public cookeiservice: CookieService,
    public _http: HttpClient,
    public router: Router,
    private renderer: Renderer2,
    public route: ActivatedRoute,
    public modal: BsModalService,
    protected _sanitizer: DomSanitizer) {
    let link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, { source: 'products',"condition": {"status":true}  })
      .subscribe((res: any) => {
        this.product_list = res.res;
        console.log(this.product_list);
      });

     }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      console.log('json', data.results.res);
      this.datalist = data.results.res;
    });
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  getdata() {
    this.loader = 1;
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, { source: 'contractDetails_view' }).subscribe(res => {
      let result: any = res;
      this.datalist = result.res;
      this.loader = 0;
    });
  }

  searchProduct(val) {
    this.loader = 1;
    console.log(val);
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, {
      source: 'contractDetails_view', "condition": {
        "product_name": val
      }
    }).subscribe(res => {
      let result: any = res;
      console.log(result.res);
      this.datalist = result.res;
      this.loader = 0;
    });
  }

  editRow(val: any, st) {
    console.log(val);
    if (st == 1) {
      this.modalRef1.hide();
    }
    this.router.navigateByUrl('/edit-contract/' + val._id);
  }

  deletdata(val: any, template: TemplateRef<any>) {
    this.modalRef1 = this.modal.show(template);
    this.selecteditem = val;
  }
  togglestatus(item: any) {
    let status: any;
    if (item.status != null && item.status == true) {
      status = false;
    }
    if (item.status == null || item.status == false) status = true;
    const link = this._commonservice.nodesslurl + 'togglestatus?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, { id: item._id, source: "contractDetails", status: status })
      .subscribe(res => {
        this.showdata();
      }, error => {
        this.showdata();
      });
  }
  showdata() {
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, { source: 'contractDetails_view' }).subscribe(res => {
      let result: any = res;
      this.datalist = result.res;
    });
  }

  openModalData(val: any, template: TemplateRef<any>) {
    this.modalRef1 = this.modal.show(template);
    this.selecteditem = val;
  }

  confirmdelete(template: TemplateRef<any>) {
    this.modalRef1.hide();
    this.message = "Record deleted successfully!!";
    const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, { source: 'contractDetails', id: this.selecteditem._id })
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == "success") {
          this.getdata();
          this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
          setTimeout(() => {
            this.modalRef1.hide();
          }, 4000);
        }

      }, error => {
        console.log('Oooops!');
      });
  }
  nodelete() {
    this.modalRef1.hide();
  }

}
