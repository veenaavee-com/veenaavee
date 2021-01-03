import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ViewSongComponent } from './songs/view-song/view-song.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'index', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ComponentsComponent },
    { path: 'songs/view/:id', component: ViewSongComponent },
    /*{ path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'examples/landing', component: LandingComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent }*/
    { path: '**', redirectTo: 'home', pathMatch: 'full' } // TODO: add error handling component
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
