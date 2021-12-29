interface IUserVisit {
  userId: string;
  parkId: string;
  rating?: string;
  comment?: string;
  visited?: string;
}

class UserVisit {
  userId: string;

  parkId: string;

  rating?: string;

  comment?: string;

  visited?: string;

  constructor(visit: IUserVisit) {
    this.userId = visit.userId;
    this.parkId = visit.parkId;
    this.rating = visit.rating;
    this.comment = visit.comment;
    this.visited = visit.visited;
  }
}

export { UserVisit };
export type { IUserVisit };
