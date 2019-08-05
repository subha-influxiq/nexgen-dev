import { Component, OnInit, TemplateRef, ViewChild, EventEmitter, ElementRef, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Commonservices } from "../app.commonservices";
import { HttpClient } from "@angular/common/http";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { CookieService } from "ngx-cookie-service";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from "ngx-uploader";
import { routerNgProbeToken } from "@angular/router/src/router_module";

declare var moment: any;
declare var $: any;
@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css'],
    providers: [Commonservices],
})
export class ListingComponent implements OnInit {
    public start_time: any;
    public end_time: any;
    public submitval: any = 1;
    public message: any = '';
    public datalist: any = [];
    public formdataval: any = [];
    modalRef: BsModalRef;
    modalRef1: BsModalRef;
    private selectedid: any;
    public showLoader: any;
    public sourceval: any;
    // public image: any;
    @Input() templatetype = '';
    @Input() sourcetitle = 0;
    @Input() menuval = 0;
    @Input() hideaction: any = false;
    @Input() hideadd: any = false;
    @Input() slotlist: any = false;
    public tabledatalisval: any;
    public formgroup: FormBuilder;
    public dataForm: FormGroup;
    public sourceconditionval: any;
    public timezone: any = [];
    daterangepickerOptions = {/*
     startDate: '09/01/2017',
     endDate: '09/02/2017',*/
        format: 'MM/DD/YYYY',
        minDate: moment().format("MM/DD/YYYY"),
        noDefaultRangeSelected: true,
        /* singleCalendar : true,*/
    }
    bsDatepicker = {
        format: 'MM/DD/YYYY',
        minDate: moment().format("MM/DD/YYYY"),
        noDefaultRangeSelected: true
    }
    public formsourceval: any = [];
    public selecteditem: any;
    public filterval;
    public filterval1;
    public filterval2;
    public interv;
    public filterval3;
    imageChangedEvent: any = [];
    // croppedImage: any = '';
    public croppedImage: any = [];
    public base64imgdata: any = '';
    public unsafebase64imgdata: any = [];
    public selectedFile: any;
    public isedit: number = 0;
    public usertype: any;
    public itemis: any;
    public lockunlock: any;
    public minDate: any = new Date();

    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    options: UploaderOptions;
    @ViewChild('fileInput1') uploaderInput: ElementRef;
    public percentageis: any = [];
    public lengthis: any = [];
    public flag: number = 0;
    public nameis: any = [];
    public issubmit = 0;
    public loaderdiv = false;
    @Input()
    set source(source: string) {
        this.sourceval = (source && source.trim()) || '<no name set>';
        console.log('sourceval: ' + this.sourceval);
    }
    @Input()
    set sourcecondition(sourcecondition: string) {
        this.sourceconditionval = (sourcecondition) || '<no name set>';
        console.log('this.sourcecondition');
        console.log(this.sourceconditionval);
    }
    @Input()
    set formsource(formsource: string) {
        this.formsourceval = (formsource) || '<no name set>';
        console.log('formsourceval:');
        console.log(this.formsourceval);
    }
    @Input()
    set tabledatalis(tabledatalis: string) {
        this.tabledatalisval = (tabledatalis) || '<no name set>';
        console.log('tabledatalisval:');
        console.log(this.tabledatalisval);
    }
    @Input()
    set formdata(formdata: string) {
        this.formdataval = (formdata) || '<no name set>';
        console.log('formdataval:');
        console.log(this.formdataval);
    }
    


    constructor(public _commonservice: Commonservices, public router: Router, public _http: HttpClient, public modal: BsModalService, formgroup: FormBuilder, private cookeiservice: CookieService) {
        this.formgroup = formgroup;
        this._commonservice = _commonservice;
        // this.minDate.setDate(this.minDate.getDate() - 1);
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit() {
        this.usertype = this.cookeiservice.get('usertype');
        this.getdatalist();


        this._http.get("assets/data/timezone.json")
            .subscribe(res => {
                let result;
                this.timezone = result = res;
                console.log(result);
            }, error => {
                console.log('Oooops!');
                //this.formdataval[c].sourceval = [];
            });
        this.interv = setInterval(() => {
            this.getdatalist();
        }, 6000)
    }
    ngOnDestroy() {
        clearInterval(this.interv);
    }

    searchbyval() {
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval = this.filterval2 + '|';
        }
        if (this.filterval3 != '' && this.filterval3 != null) {
            this.filterval = this.filterval3 + '|';
        }
        console.log(this.filterval);
    }
    gettimezone(val) {
        for (let v in this.timezone) {
            if (this.timezone[v].value == val) {
                return this.timezone[v].timezone_city;
                // return this.timezone[v].show;
            }
        }
        return "N/A";
    }


