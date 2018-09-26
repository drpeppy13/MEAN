import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Pet } from './pet.model';

@Injectable({providedIn: 'root'})
export class PetsService {
  private pets: Pet[] = [];
  private petsUpdated = new Subject<Pet[]>()

  constructor(private http: HttpClient, private router: Router) {}

  getPets() {
    this.http
    .get<{message: string, pets: any }>(
      'http://localhost:8000/pets/'
    )
    .pipe(map((postData) => {
      return postData.pets.map(pet => {
        return {
          name: pet.name,
          id: pet._id,
          type: pet.type,
          description: pet.description,
          skill1: pet.skill1,
          skill2: pet.skill2,
          skill3: pet.skill3
        }
      })
    }))
    .subscribe((transformedPets) => {
      this.pets = transformedPets;
      this.petsUpdated.next([...this.pets]);
    });
  }
  getPetUpdateListener() {
    return this.petsUpdated.asObservable();
  }
  getPet(id: string){
    return this.http.get<{_id: string, name: string, type: string, description: string, skill1: string, skill2: string, skill3: string}>('http://localhost:8000/pets/' + id);
  }
  addPet(name: string, type: string, description: string, skill1: string, skill2: string, skill3: string) {
    const pet: Pet = { id: null, name: name, type: type, description: description, skill1: skill1, skill2: skill2, skill3: skill3 };
    this.http
    .post<{message: string, postId: string }>('http://localhost:8000/pets/', pet)
    .subscribe((responseData) => {
      const id = responseData.postId;
      pet.id = id;
      this.pets.push(pet);
      this.petsUpdated.next([...this.pets]);
      this.router.navigate(['/pets'])
    });
  }
  updatePet(id: string, name: string, type: string, description: string, skill1: string, skill2: string, skill3: string) {
    const pet: Pet = { id: id, name: name, type: type, description: description, skill1: skill1, skill2: skill2, skill3: skill3};
    this.http
    .put('http://localhost:8000/pets/' + id + '/edit/', pet)
    .subscribe(response => {
      const updatedPets = [...this.pets];
      const oldPetIndex = updatedPets.findIndex(p => p.id === pet.id );
      updatedPets[oldPetIndex] = pet;
      this.pets = updatedPets;
      this.petsUpdated.next([...this.pets]);
      this.router.navigate(['/pets']);
    })
  }
  deletePet(postId: string) {
    this.http.delete('http://localhost:8000/pets/' + postId)
    .subscribe(() => {
      const updatedPets = this.pets.filter(pet => pet.id !== postId);
      this.pets = updatedPets;
      this.petsUpdated.next([...this.pets])
      this.router.navigate(['/pets']);
    })
  }
}
