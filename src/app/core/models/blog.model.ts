import { User } from "./user.model";

export class Blog{
  _id!: string;
  title?: string;
  description?:string;
  user?: User|null;
  createdAt?: string;
  updatedAt?: string;

  getId(): string {
    return this._id;
  }

  getUpdatedAt(): Date|null{
    return this.updatedAt ? new Date(this.updatedAt) : null;
  }
}
