import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetIndexComponent } from './pets/pet-index/pet-index.component';
import { PetCreateComponent } from './pets/pet-create/pet-create.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full'},
  { path: 'pets', component: PetListComponent},
  { path: 'pets/new', component: PetCreateComponent},
  { path: 'pets/:petId/edit', component: PetCreateComponent},
  { path: 'pets/:petId', component: PetIndexComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
