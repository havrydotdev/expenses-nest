declare namespace Express {
  interface Request {
    user: CustomUser;
  }
}

interface CustomUser {
  id: number;
  username: string;
}
