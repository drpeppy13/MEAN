import { Component , OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {
  enteredPet = '';
  pet: Pet;
  private mode = 'create';
  private petId: string;

  constructor(public petsService: PetsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('petId')) {
        this.mode = 'edit';
        this.petId = paramMap.get('petId')
        this.petsService.getPet(this.petId).subscribe(postData => {
          this.pet = { id: postData._id, name: postData.name, type: postData.type, description: postData.description, skill1: postData.skill1, skill2: postData.skill2, skill3: postData.skill3}
        });
      } else {
        this.mode = 'create';
        this.petId = null;
      }
    });
  }
  onSavePet(form: NgForm ) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.petsService.addPet(form.value.name, form.value.type, form.value.description, form.value.skill1, form.value.skill2, form.value.skill3)
    } else {
      this.petsService.updatePet(this.petId, form.value.name, form.value.type, form.value.description, form.value.skill1, form.value.skill2, form.value.skill3)
    }

    form.resetForm();
  }
}
