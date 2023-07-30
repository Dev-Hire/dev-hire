import { User } from './users';

export interface Recruit {
  id: string;
  title: string;
  content: string;
  address: string;
  positions: Position[];
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
  applicants: string[] | User[];
  isEnded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  part: Part;
  experience: number;
}

export type Part = 'frontend' | 'backend' | 'planner' | 'designer' | 'manager';
