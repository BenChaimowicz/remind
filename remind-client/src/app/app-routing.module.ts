import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MylistComponent } from './components/mylist/mylist.component';
import { MyfriendsComponent } from './components/myfriends/myfriends.component';
import { MyscoreComponent } from './components/myscore/myscore.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'mylist', component: MylistComponent, canActivate: [AuthGuard] },
  { path: 'myfriends', component: MyfriendsComponent, canActivate: [AuthGuard] },
  { path: 'myscore', component: MyscoreComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
