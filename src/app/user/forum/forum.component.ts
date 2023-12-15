import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  message: string = '';
  forum: Form[] = [];
  tabForum: any;

  ngOnInit() {
    if (localStorage.getItem('Forum') == null || localStorage.getItem('Forum') == undefined) {
      localStorage.setItem('Forum', JSON.stringify(this.forum));
    }

    this.tabForum = JSON.parse(localStorage.getItem('Forum') || '[]');
    console.warn(this.tabForum);

  }
  
  ajouterforum() {
    if (this.message == '') {
      this.sweet("error", "Oops", " veuillez remplire le champ ");
    } else {
      let forum = {
        id: this.tabForum.length + 1,
        message: this.message,
        commentaire:[],
      }
      this.tabForum.push(forum);
      localStorage.setItem("Forum", JSON.stringify(this.tabForum));
      this.sweet("success", "Felicitations", " message ajouter avec success");
      this.message = '';

    }
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
     return this.tabForum.slice(indexDebut, indexFin);
   }
   // Méthode pour générer la liste des pages
   get pages(): number[] {
     const totalPages = Math.ceil(this.tabForum.length / this.userParPage);
     return Array(totalPages).fill(0).map((_, index) => index + 1);
   }
 
   // Méthode pour obtenir le nombre total de pages
   get totalPages(): number {
     return Math.ceil(this.tabForum.length / this.userParPage);
   }
 
}
