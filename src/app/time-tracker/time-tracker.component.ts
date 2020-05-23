import { Component, OnInit } from '@angular/core';
import {Categorie, Tache} from '../model/tache';
import {LocalStorageService} from '../local-storage.service';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

  taches: Tache[];
  idTache: number;
  compteur: number[];
  dateActive: Date[];
  subsTemps: Subscription[] =[];
  categories: Categorie[];
  idCategorie: number;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.taches = this.localStorageService.recupererTaches();
    this.idTache = this.taches.length;
    this.compteur = [];
    this.dateActive = [];
    this.taches.forEach(element => {
      this.subsTemps.push(new Subscription());
    } );
    //Categorie
    this.categories = this.localStorageService.recupererCategories();
    this.idCategorie = this.categories.length;
    let nouvelleCategorie = {
      id: 0,
      titre: 'Sans Categorie',
      taches: [],
      temps: 0
    };
    if (this.categories.length === 0) {
      this.categories.push(nouvelleCategorie);
      this.localStorageService.stockerCategorie(nouvelleCategorie);
    }
  }

  ajouterTache(titreTache, selectedCategory) {
    let nouvelleTache = {
      id : this.idTache,
      titre : titreTache.value,
      categorie: selectedCategory,
      estDemaree: false,
      temps: 0,
      dates: []
    }
    this.categories.forEach(element => {
      if (element.titre === selectedCategory) {
        element.taches.push(nouvelleTache);
      }
    } );
    this.taches.push(nouvelleTache);
    this.localStorageService.stockerTache(nouvelleTache);
    titreTache = '';
    this.idTache++;

  }

  ajouterCategorie(titreCategorie) {
    let nouvelleCategorie = {
      id : this.idCategorie,
      titre : titreCategorie.value,
      taches: [],
      temps: 0
    }
    this.categories.push(nouvelleCategorie);
    this.localStorageService.stockerCategorie(nouvelleCategorie);
    titreCategorie = '';
    this.idCategorie++;

  }

  demarrerTache(tache) {
    tache.estDemaree = !tache.estDemaree;
    let indice = this.taches.indexOf(tache);
    if (tache.estDemaree) {
      this.subsTemps[indice] = interval(1000).subscribe((valeur: number) => {this.compteur[indice] = valeur});
      this.dateActive[indice] = new Date();
    } else {
      tache.temps = tache.temps + this.compteur[indice];
      this.compteur[indice] = 0;
      this.subsTemps[indice].unsubscribe();
      tache.dates.push([this.dateActive[indice], new Date()]);
      this.dateActive[indice] = null;
    }
  }
  tempsDynamique(tache, i) {
     return (this.compteur[i]) ? tache.temps + this.compteur[i] : tache.temps;
  }
}
