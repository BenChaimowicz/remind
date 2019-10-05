// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Custom Components
import { NavigationComponent } from './components/navigation/navigation.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { MyfriendsComponent } from './components/myfriends/myfriends.component';
import { MyscoreComponent } from './components/myscore/myscore.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MylistComponent,
    MyfriendsComponent,
    MyscoreComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
