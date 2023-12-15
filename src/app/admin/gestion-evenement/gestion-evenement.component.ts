import { Component,OnInit } from '@angular/core';
import { Evenement } from 'src/app/model/evenement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-evenement',
  templateUrl: './gestion-evenement.component.html',
  styleUrls: ['./gestion-evenement.component.css']
})
export class GestionEvenementComponent  implements OnInit {
  nomEvenement: string = '';
  type: string = '';
  dateEvenement: string = '';
  lieuEvenement: string = '';
  description: string = '';
  imageEvenement:string = '';
  
  evenement: Evenement[] = []; 
  tabEvents: any;
  idLastEvent:number=0;

  ngOnInit(): void {
    if (localStorage.getItem('Evenement') == null || localStorage.getItem('Evenement') == undefined) {
        localStorage.setItem('Evenement',JSON.stringify(this.evenement));
    }
    this.tabEvents=JSON.parse(localStorage.getItem('Evenement') ||'[]');
  }

  // Methode pour valider l'ajout de le guide
  ajoutValider() {
    if (this.nomEvenement == "" || this.type == "" || this.description == "" || this.lieuEvenement=="" || this.imageEvenement == "" || this.dateEvenement=="") {
      this.showAlert("error", "Erreur!", "Vueillez renseigner les champs");
    } else {
      // On vérifie si le tableau n'est pas vide 
      if (this.tabEvents.length) {
        console.warn("taille du tab");
        this.idLastEvent = this.tabEvents[this.tabEvents.length - 1].id;
        console.log(this.idLastEvent)
      }
      else {
        this.idLastEvent = 0;
        console.warn(this.idLastEvent)
      }
      // Création de l'objet guide
      let event = {
        id: this.tabEvents.length +1,
        type: this.type,
        nom: this.nomEvenement,
        description: this.description,
        date: this.dateEvenement,
        lieu: this.lieuEvenement,
        etat: 'en cours',
        image: this.imageEvenement,
      }
      this.tabEvents.push(event);
      localStorage.setItem("Evenement", JSON.stringify(this.tabEvents));

      this.showAlert('success', 'Felicitation!', 'Ajout user reuissie');
      this.type = '';
      this.nomEvenement = '';
      this.description = '';
      this.dateEvenement = '';
      this.lieuEvenement = '';
      this.imageEvenement = '';
    }

  }

  



  parameval:any;
   // methode pour reporter une evaluation
 reporterEvenement(parameval:any){
  parameval.etat='reporté'
  localStorage.setItem('Evenement', JSON.stringify(this.tabEvents))
}


showAlert(title:any, text:any, icon:any){
  Swal.fire({
    title:title,
    text:text,
    icon:icon
  })
}

currentEvenement:any;
// methode pour charger info
chargerInfo(parameval:any){
this.currentEvenement=parameval;
this.type=parameval.type;
this.nomEvenement=parameval.nom;
this.description = parameval.description;
this.lieuEvenement = parameval.lieu;
this.imageEvenement = parameval.image;
this.dateEvenement = parameval.date;
}

// methode pour reprogrammer
reprogramer(){
this.currentEvenement.nom=this.nomEvenement;
this.currentEvenement.type=this.type;
this.currentEvenement.description=this.description;
  this.currentEvenement.etat = 'en cours';
  this.currentEvenement.lieu = this.lieuEvenement;
  this.currentEvenement.date = this.dateEvenement;
  this.currentEvenement.image = this.imageEvenement;
  
  
localStorage.setItem('Evenement', JSON.stringify(this.tabEvents));
this.showAlert('Felicitations..', 'Evenement reprogrammer  avec succes', 'success')
  }
  

  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.tabEvents.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabEvents.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabEvents.length / this.userParPage);
  }
}
