export class Tache {
  id: number;
  titre: string;
  categorie: string;
  estDemaree: boolean;
  temps: number;
  dates: CoupleDate[];
}

export class Categorie {
  id: number;
  titre: string;
  taches: Tache[];
  temps: number;
}

export type  CoupleDate = [Date, Date];

