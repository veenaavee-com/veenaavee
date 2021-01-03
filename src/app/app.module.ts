import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { HTTPAuthInterceptor } from './service/http.auth.interceptor';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ViewSongComponent } from './songs/view-song/view-song.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ViewSongComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HTTPAuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
