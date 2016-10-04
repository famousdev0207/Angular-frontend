import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from '../components/app.component';
import { HeaderComponent }   from '../components/header.component';
import { MenuComponent }   from '../components/menu.component';
import { LoginComponent }   from '../components/login.component';
import { FooterComponent }   from '../components/footer.component';
import { routing, appRoutingProviders }  from '../app.routing';

@NgModule({
    imports:      [ BrowserModule, FormsModule , routing ],
    declarations: [ AppComponent, LoginComponent, HeaderComponent, MenuComponent, FooterComponent ],
    providers: 	  [ appRoutingProviders ],
    bootstrap:    [ AppComponent, HeaderComponent, MenuComponent, FooterComponent ]
})
export class AppModule { }