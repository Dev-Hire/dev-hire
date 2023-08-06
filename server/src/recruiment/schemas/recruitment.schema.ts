import { Schema } from 'mongoose';

// Recruit 스케마 정의 (모델 정의)
export const RecruitSchema = new Schema({
    id: String,
    title: String,
    description: String,
    company: String,
    address: String,
    positions: [
        {
            part: String,
            experience: Number,
        },
    ],
    salary: Number,
    startDate: String,
    endDate: String,
    images: [String],
    applicants: [String],
    user: String,
    isEnded: Boolean,
    createdAt: String,
    updatedAt: String,
});
