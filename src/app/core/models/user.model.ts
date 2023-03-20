import { Blog } from "./blog.model";

export class User{
  _id!: string;
  name!: string;
  email!:string;
  firstName!: string;
  lastName!: string;
  createdAt?: string;
  updatedAt?: string;
  blogs?: Blog[] | null;

  getId(): string {
    return this._id;
  }

  getTotalBlogs(): number {
    return (this.blogs && this.blogs.length) || 0;
  }
}
