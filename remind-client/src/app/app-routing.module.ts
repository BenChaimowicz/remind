import { MyscoreComponent } from './components/myscore/myscore.component';
import { MyfriendsComponent } from './components/myfriends/myfriends.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'mylist', component: MylistComponent },
  { path: 'myfriends', component: MyfriendsComponent },
  { path: 'myscore', component: MyscoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
