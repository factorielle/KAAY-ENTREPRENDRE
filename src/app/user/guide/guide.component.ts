import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/service/guide.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  constructor(private guideService: GuideService) { }

  bdGuides: any;
  bdEvent: any;

  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  ngOnInit() {
    this.bdGuides = JSON.parse(localStorage.getItem("Guides") || "[]");
    console.log(this.bdGuides);
    this.bdEvent = JSON.parse(localStorage.getItem("Evenement") || "[]");
    console.log(this.bdEvent);
  }
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.bdGuides.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.bdGuides.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.bdGuides.length / this.userParPage);
  }

}
