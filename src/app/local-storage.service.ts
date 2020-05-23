import {Injectable, OnInit} from '@angular/core';
import {Categorie, Tache} from './model/tache';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  taches: object[] = [];
  categories: object[] = [];


  recupererTaches() {
    try {
       if (localStorage.taches != null) {
         return JSON.parse(localStorage.taches);
       } else {
         return [];
       }
    } catch (error) {
      console.error('Impossible de persister dans localStorage', error);
    }
  }

  stockerTache(tache: Tache) {
    try {
      this.taches = this.recupererTaches();
      this.taches.push(tache);
      localStorage.taches = JSON.stringify(this.taches);
    } catch (error) {
      console.error('Impossible de persister dans localStorage', error);
    }

  }
  majTache(tache, indice) {
    this.taches[indice] = tache;
  }

  recupererCategories() {
    try {
      if (localStorage.categories != null) {
        return JSON.parse(localStorage.categories);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Impossible de persister dans localStorage', error);
    }
  }
  stockerCategorie(categorie: Categorie) {
    try {
      this.categories = this.recupererCategories();
      this.categories.push(categorie);
      localStorage.categories = JSON.stringify(this.categories);
    } catch (error) {
      console.error('Impossible de persister dans localStorage', error);
    }

  }
}