    togglestatus(item: any) {
        console.log('item.status');
        console.log(item.status);
        let status: any;
        /*      if(item.status!=null) status=1-item.status;
         if(item.status==null) status=1;*/
        if (item.status != null && item.status != true && item.status != false) {
            status = false;
        }
        if (item.status == null) status = true;
        console.log('item.status99');
        console.log(item.status);
        const link = this._commonservice.nodesslurl + 'togglestatus?token=' + this.cookeiservice.get('jwttoken');
        /* console.log('link');
         console.log(link);*/
        this._http.post(link, { id: item._id, source: this.formsourceval.table, status: status })
            .subscribe(res => {
                this.getdatalist();
            }, error => {
                console.log('Oooops!');
                this.getdatalist();
            });
    }
    togglelockedstatusmodal(item: any, lockunlock, template: TemplateRef<any>, event) {
        this.modalRef1 = this.modal.show(template);
        event.stopPropagation();
        this.itemis = item;
        this.lockunlock = lockunlock;

    }
    togglelockedstatus() {
        let status: any;
        status = this.itemis.lock;
        /*      if(item.status!=null) status=1-item.status;
         if(item.status==null) status=1;*/
        if (this.itemis.lock == null && this.itemis.lock != 1 && this.itemis.lock != 0) {
            status = 1;
        }
        //if(item.status==null) status=1;

        //status=(1-(status));
        console.log('this.itemis.status99');
        console.log(this.itemis.lock);
        console.log(status);
        this.modalRef1.hide();
        const link = this._commonservice.nodesslurl + 'togglelockedstatus?token=' + this.cookeiservice.get('jwttoken');
        /* console.log('link');
         console.log(link);*/
        this._http.post(link, { id: this.itemis._id, source: this.formsourceval.table, status: status })
            .subscribe(res => {

                this.getdatalist();
            }, error => {
                console.log('Oooops!');
                this.getdatalist();
            });
    }


    getdatalist() {
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        /* console.log('link');
         console.log(link);*/
        console.log('hh---ist----');
        console.log(this.sourceconditionval);
        console.log(this.sourceval);
        this._http.post(link, { source: this.sourceval, condition: this.sourceconditionval })
            .subscribe(res => {
                let result;
                result = res;
                if (result.status == 'error') {
                    this.router.navigate(['/']);
                } else {
                    this.datalist = [];
                    this.datalist = result.res;
                    console.log('datalist:');
                    console.log(this.datalist);
                }
            }, error => {
                console.log('Oooops!');
                this.datalist = [];
            });
    }

