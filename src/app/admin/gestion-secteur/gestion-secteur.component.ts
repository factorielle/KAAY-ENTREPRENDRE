import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Secteur } from 'src/app/model/evenement';
import { SecteurService } from 'src/app/service/secteur.service';

@Component({
  selector: 'app-gestion-secteur',
  templateUrl: './gestion-secteur.component.html',
  styleUrls: ['./gestion-secteur.component.css']
})
export class GestionSecteurComponent implements OnInit {

  nomSecteur: string = '';
  nomSecteurModif:string="";

  SecteurChoisi: any;
  showMessage: any;
  secteur: Secteur[]= [];
  
  tabSecteur: any;

  constructor(private route:Router, private SecteurService:SecteurService ){}
  ngOnInit() {
    if (localStorage.getItem('Secteur') == null || localStorage.getItem('Secteur') == undefined) {
      localStorage.setItem('Secteur',JSON.stringify(this.secteur));
    }

    this.tabSecteur = JSON.parse(localStorage.getItem('Secteur') || '[]');
    console.warn(this.tabSecteur);
  
  }

  afficherSecteur(){
    this.SecteurService.getSecteur().subscribe((reponse:any)=>{
      if (reponse.token){
        this.showMessage("success","Felicitations" ," Secteur crée avec success");
      }
    console.log(this.secteur)
  })
  }

  // ajouter Secteur
  ajouterSecteur() {
    if (this.nomSecteur == '') {
      this.showMessage("error", "Oops", " veuillez remplire le champ ");
    } else { 
      let secteur = {
        id: this.tabSecteur.length +1,
        secteur:this.nomSecteur,
      }
      this.tabSecteur.push(secteur);
      localStorage.setItem("Secteur", JSON.stringify(this.tabSecteur));
      this.showMessage("success", "Felicitations", " Secteur crée avec success");
      this.nomSecteur='';

    }
  }

  currentSecteur: any;
  // methode pour charger info
  chargerInfo(parameval: any) {
    this.currentSecteur = parameval;
    this.nomSecteurModif = parameval.secteur;
  }

  // methode pour modifier
  modifierSecteur() {
    this.currentSecteur.secteur = this.nomSecteurModif;

    localStorage.setItem('Secteur', JSON.stringify(this.tabSecteur));
    this.showMessage('Felicitations..', 'Secteur modifié  avec succes', 'success')
  }
  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.tabSecteur.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabSecteur.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabSecteur.length / this.userParPage);
  }

}
