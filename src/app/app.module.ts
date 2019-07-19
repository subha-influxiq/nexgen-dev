import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
    AddEditComponent

  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [CookieService,TestresolveService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
