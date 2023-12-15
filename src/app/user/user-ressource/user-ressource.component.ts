import { Component } from '@angular/core';
import { RessourceService } from 'src/app/service/ressource.service';

@Component({
  selector: 'app-user-ressource',
  templateUrl: './user-ressource.component.html',
  styleUrls: ['./user-ressource.component.css']
})
export class UserRessourceComponent {
  constructor(private ressourceService: RessourceService) { }
  bdRessource: any;

  ngOnInit() {
    this.bdRessource = JSON.parse(localStorage.getItem("experience") || "[]");
    console.log(this.bdRessource);
  }

  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.bdRessource.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.bdRessource.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.bdRessource.length / this.userParPage);
  }
}
