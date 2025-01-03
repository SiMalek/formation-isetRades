import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/public/home/home.component';
import { FormationsComponent as PublicFormationsComponent } from './components/public/formations/formations.component';
import { FormationDetailsComponent } from './components/public/formation-details/formation-details.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CandidatesComponent } from './components/admin/candidates/candidates.component';
import { TrainersComponent } from './components/admin/trainers/trainers.component';
import { FormationsComponent as AdminFormationsComponent } from './components/admin/formations/formations.component';
import { SessionsComponent } from './components/admin/sessions/sessions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'formations/:id', component: FormationDetailsComponent },
  { path: 'admin-space/candidates', component: CandidatesComponent },
  { path: 'admin-space/trainers', component: TrainersComponent },
  { path: 'admin-space/formations', component: FormationsComponent },
  { path: 'admin-space/sessions', component: SessionsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
})
export class AppRoutingModule { }
