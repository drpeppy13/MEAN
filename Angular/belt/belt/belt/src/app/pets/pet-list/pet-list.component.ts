import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Pet } from '../pet.model';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  private petsSub: Subscription;

  constructor(public petsService: PetsService) {}

  ngOnInit() {
    this.petsService.getPets();
    this.petsSub = this.petsService.getPetUpdateListener()
    .subscribe((pets: Pet[]) => {
      this.pets = pets;
    })
  }

  onDelete(postId: string) {
    this.petsService.deletePet(postId);
  }

  ngOnDestroy() {
    this.petsSub.unsubscribe();
  }
}
