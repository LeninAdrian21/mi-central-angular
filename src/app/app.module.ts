import { DialogcomponentComponent } from './dialogcomponent/dialogcomponent.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/pages/home/home.component';
import { FilterComponent } from './filter/filter.component';
import { ExportComponent } from './export/export.component';

@NgModule({
  declarations: [
    ExportComponent,
    AppComponent,
    NavComponent,
    DialogcomponentComponent,
    FilterComponent,
    // PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    GraphQLModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    ToastrModule.forRoot(),
    RecaptchaV3Module,
    NgbModule,
    CoreModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.useValue
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
