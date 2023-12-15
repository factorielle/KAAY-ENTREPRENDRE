import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Projet } from 'src/app/model/projet';
import { ProjetService } from 'src/app/service/projet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil-entrepreneur',
  templateUrl: './accueil-entrepreneur.component.html',
  styleUrls: ['./accueil-entrepreneur.component.css']
})
export class AccueilEntrepreneurComponent implements OnInit{
  // declaration des variables de recuperation des valeurs saisies
  titre:string='';
  image:string='';
  description:string='';
  searchResult: any[] = [];
  userConnect:any;
  pageActuelle: number = 1;
  articlesParPage: number = 3;
  tabExperience:any;
  
  projets:Projet[]=[];
  tabProjet: any;
  titreProjet: any;
  constructor(private route:Router, private projetService:ProjetService){}

  ngOnInit(){
    this.tabExperience=JSON.parse(localStorage.getItem('experience') || '');
    console.log('tab experience', this.tabExperience)
    if (!localStorage.getItem("projet") ) {
      localStorage.setItem("projet",JSON.stringify(this.projets));
    }
    this.tabProjet=JSON.parse(localStorage.getItem("projet") || "[]");
    
    
  }
  afficherProjet(){
    this.projetService.getProjet().subscribe((reponse:any)=>{
      this.projets=reponse;
      console.log(this.projets)
    })
  
  }
 ajoutProjet(){


    if (this.titre == "" || this.image == "" || this. description == "" ) {
      this.verifChamps("Desole", "Veuillez remplir tous les champs", "error");
    }
    else {
      let projet = {
        idProjet:this.tabProjet.length+1,
        titre : this.titre,
        image: this.image,
        description: this.description,
        createAt: new Date,
        updateAt:''
       
      } 
      this.tabProjet.push(projet);
      console.log(this.tabProjet);
      localStorage.setItem("projet", JSON.stringify(this.tabProjet));
      this.verifChamps("Bravo", "Ajout reussi", "success");
      this.viderChamps();
      this.route.navigate(["accueilEntrepreneur"]);
    }
    
 }

// methode pour vider les champs
viderChamps() {
  this.titre = "";
  this.image = "";
  this.description = "";
}


  


  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.searchResult.reverse().slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.searchResult.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.searchResult.length / this.articlesParPage);
  }

  verifChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }

  deconnexion() {
    this.route.navigate(['login']);
    localStorage.removeItem('userOnline');
  }
  
  onSearch(){
    this.searchResult = this.tabProjet.filter(
      (elt:any) => (elt?.titre.includes(this.titreProjet)));
      console.log(this.searchResult);
  
  }
  
}
