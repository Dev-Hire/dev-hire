import { Recruit, Position } from './recruit';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  positions: Position[];
  recruits: string[] | Recruit[];
  role: string;
}
