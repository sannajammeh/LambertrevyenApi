class PlaysService {
  constructor(firestore) {
    this.db = firestore;
  }
  async fetchPlays() {
    const ref = await this.firestore.collection('performances').get();
  }
}
