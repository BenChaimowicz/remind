import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MylistComponent } from './components/mylist/mylist.component';
import { MyfriendsComponent } from './components/myfriends/myfriends.component';
import { MyscoreComponent } from './components/myscore/myscore.component';
import { RegistrationComponent } from './components/registration/registration.component';


const routes: Routes = [
  { path: 'mylist', component: MylistComponent },
  { path: 'myfriends', component: MyfriendsComponent },
  { path: 'myscore', component: MyscoreComponent },
  { path: 'register', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
