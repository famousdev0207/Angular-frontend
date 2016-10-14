import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './components/app.component';
import { HeaderComponent }   from './components/header.component';
import { MenuComponent }   from './components/menu.component';
import { LoginComponent }   from './components/login/login.component';
import { FooterComponent }   from './components/footer.component';
import { HomeComponent }   from './components/home/home.component';
import { routing, appRoutingProviders }  from './app.routing';

// used to create fake backend
import { fakeBackendProvider } from './helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


import { AlertComponent } from './directives/index';
import { AuthGuard } from './guards/index';
import { AlertService, AuthenticationService, UserService, SessionService } from './services/index';

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule ,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        AlertComponent,
        HomeComponent
    ],
    providers: 	  [
        appRoutingProviders,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        SessionService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap:    [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent
    ]
})
export class AppModule { }
