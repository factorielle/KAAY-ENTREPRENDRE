import { Component } from '@angular/core';
import { Guide } from 'src/app/model/evenement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-guide',
  templateUrl: './gestion-guide.component.html',
  styleUrls: ['./gestion-guide.component.css']
})
export class GestionGuideComponent {
  guides: Guide[] = [];
  tabGuides: any;
  idLastGuide: number = 0;
  
  ngOnInit() {
    // console.log(this.users);
    if (!localStorage.getItem("Guides")) {
      localStorage.setItem("Guides", JSON.stringify(this.guides));
    }

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabGuides = JSON.parse(localStorage.getItem("Guides") || "[]");
    console.log(this.tabGuides);
  }
  
  //variable pour recuperer les données 
  titre: string = "";
  contenu: string = "";
  is_delete: string = "";
  auteur: string = "";
  
  // Methode pour valider l'ajout de le guide
  ajoutApprenantsValider() {
  
  
    if (this.titre == "" || this.contenu == "" || this.auteur == "") {
      this.sweet("error", "Erreur!", "Vueillez renseigner les champs");
    } else {
      // On vérifie si le tableau n'est pas vide 
      if (this.tabGuides.length) {
        console.warn("taille du tab");
        this.idLastGuide = this.tabGuides[this.tabGuides.length - 1].id;
        console.log(this.idLastGuide)
      }
      else {
        this.idLastGuide = 0;
        console.warn(this.idLastGuide )
      }
      // Création de l'objet guide
      let guide = {
        id: this.tabGuides.length + 1,
        titre: this.titre,
        contenu: this.contenu,
        auteur: this.auteur,
        is_delete:0,
      }
      this.tabGuides.push(guide);
      localStorage.setItem("Guides", JSON.stringify(this.tabGuides));

      this.sweet('success', 'Felicitation!', 'Ajout user reuissie');
      this.titre = '';
      this.contenu = '';
      this.auteur='';
    }

  }

  //variable pour recuperer l'apprenant selectioner
  currentGuides: any;
  details(paramGuides: any) {
    // On récupère l'User qui a été selectioner
    this.currentGuides = this.tabGuides.find((element: any) => element.id == paramGuides);
  }

  // Méthode pour afficher un sweetalert2 apres vérification 
  sweet(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.tabGuides.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabGuides.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabGuides.length / this.userParPage);
  }



}
