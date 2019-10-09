// Core Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngxToastr
import { ToastrModule } from 'ngx-toastr';

// ngBootstrap
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

// FontAwesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { MyfriendsComponent } from './components/myfriends/myfriends.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { MyscoreComponent } from './components/myscore/myscore.component';
import { RegistrationComponent } from './components/registration/registration.component';

// Adapters
import { NgbMomentjsAdapter } from './adapters/ngb-moment.adapter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    MyfriendsComponent,
    MylistComponent,
    MyscoreComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbMomentjsAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public library: FaIconLibrary) {
    library.addIcons(faCalendarAlt);
  }
}
