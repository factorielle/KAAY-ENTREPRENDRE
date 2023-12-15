import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit {
  users = [
    {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: '',
      statut: '',
      image:'',
    }
  ]

  //variable pour recuperer les données 
  valeur: string = "";
  image: string = "";
  password: string = "";
  email: string = "";
  prenom: string = "";
  name: string = "";
  role: string = "";

  tabUsers: any;
  idLastUser: number = 0;

  ngOnInit() {
    

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabUsers = JSON.parse(localStorage.getItem("User") || "[]");
    console.log(this.tabUsers);
  }
  // Méthode pour afficher un sweetalert2 apres vérification 
  sweet(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  //variable pour recuperer l'apprenant selectioner
  currentUser: any;
  details(paramUser: any) {
    // On récupère l'User qui a été selectioner
    this.currentUser = this.tabUsers.find((element: any) => element.id == paramUser);
  }

  toggleEtat(user: any) {
    user.etat = (user.etat === 'active') ? 'inactive' : 'active';
  }

  // Attribut pour la pagination
  userParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getUserPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.userParPage;
    const indexFin = indexDebut + this.userParPage;
    return this.tabUsers.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabUsers.length / this.userParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabUsers.length / this.userParPage);
  }

}
