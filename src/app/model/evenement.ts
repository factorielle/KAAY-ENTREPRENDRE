export class Evenement {
    id: number = 0;
    type: string = "";
    nom: string = "";
    description: string = "";
    date: string = "";
    lieu: string = "";
    etat: string = "";
    image: string = "";
}

export class Secteur {
    id: number = 0;
    nom: string = "";
}

export class Role {
    id: number = 0;
    nom: string = "";
}

export class Guide {
    id: number = 0;
    titre: string = '';
    contenu: string = '';
    auteur: string = '';
    is_delete: string = '';

}

export class Forum {
    id: number = 0;
    message: string = '';
    auteur: string = '';
    commentaire = [];
}