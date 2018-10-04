import { Component, OnInit, OnDestroy } from '@angular/core';

import { Pet } from '../pet.model';
import { PetsService } from '../pets.service';
import { ActivatedRoute , ParamMap} from '@angular/router';

@Component({
  selector: 'app-pet-index',
  templateUrl: './pet-index.component.html',
  styleUrls: ['./pet-index.component.css']
})
export class PetIndexComponent implements OnInit {
  pet: Pet;
  private petId: string;


  constructor(public petsService: PetsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.petId = paramMap.get('petId')
      this.petsService.getPet(this.petId).subscribe(postData => {
        this.pet = { id: postData._id, name: postData.name, type: postData.type, description: postData.description, skill1: postData.skill1, skill2: postData.skill2, skill3: postData.skill3}
      })
    })
  }
  // onLike() {
  //   this.pet.likes += 1;
  //   this.petsService.updatePet(this.petId, this.pet.name, this.pet.type, this.pet.description, this.pet.skill1, this.pet.skill2, this.pet.skill3, this.pet.likes)
  // }

  onDelete(postId: string) {
    this.petsService.deletePet(postId);
  }
}
