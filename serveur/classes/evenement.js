module.exports = class Evenement {

  constructor(id, idUtilisateur, nom, description, dateDebut, dateFin) {
    this.id = id;
    this.idUtilisateur = idUtilisateur;
    this.nom = nom;
    this.description = description;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
  }

}