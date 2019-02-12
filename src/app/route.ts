/**
 * Created by INFLUXIQ-05 on 31-10-2018.
 */


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {FunnelComponent} from "./funnel/funnel.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AdminmanagementComponent} from "./adminmanagement/adminmanagement.component";
import {RegionalRecruiterComponent} from "./regional-recruiter/regional-recruiter.component";
import {RepComponent} from "./rep/rep.component";
import {RegionalDashboardComponent} from "./regional-dashboard/regional-dashboard.component";
import {RepDashboardComponent} from "./rep-dashboard/rep-dashboard.component";
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {ContractComponent} from "./contract/contract.component";
import {TranningcategorymanagementComponent} from "./tranningcategorymanagement/tranningcategorymanagement.component";
import {UseraccountsettingComponent} from "./useraccountsetting/useraccountsetting.component";

import {RepresentativelistComponent} from "./representativelist/representativelist.component";
import {RepTraingcenterComponent} from "./rep-traingcenter/rep-traingcenter.component";

import {TrialsComponent} from "./trials/trials.component";




const appRoutes: Routes = [
 //{ path: '', redirectTo:'/login', pathMatch: 'full' },
    { path: 'login', component:  LoginComponent},
    { path: 'funnel', component: FunnelComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'admin', component: AdminmanagementComponent},
    { path: 'regional', component: RegionalRecruiterComponent},
    { path: 'rep', component: RepComponent},
    { path: 'regionaldashboard', component: RegionalDashboardComponent},
    { path: 'repdashboard', component: RepDashboardComponent},
    { path: 'signup/:id', component: SignupComponent},
    { path: '', component: HomeComponent},
    { path: 'contract', component: ContractComponent},
    {path: 'regionaldashboard', component: RegionalRecruiterComponent},
    {path: 'tranningcategory', component: TranningcategorymanagementComponent},
    { path:'useraccountsetting', component: UseraccountsettingComponent},
    { path: 'representativelist', component: RepresentativelistComponent},
    { path: 'reptrainingcenter', component: RepTraingcenterComponent},
    { path:'trial', component: TrialsComponent}


];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: false });

