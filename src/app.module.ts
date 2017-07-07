import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CaesarComponent } from './caesar/caesar.component';
import { BcryptComponent } from './bcrypt/bcrypt.component';
import { SimpleSSLComponent } from './ssl/simple-ssl.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    CaesarComponent,
    BcryptComponent,
    SimpleSSLComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }