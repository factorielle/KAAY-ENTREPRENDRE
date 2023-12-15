import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-ressource',
  templateUrl: './detail-ressource.component.html',
  styleUrls: ['./detail-ressource.component.css']
})
export class DetailRessourceComponent implements OnInit{

  tabRessource: any;
  ressourceChoisi: any;
  tabCurrentRessource: any[]=[];
  titre: any;
  image: any;
  url: any;
  description: any;
  secteur: any;
  
  constructor(private route: ActivatedRoute, private router: Router) {};
  idRessourceChoisi = this.route.snapshot.params['id'];
  ngOnInit() {
    this.tabRessource = JSON.parse(localStorage.getItem('experience') || '[]');
    console.log( this.tabRessource);
    this.ressourceChoisi = this.tabRessource.find((element: any) => element.idRessource == this.idRessourceChoisi);
    console.log(this.ressourceChoisi)
    this.tabCurrentRessource.push(this.ressourceChoisi) ;
    console.log(this.tabCurrentRessource)
  }

  chargerInfo(){
    this.titre=this.ressourceChoisi.titre;
    this.url=this.ressourceChoisi.url;
    this.secteur=this.ressourceChoisi.secteur;
    this.image=this.ressourceChoisi.image;
    this.description=this.ressourceChoisi.description;
  }

  modifier(){
    this.ressourceChoisi.titre=this.titre;
    this.ressourceChoisi.image=this.image;
    this.ressourceChoisi.url=this.url;
    this.ressourceChoisi.secteur=this.secteur;
    this.ressourceChoisi.description=this.description;
    
    localStorage.setItem("experience", JSON.stringify(this.tabRessource));
      this.verifChamps("Bravo", "Modification reussi", "success");
      this.viderChamps();
  }

  viderChamps() {
    this.titre = "";
    this.image = "";
    this.description = "";
  }

  verifChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }
  
  toggleEtat() {
    this.ressourceChoisi.etat = (this.ressourceChoisi.etat === 'active') ? 'inactive' : 'active';
    localStorage.setItem('experience', JSON.stringify(this.tabRessource));
    // Vous pouvez ajouter ici la logique pour mettre à jour l'état du professeur dans votre base de données ou tout autre traitement nécessaire
  }

}
