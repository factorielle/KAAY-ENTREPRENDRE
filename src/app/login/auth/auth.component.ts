import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, tap } from 'rxjs';
import { User } from 'src/app/model/users';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  showSteps: boolean = true;
  choixFormulaire: boolean = true;

  credentials: any;
  loading!: boolean;
  userConnected: any;
  errorMsg: any;
  experience: any;
  realisation: any;
  userConnect: any;
  userOnline: any;
  tabUser: any;
  tabAdmin: any;

  users: User[] = [];
  constructor(private route: Router, private authService: AuthService) { }
  
  ngOnInit() {
    if (localStorage.getItem('User')==null || localStorage.getItem('User')==undefined){
     localStorage.setItem('User', JSON.stringify(this.users));
    }
    
    this.tabUser = JSON.parse(localStorage.getItem("User") || '[]');
    console.log(this.tabUser)

    this.tabAdmin = JSON.parse(localStorage.getItem("tabAdmin") || '[]');

    let compteAdmin = {
      emailAdminLogin: 'admin@gmail.com',
      passwordAdminLogin: 'passer123',
    }

    this.tabAdmin.push(compteAdmin)
  
  }

  public afficherFormulaire() {
    this.choixFormulaire = !this.choixFormulaire;
  }

  public afficherStep() {
    this.showSteps = !this.showSteps;
  }

  submitFunction(event: Event) {
    event.preventDefault();
  }

  // Nos attributs

  activite:string='';
  image:string='';
  emailLogin: string = "";
  passwordLogin: string = "";
  experimente: string = "";
  novice: string = "";
  prenom: string = "";
  nom: string = "";
  email: string = "";
  password: string = "";
  adresse: string = "";
  region:string="";
  statExp:string="";
  statNov:string="";
  bdUsers: any;  

  
// connexion

login() {
  // alert('connecter');
  if (this.emailLogin == "" || this.passwordLogin == "") {
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");
  } else {

    this.authService.login({ email: this.emailLogin, password: this.passwordLogin }, (reponse: any) => {

      console.log(reponse);
      if (reponse.token) {
        this.showMessage("success","Felicitations" ,"Connexion faite avec succès");

        //stocker notre les info de la requete dans notre localstorage
        localStorage.setItem("userOnline", JSON.stringify(reponse));

        //recuperer le le userConnecter
         this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '');

        if (reponse.user.role_id === 1) {
          this.route.navigate(['/accueilAdmin']);
        } else if (reponse.user.role_id === 3) {
          this.route.navigate(['/accueilEntrepreneur']);
        } else {
          this.route.navigate(['/accueilUser']);
        }
      } else {
        this.showMessage("error", "Oops","Login ou pass incorrect");
      }
    });
  }
}





