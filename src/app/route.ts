/**
 * Created by INFLUXIQ-05 on 31-10-2018.
 */


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { FunnelComponent } from "./funnel/funnel.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminmanagementComponent } from "./adminmanagement/adminmanagement.component";
import { RegionalRecruiterComponent } from "./regional-recruiter/regional-recruiter.component";
import { RepComponent } from "./rep/rep.component";
import { RegionalDashboardComponent } from "./regional-dashboard/regional-dashboard.component";
import { RepDashboardComponent } from "./rep-dashboard/rep-dashboard.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { ContractComponent } from "./contract/contract.component";
import { TranningcategorymanagementComponent } from "./tranningcategorymanagement/tranningcategorymanagement.component";
import { UseraccountsettingComponent } from "./useraccountsetting/useraccountsetting.component";
import { RepresentativelistComponent } from "./representativelist/representativelist.component";
import { RepTraingcenterComponent } from "./rep-traingcenter/rep-traingcenter.component";
import { TrialsComponent } from "./trials/trials.component";
import { TrainingsectionComponent } from "./trainingsection/trainingsection.component";
import { TrainingsectionlistComponent } from "./trainingsectionlist/trainingsectionlist.component";
import { FrontendheaderComponent } from "./frontendheader/frontendheader.component";
import { FrontendfooterComponent } from "./frontendfooter/frontendfooter.component";
import { FrontendhomeComponent } from "./frontendhome/frontendhome.component";

import { WhoWeAreComponent } from "./who-we-are/who-we-are.component";
import { AboutPcrTestingComponent } from "./about-pcr-testing/about-pcr-testing.component";
import { GetStartedComponent } from "./get-started/get-started.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { RepdetailsComponent } from "./repdetails/repdetails.component";
import { ReplegaldocumentComponent } from "./replegaldocument/replegaldocument.component";
import { LegaldoclistComponent } from "./legaldoclist/legaldoclist.component";
import { DigitalcontractComponent } from "./digitalcontract/digitalcontract.component";
import { UsermanagementComponent } from "./usermanagement/usermanagement.component";
import { TrainingcenterreoprtComponent } from "./trainingcenterreoprt/trainingcenterreoprt.component";
import { EventmanagementComponent } from "./eventmanagement/eventmanagement.component";
import { RepeventlistComponent } from "./repeventlist/repeventlist.component";
import { ResourcecategoryComponent } from "./resourcecategory/resourcecategory.component";
import { ResourcesComponent } from "./resources/resources.component";
import { MyresourceComponent } from "./myresource/myresource.component";
import { ManagequizComponent } from "./managequiz/managequiz.component";
import { TestresolveService } from './testresolve.service';
import { TempaccessComponent } from "./tempaccess/tempaccess.component";
import { TestComponent } from "./test/test.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { SlotviewComponent } from "./slotview/slotview.component";
import { AppointmentlistComponent } from "./appointmentlist/appointmentlist.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";

/* 11th July 2019 */
import { AddEditComponent } from "./tranningcategorymanagement/add-edit/add-edit.component";

import { AgreementComponent } from "./agreement/agreement.component";
/* added by Chandrani */
import { ManageleadsComponent } from "./manageleads/manageleads.component";
import { ProductsComponent } from "./products/products.component";
import { TrainingreportsComponent } from "./trainingreports/trainingreports.component";
import {ManageVideoCategoryComponent} from "./manage-video-category/manage-video-category.component";
import {ManageVideosComponent} from "./manage-videos/manage-videos.component";
import { AdditionalVideoComponent } from './additional-video/additional-video.component';
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
import { BulkLeadListComponent } from './bulk-lead-list/bulk-lead-list.component';
import { CrmLeadListsComponent } from './crm-lead-lists/crm-lead-lists.component';
import { CrmLeadDetailsComponent } from './crm-lead-details/crm-lead-details.component';

const appRoutes: Routes = [
    { path: '', redirectTo:'/login', pathMatch: 'full' },
    {path: 'bulk-upload', component: CrmBelkUploadComponent},
    {path: 'lead-contract/:_id', component: LeadContractComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'send_to_lead', condition: {"_id":"_id"}}, endpoint: 'datalist_for_lead'}},
    {path: 'lead-list/:_id', component: BulkLeadListComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'csv_upload_view', condition: {"id_object":"id_object", "skip":0}}, endpoint: 'leadlist'}},
    {path: 'add-contract', component: ContractAddEditComponent},
    {path: 'edit-contract/:id', component: ContractAddEditComponent},
     {path: 'add-contract-manager', component: ContractManagerAddComponent},            // new added
     {path: 'edit-contract-manager/:id', component: ContractManagerAddComponent},            // new added

     {path: 'contract-list', component: ContractListComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'contractDetails_view', condition: {}}, endpoint: 'datalist'}},
     
     {path: 'contract-manager-list', component: ContractManagerListComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'contract_manager_list', condition: {}}, endpoint: 'datalist'}},

     {path: 'contract-manager-list-rep', component: ContractManagerListComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'contract_manager_list', condition: {"rep_id_object":"rep_id_object"}}, endpoint: 'datalist'}},

     {path: 'contract-manager-list-pending', component: ContractManagerListComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'contract_manager_list', condition: {"status":"request"}}, endpoint: 'datalist'}},

     {path: 'make-contract/:_id', component: MakeContractComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'test_contract', condition: {"_id":'_id'}}, endpoint: 'datalist'}},
     {path: 'make-contract-edit/:_id', component: MakeContractComponent, resolve : {results: TestresolveService},data: { requestcondition: { source: 'contract_repote_view', condition: {"_id":'_id'}}, endpoint: 'datalist'}},
    //  contract_repote_view_product
    { path: 'login', component:  LoginComponent},
    { path: 'login/:type', component:  LoginComponent},
    { path: 'funnel', component: FunnelComponent},
    { path: 'dashboard', component: DashboardComponent,resolve : {results: TestresolveService},data: { requestcondition: { source: '', condition: {}}, endpoint: 'traning-repote'}},
