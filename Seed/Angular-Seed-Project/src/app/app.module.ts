import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './shared';
import { ToastrModule } from 'ngx-toastr';
import { CustomToastComponent } from './main/custom-toast/custom-toast.component';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './main/layout/tool-bar/tool-bar.component';
import { SideNavComponent } from './main/layout/side-nav/side-nav.component';
import { AppLauncherComponent } from './main/layout/app-launcher/app-launcher.component';
import { MessageService } from './main/services/message.service';
import { ConfirmPopupComponent } from './main/confirm-popup/confirm-popup.component';

@NgModule({
  declarations: [AppComponent, ToolBarComponent, SideNavComponent,
    CustomToastComponent, AppLauncherComponent, ConfirmPopupComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, MaterialModule,
    AppRoutingRoutingModule, CoreModule, TranslateModule,
    ToastrModule.forRoot({
      toastComponent: CustomToastComponent,
    })
  ],
  bootstrap: [AppComponent],
  entryComponents: [CustomToastComponent, ConfirmPopupComponent],
  providers: [MessageService]
})
export class AppModule { }
