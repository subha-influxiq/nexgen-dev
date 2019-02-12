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


import { TrialsComponent } from './trials/trials.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
  declarations: [
    AppComponent,
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
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxUploaderModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
