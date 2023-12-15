import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  tabProjet: any;
  projetChoisi: any;
  tabCurrentProjet: any[]=[];
  titre: any;
  image: any;
  description: any;
  
  constructor(private route: ActivatedRoute, private router: Router) {};
  idProjetChoisi = this.route.snapshot.params['id'];

  ngOnInit(){
    this.tabProjet = JSON.parse(localStorage.getItem('projet') || '[]');
    console.log( this.tabProjet);
    this.projetChoisi = this.tabProjet.find((element: any) => element.idProjet == this.idProjetChoisi);
    console.log(this.projetChoisi)
    this.tabCurrentProjet.push(this.projetChoisi) ;
    console.log(this.tabCurrentProjet)
  }

  chargerInfo(){
    this.titre=this.projetChoisi.titre;
    this.image=this.projetChoisi.image;
    this.description=this.projetChoisi.description;
  }

  modifier(){
    this.projetChoisi.titre=this.titre;
    this.projetChoisi.image=this.image;
    this.projetChoisi.description=this.description;
    
    localStorage.setItem("projet", JSON.stringify(this.tabProjet));
      this.verifChamps("Bravo", "Modification reussie", "success");
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
    this.projetChoisi.etat = (this.projetChoisi.etat === 'active') ? 'inactive' : 'active';
    localStorage.setItem('projet', JSON.stringify(this.tabProjet));
    // Vous pouvez ajouter ici la logique pour mettre à jour l'état du professeur dans votre base de données ou tout autre traitement nécessaire
  }


}
