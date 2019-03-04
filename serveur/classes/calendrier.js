const Evenement = require("./evenement");

module.exports = class Calendrier {
  constructor() {
    this.list = [];
  }

  addEvent(idUtilisateur, nom, description, dateDebut, dateFin) {
    let eventToAdd = new Evenement(
      this.getNextId(),
      idUtilisateur,
      nom,
      description,
      dateDebut,
      dateFin
    );
    this.list.push(eventToAdd);
  }

  getEvent(id, idUtilisateur) {
    let index = this.getIndexOf(id);
    if (index == -1) {
      return false;
    }
    let evenement = this.list[index];
    if (evenement.idUtilisateur == idUtilisateur) {
      return evenement;
    } else {
      return false;
    }
  }

  getAllEvent(idUtilisateur) {
    return this.list.filter(function(evenement) {
      if (evenement.idUtilisateur == idUtilisateur) {
        return true;
      } else {
        return false;
      }
    });
  }

  deleteEvent(id, idUtilisateur) {
    let index = this.getIndexOf(id);
    if (index == -1) {
      return false;
    }
    let evenement = this.list[index];
    if (evenement.idUtilisateur == idUtilisateur) {
      this.list.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  getNextId() {
    if (this.list.length == 0) {
      return 0;
    }
    let lastEvent = this.list[this.list.length - 1];
    return lastEvent.id + 1;
  }

  getIndexOf(id) {
    let i = 0;
    while (i < this.list.length && this.list[i].id != id) {
      i++;
    }
    return i < this.list.length ? i : -1;
  }
};
