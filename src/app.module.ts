import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CaesarComponent } from './caesar/caesar.component';
import { BcryptComponent } from './bcrypt/bcrypt.component';
import { SSLComponent } from './ssl/ssl.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CaesarComponent,
    BcryptComponent,
    SSLComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }