/**
 * Created by INFLUXIQ-05 on 31-10-2018.
 */


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {FunnelComponent} from "./funnel/funnel.component";

const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'funnel', component: FunnelComponent},
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