    geteditdata() {
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        /* console.log('link');
         console.log(link);*/
        console.log('this.formsourceval');
        console.log(this.formsourceval);
        this._http.post(link, { source: this.sourceval, condition: { _id: this.selecteditem._id } })
            .subscribe(res => {
                let result;
                result = res;
                console.log('result:');
                console.log(result);
                if (result.status == 'error') {
                    this.router.navigate(['/']);
                } else {
                    let folder: any = '';
                    console.log(this.dataForm.controls);
                    for (let c in this.dataForm.controls) {
                        //   console.log(c);
                        //   console.log(result.res[0][c]);
                        this.dataForm.controls[c].patchValue(result.res[0][c]);
                        for (let j in this.formdataval) {
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'daterange') {
                                //let tval=this.getdaterangeval(result.res[0][c]);
                                //$('.dateRangePicker-input').val(tval);
                                console.log('date range !!!');
                                console.log(this.showdate(result.res[0][c]));
                                console.log((result.res[0][c]));
                                console.log((result.res[0][c][0]));
                                console.log((result.res[0][c][1]));
                                $('#inputdate' + this.formdataval[j].name).val(this.showdate(result.res[0][c]));
                                console.log(this.dataForm.controls[c].value);
                                let bsValue = new Date(result.res[0][c][0]);
                                //bsRangeValue: Date[];
                                let maxDate = new Date(result.res[0][c][1]);
                                //maxDate= maxDate.setDate(maxDate.getDate() + 7);
                                console.log('maxDate');
                                console.log(maxDate);
                                console.log('bsValue');
                                console.log(bsValue);
                                let datearr = [bsValue, maxDate];
                                this.dataForm.controls[c].patchValue(datearr);
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'dateis') {
                                console.log('date picker !!!');
                                //  console.log(this.showdate(result.res[0][c]));
                                //  console.log((result.res[0][c]));
                                //  console.log((result.res[0][c][0]));
                                //  console.log((result.res[0][c][1]));
                                //  $('#inputdateis'+this.formdataval[j].name).val(this.showdate(result.res[0][c]));
                                let a = result.res[0][c].split('T');
                                $('#inputdateis' + this.formdataval[j].name).val(moment(a[0]).format('MM-DD-YYYY'));
                                //  console.log(this.dataForm.controls[c].value);
                                let bsValue = new Date(result.res[0][c][0]);
                                //bsRangeValue: Date[];
                                let maxDate = new Date(result.res[0][c][1]);
                                //maxDate= maxDate.setDate(maxDate.getDate() + 7);
                                //  console.log('maxDate');
                                //  console.log(maxDate);
                                //  console.log('bsValue');
                                //   console.log(bsValue);
                                //  let datearr=[bsValue,maxDate];
                                //  this.dataForm.controls[c].patchValue(datearr);
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'timeis') {
                                console.log('time picker------------');
                                console.log(this.formdataval[j].name);
                                console.log((result.res[0][c]));

                                if (this.formdataval[j].name == 'start_time') {
                                    let sttime = new Date();
                                    var spl = result.res[0][c].split(':');
                                    sttime.setHours(spl[0]);
                                    sttime.setMinutes(spl[1]);
                                    this.start_time = sttime;
                                    // this.start_time=result.res[0][c];
                                }
                                if (this.formdataval[j].name == 'end_time') {
                                    let sttime = new Date();
                                    var spl = result.res[0][c].split(':');
                                    sttime.setHours(spl[0]);
                                    sttime.setMinutes(spl[1]);
                                    this.end_time = sttime;
                                    // this.end_time=result.res[0][c];
                                }
                                // if(this.formdataval[j].name=='start_time')this.start_time=result.res[0][c];
                                // if(this.formdataval[j].name=='end_time')this.end_time=result.res[0][c];
                                // console.log('start_time  '+this.start_time);
                                // console.log('end_time  '+this.end_time);
                                // console.log(this.start_time);
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'checkbox') {
                                let checkval = result.res[0][c];
                                if (result.res[0][c] == 1) checkval = true;
                                else checkval = false;
                                this.dataForm.controls[c].patchValue(checkval);
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'image') {
                                folder = this.formdataval[j].imagefolder;
                                const link = this._commonservice.base64encode + '&img=' + this.dataForm.controls[c].value + '&type=' + folder;
                                this._http.get(link)
                                    .subscribe(res => {
                                        let result: any;
                                        result = res;
                                        //   console.log(result);
                                        if (result.data != null) {
                                            this.unsafebase64imgdata[j] = result.data;
                                            this.croppedImage[j] = result.data;
                                        }
                                    }, error => {
                                        console.log('Oooops!');
                                    });
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'file') {
                                this.percentageis[j] = 100;
                                this.lengthis[j] = 1;
                                this.flag = 0;
                                this.nameis[j] = result.res[0][c];
                            }
                        }
                    }
                    this.dataForm.addControl('id', new FormControl(this.selecteditem._id, Validators.required));
                }
            }, error => {
                console.log('Oooops!');
                this.datalist = [];
            });
    }
    getselectdata(source: any, c: any) {
        if (this.formdataval[c].sourcetype == null || this.formdataval[c].sourcetype != 'static') {
            const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
            /*  console.log('link');
             console.log(link);*/
            this._http.post(link, { source: source })
                .subscribe(res => {
                    let result;
                    result = res;
                    if (result.status == 'error') {
                        this.router.navigate(['/']);
                    } else {
                        this.formdataval[c].sourceval = result.res;
                        console.log(this.formdataval[c].sourceval);
                    }
                }, error => {
                    console.log('Oooops!');
                    this.formdataval[c].sourceval = [];
                });
        } else {
            // this.formdataval[c].sourceval=this._http.get("assets/data/states_titlecase.json");
            this._http.get("assets/data/" + source + ".json")
                .subscribe(res => {
                    let result;
                    this.formdataval[c].sourceval = result = res;
                    console.log(result);
                }, error => {
                    console.log('Oooops!');
                    this.formdataval[c].sourceval = [];
                });
        }

    }

    deletdata(val: any, template: TemplateRef<any>) {
        this.modalRef1 = this.modal.show(template);
        this.selecteditem = val;
    }
    confirmdelete(template: TemplateRef<any>) {
        this.modalRef1.hide();
        this.isedit = 0;
        this.message = "Record deleted successfully!!";
        const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
        /* console.log('link');
         console.log(link);*/
        this._http.post(link, { source: this.formsourceval.table, id: this.selecteditem._id })
            .subscribe(res => {
                let result;
                result = res;
                this.getdatalist();
                this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                setTimeout(() => {
                    this.modalRef1.hide();
                    this.isedit = 0;
                }, 4000);
            }, error => {
                console.log('Oooops!');
            });

    }
    nodelete() {
        this.modalRef1.hide();
    }
    editmodal(template: TemplateRef<any>, selecteddata: any) {
        this.selecteditem = selecteddata;
        this.isedit = 1;
        this.openform(template, this.isedit);

    }
    openform(template: TemplateRef<any>, type) {
        this.nameis = [];
        this.percentageis = [];
        this.lengthis = [];
        if (type == 0) this.isedit = 0;
        let formgrp: any = [];
        this.base64imgdata = [];
        this.unsafebase64imgdata = [];
        // let tempval;
        for (let c in this.formdataval) {
            /*  console.log(this.formdataval[c]);
             console.log('this.formdataval[c].validationrule');
             console.log(this.formdataval[c]);
             console.log(this.formdataval[c].validationrule);*/

            if (this.isedit == 0 || (this.formdataval[c].isaddonly == null && this.formdataval[c].isaddonly != true)) {
                this.start_time = '';
                this.end_time = '';
                if (this.formdataval[c].inputtype == 'checkbox') {
                    formgrp[this.formdataval[c].name] = [false];
                }
                else if (this.formdataval[c].inputtype == 'dateis') {
                    formgrp[this.formdataval[c].name] = [moment().format('MM-DD-YY'), Validators.required];
                } else {
                    //   let tempdefault:any='';
                    let tempdefault = [];
                    if (this.formdataval[c].multiple != null && this.formdataval[c].multiple == true)
                        // let  tempdefault=[];
                        console.log('inside it');
                    console.log(tempdefault);
                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.required) formgrp[this.formdataval[c].name] = [tempdefault, Validators.required];
                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.email) formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])];
                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.confirmpass) formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, this.equalToPass('password')])];
                    if (this.formdataval[c].validationrule != null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) formgrp[this.formdataval[c].name] = [tempdefault];
                    if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) formgrp[this.formdataval[c].name] = [tempdefault];
                    if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value != null) formgrp[this.formdataval[c].name] = [this.formdataval[c].value];
                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.url) formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')])];
                    if (this.formdataval[c].inputtype == 'select') {
                        this.getselectdata(this.formdataval[c].sourceview, c);
                    }
                    this.imageChangedEvent = [];
                    this.croppedImage = [];

                }

                if (this.formdataval[c].role != null) {
                    console.log('this.formdataval[c].role');
                    console.log(this.formdataval[c].role);
                    console.log(this.usertype);
                    console.log(this.formdataval[c].role.indexOf(this.usertype));
                    if (this.formdataval[c].role.indexOf(this.usertype) == -1) {
                        console.log('in hidden ...');
                        this.formdataval[c].inputtype = 'hidden';
                        setTimeout(() => {
                            this.dataForm.controls[this.formdataval[c].name].patchValue(this.cookeiservice.get(this.formdataval[c].defaultval));
                        }, 1000);
                    }
                }
            }
        }
        this.dataForm = this.formgroup.group(formgrp);
        if (this.isedit == 1) {
            this.geteditdata();

        }
        this.modalRef = this.modal.show(template);
        console.log(this.dataForm);
    }

    equalToPass(fieldname): ValidatorFn {                                 //password match custom function
        return (control: AbstractControl): { [key: string]: any } => {      ///abstractcontrol function call here with key string any type

            let input = control.value;      //class create here
            let isValid = control.root.value[fieldname] == input;       //value valid or not
            if (!isValid)
                return {
                    equalTo: true            //this value will be called
                };
        };
    }

    //not relevant for now !!
    equalpass() {
        if (this.dataForm != null) {
            if (this.dataForm.controls['confirmpassword'] == null || this.dataForm.controls['confirmpassword'].value == '') {
                return { 'equalpass': true };
            }
            if (this.dataForm.controls['password'] != this.dataForm.controls['confirmpassword']) {
                return { 'equalpass': true };
            }
            return null;
        }
    }

    formsubmit() {
        this.issubmit = 1;
        console.log('this.start_time' + this.start_time);
        if (this.start_time != null && this.start_time != '') {
            this.dataForm.controls['start_time'].patchValue(this.start_time);
        }
        if (this.end_time != null && this.end_time != '') {
            this.dataForm.controls['end_time'].patchValue(this.end_time);
        }
        let y: any;
        for (y in this.dataForm.controls) {
            this.dataForm.controls[y].markAsTouched();
        }
        console.log('this.dataForm.value');
        console.log(this.dataForm.value);

        if (this.formsourceval.table == 'events') {
            var tzval = this.dataForm.controls['timezone'].value.split('|');
            tzval = tzval[1];
            console.log(tzval);
            console.log(moment(this.dataForm.controls['start_time'].value).tz(tzval).format());
            console.log(moment(this.dataForm.controls['end_time'].value).tz(tzval).format());
            this.dataForm.controls['start_date'].patchValue(moment(this.dataForm.controls['start_date'].value).format('YYYY-MM-DD'));
            this.dataForm.controls['end_date'].patchValue(moment(this.dataForm.controls['end_date'].value).format('YYYY-MM-DD'));
            this.dataForm.controls['start_time'].patchValue(moment(this.dataForm.controls['start_time'].value).format('HH:mm'));
            this.dataForm.controls['end_time'].patchValue(moment(this.dataForm.controls['end_time'].value).format('HH:mm'));/*.tz(tzval)*/
            console.log('this.dataForm.value');
            console.log(this.dataForm.value);
        }
        //  console.log($('select[name="roleaccess"]').val());
        if (this.dataForm.valid && this.submitval == 1) {
            const link = this._commonservice.nodesslurl + 'addorupdatedata';
            console.log('link');
            console.log(link);
            console.log(this.router.url);
            this._http.post(link, { source: this.formsourceval.table, data: this.dataForm.value, sourceobj: this.formsourceval.objarr })
                .subscribe(res => {
                    let result: any;
                    result = res;
                    this.issubmit = 0;
                    //  console.log(result);
                    if (result.status == 'success') {
                        //   this.modalRef.hide();
                        this.isedit = 0;
                        setTimeout(() => {
                            this.getdatalist();
                            this.imageChangedEvent = [];
                            this.croppedImage = [];
                            this.modalRef.hide();
                            this.dataForm.reset();
                        }, 2000);

                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    rangeSelected($event, controlname: any) {
        let dval = moment.unix($event.start).unix() + '|' + moment.unix($event.end).unix();
        //hidden field value : startdate|enddate -- it will be inserted to db
        this.dataForm.controls[controlname].patchValue(dval);
    }

    showsingledate(dateis) {
        let st = moment(dateis).format('MM/DD/YYYY');
        return st;
    }
    showtime(dateis) {
        //   var timeString = "09:00:00";
        var timeString = dateis + ":00";
        var H = +timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? " AM" : " PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        return timeString;
    }
    showdate(dateis) {
        let st = dateis[0];
        let endt = dateis[1];
        st = moment(st).format('MMM Do YY');
        endt = moment(endt).format('MMM Do YY');
        return st + ' To ' + endt;
    }
    showrealdate(dateis) {
        if (dateis == null || dateis.length < 3) return 'N/A';
        //console.log(moment().unix(dateis/1000).format('MMM Do YY'));
        return moment(dateis).format('MM/DD/YYYY');
    }

    getdaterangeval(dateis) {
        if (dateis != null) {
            let datearr = dateis.split('|');
            return moment.unix(datearr[0] / 1000).format('MM/DD/YYYY') + '-' + moment.unix(datearr[1] / 1000).format('MM/DD/YYYY');
        }
        else {
            return 'No date selected!';
        }
    }
    /*   onFileChanged(event,control:any,i:any){
     console.log(control);
     console.log(control.name);
     console.log(control.imagefolder);
     this.selectedFile = event.target.files[0];
     const uploadData = new FormData();
     uploadData.append('file', this.selectedFile);
     const link = this._commonservice.uploadurl+'?imagefolder='+control.imagefolder;
     this._http.post(link,uploadData)
     .subscribe(event => {
     let res: any = {};
     res = event;
     if(res.error_code == 0){
     //  this.image = this._commonservice.filepathurl+ res.filename;
     this.dataForm.controls[control.name].patchValue(res.filename);
     this.formdataval[i].filename=control.imagefolder+'/'+res.filename;
     }
     });
     }*/
    saveimg(control: any, i: any, template: TemplateRef<any>) {
        /*  console.log(control);
         console.log(control.name);
         console.log(control.imagefolder);*/
        const uploadData = new FormData();
        if (this.selectedFile == null) this.selectedFile = 0;
        uploadData.append('file', this.selectedFile);
        uploadData.append('base64data', this.croppedImage[i]);
        const link = this._commonservice.uploadurl + '?imagefolder=' + control.imagefolder;
        this._http.post(link, uploadData)
            .subscribe(event => {
                let res: any = {};
                res = event;
                if (res.error_code == 0) {
                    this.dataForm.controls[control.name].patchValue(res.filename);
                    this.formdataval[i].filename = control.imagefolder + '/' + res.filename;
                    this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                    this.message = 'Image Saved Successfully !!';
                    setTimeout(() => {
                        this.modalRef1.hide();
                    }, 5000);
                }
            });
    }
    //for image crop
    fileChangeEvent(event: any, i: any): void {
        this.selectedFile = event.target.files[0];
        this.imageChangedEvent[i] = event;
    }
    imageCropped(event: ImageCroppedEvent, item: any, i: any) {
        this.croppedImage[i] = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    loadImageFailed() {
        // show message
    }
    gotorepdetails(idis) {
        console.log(idis);
        //this.router.navigate(['/repdetails',idis]);
    }
    /* showname(i){
     console.log(i);
     console.log(this.formdataval['timezone'].sourceval);
     }*/
    onUploadOutput(control: any, i, output: UploadOutput): void {
        //  this.servernameis = null;
        //  this.errormg='';
        //   this.uploaderInput.nativeElement.value = '';
        if (output.type === 'allAddedToQueue') {
            const event: UploadInput = {
                type: 'uploadAll',
                url: this._commonservice.nodesslurl + 'uploads',
                method: 'POST',
            };
            this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            if (output.file.response != "") {
                this.files = [];
                this.files.push(output.file);
                console.log('this.files*********');
                console.log(this.files);
                this.lengthis[i] = this.files.length;
                this.percentageis[i] = this.files[0].progress.data.percentage;
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
            this.lengthis[i] = this.files.length;
            this.percentageis[i] = this.files[0].progress.data.percentage;
            console.log('this.files==================');
            console.log(this.files);
        } else if (output.type === 'removed') {
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
        console.log('files-');
        console.log(this.files);
        if (this.percentageis[i] == 100) this.flag = 1;
        if (this.percentageis[i] == 100 && this.flag == 1) {
            this.addtodataform(control, i);
        }
    }
    addtodataform(control: any, i) {
        this.nameis[i] = this.files[0].name;
        let filelocalname = control.name + 'localname';
        this.dataForm.controls[control.name].patchValue(this.files[0].response);
        this.dataForm.controls[filelocalname].patchValue(this.files[0].name);
        this.formdataval[i].filename = this.files[0].name;
    }
    showstatusofrep(item) {
        if (item.noofclinics == null && (item.password == null || item.password == '')) return 'Not Qualified';

        //  if((item.noofclinics<40 || item.noofclinics==null) && (item.password!='' && item.password!=null)) return 'Not Qualified';

        if ((item.noofclinics < 12 || item.noofclinics == null) && (item.password == '' || item.password == null)) return 'Not Qualified';

        if (item.noofclinics == null && (item.password != null && item.password != '')) {
            if (item.lock == 1) {
                return 'Pending Phone Verification';
            }
            if (item.signup_step2 == 1 && item.contractstep == null && item.reptraininglessonstep == null) { // && item.lock==0
                return 'Pending Contract';
            }/*
             if(item.signup_step2==1  && item.contractstep==null && item.reptraininglessonstep==null) { // && item.lock==1
             return 'Pending Phone Verification';
             }*/
            if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == null) { // && item.lock==0
                return 'Pending New Hire Training';
            }
            if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == 1) { // && item.lock==0
                return 'Dashboard Access';
            }
        }



        if (item.noofclinics >= 12 && (item.password == null || item.password == '')) return 'Pending Sign Up';

        if (item.lock == 1) {
            return 'Pending Phone Verification';
        }
        if (item.signup_step2 == 1 && item.contractstep == null && item.reptraininglessonstep == null) { // && item.lock==0
            return 'Pending Contract';
        }/*
        if(item.signup_step2==1  && item.contractstep==null && item.reptraininglessonstep==null) { // && item.lock==1
            return 'Pending Phone Verification';
        }*/
        if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == null) { // && item.lock==0
            return 'Pending New Hire Training';
        }
        if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == 1) { // && item.lock==0
            return 'Dashboard Access';
        }
    }
    showphoneno(phn) {
        if (phn != null && phn.length>0) {
            phn = phn.replace(/ /g, "");
            phn = phn.replace(/-/g, "");
            return phn.slice(0, 3) + '-' + phn.slice(3, 6) + '-' + phn.slice(6, 10);
        } else
            return "N/A";
        //  if(phn !=null) return '('+phn.slice(0,3)+')'+phn.slice(3,6)+'-'+phn.slice(6,10);


    }
    /* addeventclass(){
         if(this.router.url=='/calendar' || this.router.url=='/event') return 'eventuniqueclass ' ;
         else return '';
     }
     addeventformclass(){
         if(this.router.url=='/calendar' || this.router.url=='/event') return 'addeventformclass ' ;
         else return '';
     }*/

    addeventform1class() {
        if (this.router.url == '/calendar' || this.router.url == '/event') return 'newaddeventformclass ';
        else return '';
    }
    syncgoogle() {
        const link = this._commonservice.nodesslurl + 'modifyusercalender';
        let data = {
            userid: this.cookeiservice.get('userid'),
            email: this.cookeiservice.get('useremail')
        }
        this.loaderdiv = true;
        setTimeout(() => {
            this.loaderdiv = false;
        }, 10000);
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                this.issubmit = 0;
                //  console.log(result);
                if (result.status == 'success') {
                    //   this.modalRef.hide();
                    this.isedit = 0;
                    setTimeout(() => {
                        this.getdatalist();
                        this.imageChangedEvent = [];
                        this.croppedImage = [];
                        this.modalRef.hide();
                        this.dataForm.reset();
                    }, 2000);

                }
            }, error => {
                console.log('Oooops!');
            });
    }
}
