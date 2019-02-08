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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FunnelComponent,
    SignupComponent,
    DashboardComponent,
    ListingComponent,
    AdminmanagementComponent,
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
    ModalModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
