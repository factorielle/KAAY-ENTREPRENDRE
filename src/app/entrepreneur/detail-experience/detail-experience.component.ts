import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-experience',
  templateUrl: './detail-experience.component.html',
  styleUrls: ['./detail-experience.component.css']
})
export class DetailExperienceComponent implements OnInit{
  tabCurrentExperience:any[]=[];
  tabExperience: any;
  experienceChoisi: any;
  idexperienceChoisi: any;
  titre: any;
  description: any;

  constructor(private route: ActivatedRoute, private router: Router) {};
  idExperienceChoisi = this.route.snapshot.params['id'];

  ngOnInit() {
    this.tabExperience = JSON.parse(localStorage.getItem('projet') || '[]');
    console.log( this.tabExperience);
    this.experienceChoisi = this.tabExperience.find((element: any) => element.idProjet == this.idExperienceChoisi);
    console.log(this.experienceChoisi)
    this.tabCurrentExperience.push(this.experienceChoisi) ;
    console.log(this.tabCurrentExperience)
   
  }
  chargerInfo(){
    this.titre=this.experienceChoisi.titre;
    this.description=this.experienceChoisi.description;
  }

  modifier(){
    this.experienceChoisi.titre=this.titre;
    this.experienceChoisi.description=this.description;
    
    localStorage.setItem("experience", JSON.stringify(this.tabExperience));
      this.verifChamps("Bravo", "modification reussi", "success");
      this.viderChamps();
  }

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
