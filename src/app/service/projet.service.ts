import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  apiUrl='http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }
  getProjet(){
    return this.http.get(`${this.apiUrl}/`);
  }
   // Méthode pour ajouter un projet
   postProjet(projet: any) {
    return this.http.post(`${this.apiUrl}/create`, projet);
  }
   modifierProjet(projet: any) {
    return this.http.post(`${this.apiUrl}/create`, projet);
  }

  // Méthode pour supprimer un projet
  supprimerProjet(projetId: any) {
    return this.http.delete(`${this.apiUrl}/etude-cas/delete/{id}`);
  }
}
