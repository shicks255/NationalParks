interface IUser {
  id: number;
  username: string;
}

class User {
  id: number;

  username: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
  }
}

export type { IUser };
export { User };
