export class User{
  _id!: string;
  name!: string;
  email!:string;
  firstName!: string;
  lastName!: string;

  getId(): string {
    return this._id;
  }
}
