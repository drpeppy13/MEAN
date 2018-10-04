import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PetCreateComponent } from './pets/pet-create/pet-create.component';
import { PetIndexComponent } from './pets/pet-index/pet-index.component';
import { PetListComponent } from './pets/pet-list/pet-list.component'
import { PetsService } from './pets/pets.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PetCreateComponent,
    PetIndexComponent,
    PetListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [PetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