//    { path: 'dashboard', component: DashboardComponent},
    { path: 'admin', component: AdminmanagementComponent},
    { path: 'regional', component: RegionalRecruiterComponent},
    { path: 'rep', component: RepComponent},
    { path: 'contract/dashboard', component: ContactManagementDashboardComponent},            // new added
    { path: 'contract/management', component: ContactManagementComponent},
    { path: 'regionaldashboard', component: RegionalDashboardComponent},
    { path: 'repdashboard', component: RepDashboardComponent},
    { path: 'signup/:id', component: SignupComponent},
    { path: 'contract', component: ContractComponent},
    {path: 'tranningcategory', component: TranningcategorymanagementComponent},
    {path: 'addtrainings', component: TranningcategorymanagementComponent},
    { path:'useraccountsetting', component: UseraccountsettingComponent},
    { path:'useraccountsetting/:id', component: UseraccountsettingComponent},
    { path: 'representativelist', component: RepresentativelistComponent},
    { path: 'reptrainingcenter', component: RepTraingcenterComponent},
    // { path: 'reptrainingcenter/:cid', component: RepTraingcenterComponent}, // cat id
    { path: 'reptrainingcenter/:cid', component: RepTraingcenterComponent,resolve : {results: TestresolveService},data: { requestcondition: { trainingcategory:{}, userid:{} }, endpoint:'training_category_foruser'}},
    { path: 'reptrainingcenter/:cid/:lid', component: RepTraingcenterComponent}, // lesson id
    { path:'trial', component: TrialsComponent},
    { path:'trainingsectionlist', component: TrainingsectionlistComponent},
    { path:'trainingsection', component: TrainingsectionComponent},
    { path:'trainingsection/:id', component: TrainingsectionComponent},
    { path:'frontendheader', component: FrontendheaderComponent},
    { path:'frontendfooter', component: FrontendfooterComponent},
    { path:'', component: FrontendhomeComponent},
    { path:'who_we_are', component: WhoWeAreComponent},
    { path:'about_pcr_testing', component: AboutPcrTestingComponent},
    { path:'get_started', component: GetStartedComponent},
    { path:'contact_us', component: ContactUsComponent},
    { path:'repdetails/:id', component: RepdetailsComponent},
    { path:'replegaldocuments', component: ReplegaldocumentComponent},
    { path:'legaldoclist', component: LegaldoclistComponent},
    { path:'digitalcontract', component: DigitalcontractComponent},
    { path:'usermanagement', component: UsermanagementComponent},
    { path:'rep-management', component: UsermanagementComponent},
    { path:'trainingreport', component: TrainingcenterreoprtComponent},
    { path:'event', component: EventmanagementComponent},
    // { path:'event/:at/:val/:rt', component: EventmanagementComponent},
    { path:'event/:at/:rt', component: EventmanagementComponent},
    { path:'calendar', component: EventmanagementComponent},
    { path:'calendar/:at/:val/:rt', component: EventmanagementComponent},
    { path:'repevent/:id', component: RepeventlistComponent},
    { path:'resourcecategory', component: ResourcecategoryComponent},
    { path:'resources', component: ResourcesComponent},
    { path:'myresource', component: MyresourceComponent},
    { path:'myresource/:catid', component: MyresourceComponent},
    { path:'managequiz/:lessonid', component: ManagequizComponent},
    { path: 'tempaccess', component: TempaccessComponent},
    { path: 'on-boarding-call-booked/:userId/:googleEventId', component: TempaccessComponent},
    { path: 'test', component: TestComponent},
    { path: 'forgetpassword', component: ForgetpasswordComponent},
    { path: 'slotview', component: SlotviewComponent},

    { path: 'on-boarding-call/:id', component: SlotviewComponent },
    { path: 'customevents/:slotval', component: SlotviewComponent },
    { path: 'customevent', component: SlotviewComponent }, 
    { path: 'customevent/:slot', component: SlotviewComponent }, 
    { path: 'discovery-call/:id', component: SlotviewComponent },
    { path: 'book-a-closer/:id', component: SlotviewComponent },
    { path: 'book-a-closer/:leadid/:pid', component: SlotviewComponent },
    { path: 'book-a-closer', component: SlotviewComponent },
    { path: 'question-and-answer-call/:id', component: SlotviewComponent },

    { path: 'slotview/:id', component: SlotviewComponent },
    { path: 'appointmentlist', component: AppointmentlistComponent },
    { path: 'appointmentlist/:leadid', component: AppointmentlistComponent },
    { path: 'appointments/:leadid', component: AppointmentlistComponent },
    { path: 'resetpassword/:id', component: ResetpasswordComponent },

    /* changes 11th July 2019 */
    { path: 'category-management/add-new', component: AddEditComponent },
    { path: 'category-management/edit/:id', component: AddEditComponent },
    { path: 'agreement', component: AgreementComponent },
    { path: 'agreement/:userId', component: AgreementComponent },

    /* added by Chandrani */
    { path: 'manage-leads', component: ManageleadsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'training-reports', component: TrainingreportsComponent },
    { path: 'manage-video-category', component: ManageVideoCategoryComponent },
    { path: 'manage-video', component: ManageVideosComponent },
    { path: 'additional-video/:categoryid', component: AdditionalVideoComponent },
    {path: 'call', component: GoogleCalendarAutomationReportComponent},
    {path: 'crm-lead-details', component: CrmLeadDetailsComponent},
    {path: 'crm-lead-list', component: CrmLeadListsComponent},
   


];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });

