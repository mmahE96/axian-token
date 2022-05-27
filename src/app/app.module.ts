import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { FaucetComponent } from './faucet/faucet.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { TransferTokensComponent } from './transfer-tokens/transfer-tokens.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FaucetComponent,
    AccountInfoComponent,
    TransferTokensComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