// sweetalert
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
  })
}

  userFound: any;
  userAdminFound:any;
  connexion() {
    // alert(this.emailLogin);
    // alert(this.passwordLogin);

    // EmailRegex
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.emailLogin == "" || this.passwordLogin == "") {
      this.alertMessage("error", "Attention", "Veillez renseigner tous les champs");
    } else if (!this.emailLogin.match(emailPattern)) {
      this.alertMessage("error", "Attention", "Veillez revoir votre email");
    } else if (this.passwordLogin.length < 5) {
      this.alertMessage("error", "Attention", "Le mot de passe doit contenir plus de huit caractéres");
    } else {
      this.userFound = this.tabUser.find((element: any) => element.email == this.emailLogin && element.password == this.passwordLogin);
      this.userAdminFound = this.tabAdmin.find((element: any) => element.emailAdminLogin == this.emailLogin && element.passwordAdminLogin == this.passwordLogin);
      if (this.userAdminFound) {
        this.route.navigate(['gestionUsers']);
        this.alertMessage("success", "Bravo", "Vous etes connecté avec succés");
      }else
      if (this.userFound) {
        if (this.userFound.role == 'experimenter') {
          this.route.navigate(['accueilEntrepreneur']);
          this.alertMessage("success", "Bravo", "Vous etes connecté avec succés");
        }
        if (this.userFound.role == 'novice' ) {
          this.route.navigate(['accueilUser']);
          this.alertMessage("success", "Bravo", "Vous etes connecté avec succés");
        }
      }
      else {
        this.alertMessage("error", "Oups!", "Le compte n'exite pas ou est désactiver");
      }
    }

  }

  // Methode pour gerer l'inscription
  inscription() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.nom == "" || this.prenom == "" || this.email == "" || this.password == "") {
      this.alertMessage("Desole", "Veuillez remplir tous les champs", "error");
    } else if (!this.email.match(emailPattern)) {
      this.alertMessage("desole", "l'email n'est pas valide", "error");
    } else if (this.password.length < 5) {
      this.alertMessage("desole", "Le mot de passe doit être supérieur ou égal à 5", "error");
    }
    else {
      let user = {
        id: this.tabUser.length +1,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
        region: this.region,
        adresse: this.adresse,
        role:'novice',
      }
      console.log(user);
      this.tabUser.push(user);
      console.log(this.tabUser);            
      localStorage.setItem("User", JSON.stringify(this.tabUser));
      this.alertMessage("success", "Bravo", "Inscription reussi");
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.password = '';
      this.region = '';
      this.adresse = '';
    }
  }

  // Methode pour gerer l'inscription
  inscriptionExperimenter() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.nom == "" || this.prenom == "" || this.email == "" || this.password == "" || this.realisation=="" || this.experience=="") {
      this.alertMessage("Desole", "Veuillez remplir tous les champs", "error");
    } else if (!this.email.match(emailPattern)) {
      this.alertMessage("desole", "l'email n'est pas valide", "error");
    } else if (this.password.length < 5) {
      this.alertMessage("desole", "Le mot de passe doit être supérieur ou égal à 5", "error");
    }
    else {
      let user = {
        id: this.tabUser.length + 1,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
        region: this.region,
        adresse: this.adresse,
        role: 'experimenter',
      }
      console.log(user);
      this.tabUser.push(user);
      console.log(this.tabUser);
      localStorage.setItem("User", JSON.stringify(this.tabUser));
      this.alertMessage("success", "Bravo", "Inscription reussi");
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.password = '';
      this.region = '';
      this.adresse = '';
      this.realisation = '';
      this.experience = '';
    }
  }

  // Initialiser le contenu actuel
  currentContent: string = '';

  // Mettre à jour le contenu actuel
  showComponant(contentId: string): void {
    this.currentContent = contentId;
  }



  

  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }

// inscription
  // signNovice() {
  //   this.user={
  //     prenom:this.prenom,
  //     nom:this.nom,
  //     email:this.email,
  //     adresse:this.adresse,
  //     password:this.password,
  //     region:this.region,  
  //   }
  //   alert("hi")
  //   this.authService.inscriptionNovice(this.user).subscribe(
  //     (response:any) => {
  //       console.log(this.user)
  //       alert("hO")
       
  //       const token = response.access_token;
  //       // this.route.navigate(['/accueilUser'])
  //     },
  //     (error:any) => {
  //       // Gérez les erreurs d'inscription.
  //       console.error('Erreur d\'inscription :', error);
  //     }
  //   );
  // }
// inscription
  // signExperimente() {
  //   this.user={
  //     prenom:this.prenom,
  //     nom:this.nom,
  //     email:this.email,
  //     adresse:this.adresse,
  //     password:this.password,
  //     region:this.region,
  //     realisation:this.realisation,
  //     experience:this.experience,
  //     activite:this.activite
  //   }
  //   this.authService.inscriptionExperimente(this.user).subscribe(
  //     (response:any) => {
       
  //       const token = response.access_token;
  //       this.route.navigate(['/login'])
  //     },
  //     (error:any) => {
  //       // Gérez les erreurs d'inscription.
  //       console.error('Erreur d\'inscription :', error);
  //     }
  //   );
  // }

  // connexion
  // signIn() {
  //   this.credentials={
  //     email:this.emailLogin,
  //     password:this.passwordLogin
  //   }
  //   this.authService.signIn(this.credentials).subscribe(
  //     (response:any) => {
  //       // Stockez le token dans un service ou dans le stockage local (localStorage).
  //       console.log(response)
        
  //      console.log(this.user)
       
  //       console.log(this.credentials)
  //       this.route.navigate(['/accueilUser'])
  //     },
  //     (error:any) => {
  //       // Gérez les erreurs de connexion.
  //       console.error('Erreur de connexion :', error);
  //     }
  //   );
  // }
}
