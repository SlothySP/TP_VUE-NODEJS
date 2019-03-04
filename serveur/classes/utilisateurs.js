const Utilisateur = require('./utilisateur')

module.exports = class Utilisateurs {

  constructor() {
    this.list = []
  }

  addUser(email, mdp) {
    let userToAdd = new Utilisateur(this.getNextId(), email, mdp);
    this.list.push(userToAdd);
    return true;
  }

  getUser(email) {
    let i=0;
    while(i<this.list.length && this.list[i].email!=email) {
        i++;
    }
    return i<this.list.length ? this.list[i] : false;
  }

  getNextId() {
    if(this.list.length == 0) {
        return 0;
    }
    let lastUser = this.list[this.list.length-1];
    return lastUser.id+1;
  }

}