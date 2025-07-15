export class User {
  constructor(
    public email: string,
    public password: string,
    public localId: string,
    private idToken:string,
    private expiresIn:string
  ) {}


    get getIdToken() {
        const expireDate = new Date(new Date().getTime() + parseInt(this.expiresIn) * 1000);
        if (expireDate <= new Date()) {
            return null;
        }
        return this.idToken;
    }

} 