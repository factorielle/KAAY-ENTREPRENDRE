import { Component, OnInit } from '@angular/core';
import { Experience, Ressource } from 'src/app/model/projet';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit{
  // les attributs
  image:string='';
  titre:string='';
  description:string='';
  url:string='';
  secteur:string='';
 // tableaux
 experiences:Ressource[]=[];
 tabExperience: any;
  userConnect: any;
  tabProjet:any;

  
  ngOnInit() {
    this.tabProjet=JSON.parse(localStorage.getItem('projet') || '');
    if (!localStorage.getItem("experience") ) {
      localStorage.setItem("experience",JSON.stringify(this.experiences));
    }
    this.tabExperience=JSON.parse(localStorage.getItem("experience") || "[]");
   console.log(this.tabExperience) 
  }

  ajoutRessource(){


    if(this.titre == "" || this.description == ""  || this.url == ""  || this.secteur == "" || this.image=="" )  {
      this.verifChamps("Desole", "Veuillez remplir tous les champs", "error");
    }
    else {
      let projet = {
        idRessource:this.tabExperience.length+1,
        titre:this.titre,
        description: this.description,
        url: this.url,
        image: this.image,
        createAt: new Date,
        updateAt:''
       
      } 
      this.tabExperience.push(projet);
      console.log(this.tabExperience);
      localStorage.setItem("experience", JSON.stringify(this.tabExperience));
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

}
