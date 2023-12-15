import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etude-cas',
  templateUrl: './etude-cas.component.html',
  styleUrls: ['./etude-cas.component.css']
})
export class EtudeCasComponent implements OnInit {
  bdProjet: any;
ngOnInit(): void {
  this.bdProjet = JSON.parse(localStorage.getItem("projet") || "[]");
  console.log(this.bdProjet);
}
  
  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.bdProjet.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.bdProjet.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.bdProjet.length / this.userParPage);
  }
}
