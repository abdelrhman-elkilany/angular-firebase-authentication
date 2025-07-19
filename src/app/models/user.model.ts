export class User {
  constructor(
    public email: string,
    private localId: string,
    private idToken: string,
    private expiresIn: Date
  ) {}

  get getIdToken() {
    if (new Date(this.expiresIn) <= new Date()) {
      return null;
    }
    return this.idToken;
  }

  get getLocalId() {
    if (new Date(this.expiresIn) <= new Date()) {
      return null;
    }
    return this.localId;
  }
}
