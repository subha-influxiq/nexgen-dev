import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FunnelComponent } from './funnel/funnel.component';
import { SignupComponent } from './signup/signup.component';
import {appRoutingProviders, routing} from './route';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ListingComponent  } from './listing/listing.component';
import { AdminmanagementComponent } from './adminmanagement/adminmanagement.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {ModalModule} from 'ngx-bootstrap/modal';
import { RegionalRecruiterComponent } from './regional-recruiter/regional-recruiter.component';
import { RepComponent } from './rep/rep.component';
import { RegionalDashboardComponent } from './regional-dashboard/regional-dashboard.component';
import { RepDashboardComponent } from './rep-dashboard/rep-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ContractComponent } from './contract/contract.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FunnellandingpageComponent } from './funnellandingpage/funnellandingpage.component';
import { TranningcategorymanagementComponent } from './tranningcategorymanagement/tranningcategorymanagement.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { UseraccountsettingComponent } from './useraccountsetting/useraccountsetting.component';
import { RepresentativelistComponent } from './representativelist/representativelist.component';
import { RepTraingcenterComponent } from './rep-traingcenter/rep-traingcenter.component';
import { FrontendfooterComponent } from './frontendfooter/frontendfooter.component';
import { FrontendheaderComponent } from './frontendheader/frontendheader.component';
import { FrontendhomeComponent } from './frontendhome/frontendhome.component';
import { TrialsComponent } from './trials/trials.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxUploaderModule } from 'ngx-uploader';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CKEditorModule } from 'ngx-ckeditor';
import { TrainingsectionlistComponent } from './trainingsectionlist/trainingsectionlist.component';
import { TrainingsectionComponent } from './trainingsection/trainingsection.component';

import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { AboutPcrTestingComponent } from './about-pcr-testing/about-pcr-testing.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RepdetailsComponent } from './repdetails/repdetails.component';
import { ManageavailabilityComponent } from './manageavailability/manageavailability.component';
import { ReplegaldocumentComponent } from './replegaldocument/replegaldocument.component';
import { LegaldoclistComponent } from './legaldoclist/legaldoclist.component';
import { DigitalcontractComponent } from './digitalcontract/digitalcontract.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { TrainingcenterreoprtComponent } from './trainingcenterreoprt/trainingcenterreoprt.component';
import { EventmanagementComponent } from './eventmanagement/eventmanagement.component';
import { RepeventlistComponent } from './repeventlist/repeventlist.component';
import { TestresolveService } from './testresolve.service';
import { ApiService } from './api.service';
import { ResourcecategoryComponent } from './resourcecategory/resourcecategory.component';
import { ResourcesComponent } from './resources/resources.component';
import { SlotsComponent } from './slots/slots.component';
import { MyresourceComponent } from './myresource/myresource.component';
import { ManagequizComponent } from './managequiz/managequiz.component';
import { TempaccessComponent } from './tempaccess/tempaccess.component';
import { UsersearchPipe } from './search.pipe';
import { TestComponent } from './test/test.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { SlotviewComponent } from './slotview/slotview.component';
import { AppointmentlistComponent } from './appointmentlist/appointmentlist.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { OrderBy } from './orderby';
import { ClipboardModule } from 'ngx-clipboard';
import { AddEditComponent } from './tranningcategorymanagement/add-edit/add-edit.component';
import { AgreementComponent } from './agreement/agreement.component';
import { ManageleadsComponent } from './manageleads/manageleads.component';
import { ProductsComponent } from './products/products.component';
import { TrainingreportsComponent } from './trainingreports/trainingreports.component';
import { NotelistComponent } from './notelist/notelist.component';
import { ManageVideoCategoryComponent } from './manage-video-category/manage-video-category.component';
import { ManageVideosComponent } from './manage-videos/manage-videos.component';
import { AdditionalVideoComponent } from './additional-video/additional-video.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { GoogleCalendarAutomationReportComponent } from './google-calendar-automation-report/google-calendar-automation-report.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
import { ContactManagementDashboardComponent } from './contact-management-dashboard/contact-management-dashboard.component';
import { ContractManagerAddComponent } from './contract-manager-add/contract-manager-add.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractAddEditComponent } from './contract-add-edit/contract-add-edit.component';
import { ContractManagerListComponent } from './contract-manager-list/contract-manager-list.component';
import { MakeContractComponent } from './make-contract/make-contract.component';
import { CrmBelkUploadComponent } from './crm-belk-upload/crm-belk-upload.component';
import { LeadContractComponent } from './lead-contract/lead-contract.component';
// import { DemoMaterialModule } from './material-module';



import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    UsersearchPipe,
    LoginComponent,
    FunnelComponent,
    SignupComponent,
    DashboardComponent,
    ListingComponent,
    AdminmanagementComponent,
    RegionalRecruiterComponent,
    RepComponent,
    RegionalDashboardComponent,
    RepDashboardComponent,
    HomeComponent,
    ContractComponent,
    HeaderComponent,
    FooterComponent,
    FunnellandingpageComponent,
    TranningcategorymanagementComponent,
    AdminheaderComponent,
    UseraccountsettingComponent,
    RepresentativelistComponent,
    RepTraingcenterComponent,
    TrialsComponent,
    TrainingsectionlistComponent,
    FrontendfooterComponent,
    FrontendheaderComponent,
    FrontendhomeComponent,
    TrainingsectionComponent,
    WhoWeAreComponent,
    AboutPcrTestingComponent,
    GetStartedComponent,
    ContactUsComponent,
    RepdetailsComponent,
    ManageavailabilityComponent,
    ReplegaldocumentComponent,
    LegaldoclistComponent,
    DigitalcontractComponent,
    UsermanagementComponent,
    TrainingcenterreoprtComponent,
    EventmanagementComponent,
    RepeventlistComponent,
    ResourcecategoryComponent,
    ResourcesComponent,
    SlotsComponent,
    MyresourceComponent,
    ManagequizComponent,
    TempaccessComponent,
    TestComponent,
    ForgetpasswordComponent,
    SlotviewComponent,
    AppointmentlistComponent,
    ResetpasswordComponent,
    OrderBy,
    AddEditComponent,
    AgreementComponent,
    ManageleadsComponent,
    ProductsComponent,
    TrainingreportsComponent,
    NotelistComponent,
    ManageVideoCategoryComponent,
    ManageVideosComponent,
    AdditionalVideoComponent,
    GoogleCalendarAutomationReportComponent,
    ContactManagementComponent,
    ContactManagementDashboardComponent,
    ContractManagerAddComponent,
    ContractListComponent,
    ContractAddEditComponent,
    ContractManagerListComponent,
    MakeContractComponent,
    CrmBelkUploadComponent,
    LeadContractComponent,
    LoaderComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxUploaderModule,
    CarouselModule.forRoot(),
    CKEditorModule,
    ClipboardModule,
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule,
    // DemoMaterialModule,
  ],
  providers: [
    CookieService,TestresolveService,ApiService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
// export class AppModule { }
export class AppModule {
  constructor(public http: HttpClient, public router: Router) {
  //  this.router.navigateByUrl('/')
  }

}
