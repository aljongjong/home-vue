import firebase from "../firebase";

const db = firebase.ref("/board");

class BoardDataService {
  getAll() {
    return db;
  }

  create(board) {
    return db.push(board);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }

  getLastIndexNo() {
    return db.limitToLast(1).once('value');
  }


}

export default new BoardDataService();