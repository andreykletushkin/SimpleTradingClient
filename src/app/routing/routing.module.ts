import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LogonComponent} from '../logon/logon.component';
import {ProfileComponent} from '../profile/profile.component';
import {QuatesComponent} from '../quates/quates.component';
import {ProfileDetailsComponent} from '../profile-details/profile-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{path: '', component: LogonComponent},
        {
          path: 'profile/:id', component: ProfileComponent,
          children: [{path: '', component: ProfileDetailsComponent}]
        },
        {
          path: 'quotes/:id', component: ProfileComponent,
          children: [{path: '', component: QuatesComponent}]
        }
      ],
    ),
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {
}
