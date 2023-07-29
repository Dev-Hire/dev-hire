export interface Position {
  part: string;
  experience: number;
}

export interface Recruit {
  id: string;
  title: string;
  content: string;
  address: string;
  positions: Array<Position>;
  salary: number;
  startDate: string;
  endDate: string;
  images: string[];
  user: {
    id: string;
    email: string;
    name: string;
    positions: Position[];
    password: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}
