import { User } from './users';

export interface Recruit {
  id: string;
  title: string;
  description: string;
  company: string;
  address: string;
  positions: Position[];
  salary: number;
  startDate: string;
  endDate: string;
  images: string[];
  user: User | string;
  applicants: string[] | User[];
  isEnded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  part: Part;
  experience: number;
}

export type Part = 'frontend' | 'backend' | 'planner' | 'designer' | 'publisher' | 'manager';
