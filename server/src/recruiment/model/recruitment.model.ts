import { Document } from 'mongoose';

export class Recruit {
    id?: string;
    title: string;
    description: string;
    company: string;
    address: string;
    positions: {
        part: string;
        experience: number;
    }[];
    salary: number;
    startDate: string;
    endDate: string;
    images: string[];
    applicants: string[];
    user: string;
    isEnded: boolean;
    createdAt: string;
    updatedAt: string;
}

export type RecruitDocument = Recruit & Document;