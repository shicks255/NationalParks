interface IUserVisit {
  userId: number;
  parkId: number;
  rating?: number;
  comment?: string;
  visited?: string;
}

class UserVisit {
  userId: number;

  parkId: number;

  rating?: number;

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
