export class User {
  constructor(
    public email: string,
    public password: string,
    public localId: string,
    private idToken:string,
    private expiresIn:Date
  ) {}


    get getIdToken() {
        if (new Date(this.expiresIn) <= new Date()) {
            return null;
        }
        return this.idToken;
    }

} 