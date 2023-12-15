import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Role, Secteur } from 'src/app/model/evenement';

@Component({
  selector: 'app-gestion-role',
  templateUrl: './gestion-role.component.html',
  styleUrls: ['./gestion-role.component.css']
})
export class GestionRoleComponent {
  nomSecteur: string = '';
  nomSecteurModif: string = "";

  SecteurChoisi: any;
  showMessage: any;
  role: Role[] = [];

  tabRole: any;

  constructor(private route: Router) { }
  ngOnInit() {
    if (localStorage.getItem('Role') == null || localStorage.getItem('Role') == undefined) {
      localStorage.setItem('Role', JSON.stringify(this.role));
    }

    this.tabRole = JSON.parse(localStorage.getItem('Role') || '[]');
    console.warn(this.tabRole);

  }

 
  // ajouter Secteur
  ajouterSecteur() {
    if (this.nomSecteur == '') {
      this.showMessage("error", "Oops", " veuillez remplire le champ ");
    } else {
      let role = {
        id: this.tabRole.length + 1,
        secteur: this.nomSecteur,
      }
      this.tabRole.push(role);
      localStorage.setItem("Role", JSON.stringify(this.tabRole));
      this.showMessage("success", "Felicitations", " Role crée avec success");
      this.nomSecteur = '';

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

    localStorage.setItem('Secteur', JSON.stringify(this.tabRole));
    this.showMessage('Felicitations..', 'Secteur modifié  avec succes', 'success')
  }
  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.tabRole.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabRole.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabRole.length / this.userParPage);
  }
}
