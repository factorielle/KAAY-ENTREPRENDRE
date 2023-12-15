import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RessourceService } from 'src/app/service/ressource.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit{

  image:string='';
  titre:string='';
  description:string='';
  lien:string='';
  secteur: string='';

  ressource:any[]=[];
  ressourceChoisi: any;
  tabRessource: any;
  constructor(private route:Router, private ressourceService:RessourceService ){}
  ngOnInit() {
    if (!localStorage.getItem("ressource") ) {
      localStorage.setItem("ressource",JSON.stringify(this.ressource));
    }
    this.tabRessource=JSON.parse(localStorage.getItem("ressource") || "[]");
    
  }

  ajoutRessource(){


    if (this.titre == "" || this.description == ""  || this.lien == ""  || this.secteur == "" ) {
      this.verifChamps("Desole", "Veuillez remplir tous les champs", "error");
    }
    else {
      let ressource = {
        idRessource:this.tabRessource.length+1,
        titre : this.titre,
        lien : this.lien,
        secteur : this.secteur,
        description: this.description,
        createAt: new Date,
        updateAt:''
       
      } 
      this.tabRessource.push(ressource);
      console.log(this.tabRessource);
      localStorage.setItem("ressource", JSON.stringify(this.tabRessource));
      this.verifChamps("Bravo", "Ajout reussi", "success");
      this.viderChamps();
      
    }
    
 }

// methode pour vider les champs
viderChamps() {
  this.titre = "";
  this.description = "";
}

verifChamps(title:any, text:any, icon:any) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon
  })
}



// navigation
  navAcueil() {
    this.route.navigate(['/accueilUser'])
  }
  navAccueilEntrepreneur() {
    this.route.navigate(['/accueilEntrepreneur'])
  }
  navforum() {
    this.route.navigate(['/forum'])
  }
  navEperience() {
    this.route.navigate(['/experience'])
  }
}
