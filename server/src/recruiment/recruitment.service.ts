import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecruitDto, UpdateRecruitDto } from './dto/recruitment.dto';
import { Recruit, RecruitDocument } from './model/recruitment.model';

@Injectable()
export class RecruitsService {

    constructor(@InjectModel(Recruit.name) private recruitModel: Model<RecruitDocument>) { }

    async findAll() {
        const recruits = await this.recruitModel.find().exec();
        return { success: true, data: { recruits } };
    }

    async findOne(id: string) {
        const recruit = await this.findRecruit(id);
        if (!recruit) return this.notFoundResponse();
        return { success: true, data: { recruit } };
    }

    async create(userId: string = "u1", createRecruitDto: CreateRecruitDto) {
        const newRecruit = new this.recruitModel({
            ...createRecruitDto,
            user: userId,
            isEnded: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            applicants: [],
        });
        await newRecruit.save();
        return {
            success: true,
            message: '모집글이 등록되었습니다.',
            data: { recruit: newRecruit },
        };
    }

    async update(id: string, userId: string = "u1", updateRecruitDto: UpdateRecruitDto) {
        const recruit = await this.findRecruit(id);
        if (!recruit) return this.notFoundResponse();
        if (!this.checkOwnership(recruit, userId)) return this.unauthorizedResponse();

        const updatedRecruit = await this.recruitModel.findByIdAndUpdate(id, {
            ...updateRecruitDto,
            updatedAt: new Date().toISOString(),
        }, { new: true }).exec();

        return {
            success: true,
            message: '모집글이 수정되었습니다.',
            data: { recruit: updatedRecruit },
        };
    }

    async remove(id: string, userId: string = "u1") {
        const recruit = await this.findRecruit(id);
        if (!recruit) return this.notFoundResponse();
        if (!this.checkOwnership(recruit, userId)) return this.unauthorizedResponse();

        await this.recruitModel.findByIdAndDelete(id).exec();

        return {
            success: true,
            message: '모집글이 삭제되었습니다.',
        };
    }

    async apply(applicantId: string = "u2", recruitId: string) {
        const recruit = await this.findRecruit(recruitId);
        if (!recruit) return this.notFoundResponse();
        if (recruit.isEnded) return { success: false, message: '마감된 채용공고입니다.' };
        if (recruit.user.toString() === applicantId) return { success: false, message: '자신의 모집글에는 지원할 수 없습니다.' };
        if (recruit.applicants.includes(applicantId)) return { success: false, message: '이미 지원한 채용공고입니다.' };

        recruit.applicants.push(applicantId);
        recruit.updatedAt = new Date().toISOString();
        await recruit.save();

        return {
            success: true,
            message: '채용공고에 지원했습니다.',
            data: { recruit },
        };
    }

    async unapply(applicantId: string = "u2", recruitId: string) {
        const recruit = await this.findRecruit(recruitId);
        if (!recruit) return this.notFoundResponse();
        if (!recruit.applicants.includes(applicantId)) return { success: false, message: '지원하지 않은 채용공고입니다.' };

        recruit.applicants = recruit.applicants.filter(id => id !== applicantId);
        recruit.updatedAt = new Date().toISOString();
        await recruit.save();

        return {
            success: true,
            message: '채용공고 지원을 취소했습니다.',
            data: { recruit },
        };
    }

    async endRecruit(userId: string = "u1", recruitId: string) {
        const recruit = await this.findRecruit(recruitId);
        if (!recruit) return this.notFoundResponse();
        if (!this.checkOwnership(recruit, userId)) return this.unauthorizedResponse();
        if (recruit.isEnded) return { success: false, message: '이미 종료된 채용공고입니다.' };

        recruit.isEnded = true;
        recruit.updatedAt = new Date().toISOString();
        await recruit.save();

        return {
            success: true,
            message: '채용공고가 종료되었습니다.',
            data: { recruit },
        };
    }

    async restartRecruit(userId: string = "u1", recruitId: string) {
        const recruit = await this.findRecruit(recruitId);
        if (!recruit) return this.notFoundResponse();
        if (!this.checkOwnership(recruit, userId)) return this.unauthorizedResponse();

        recruit.isEnded = false;
        recruit.updatedAt = new Date().toISOString();
        await recruit.save();

        return {
            success: true,
            message: '채용공고가 재시작되었습니다.',
            data: { recruit },
        };
    }

    private async findRecruit(id: string): Promise<RecruitDocument | null> {
        return this.recruitModel.findById(id).exec();
    }

    private notFoundResponse() {
        return { success: false, message: '존재하지 않는 모집글입니다.' };
    }

    private unauthorizedResponse() {
        return { success: false, message: '권한이 없습니다.' };
    }

    private checkOwnership(recruit: RecruitDocument, userId: string = "u1") {
        if (recruit.user.toString() !== userId) {
            return false;
        }
        return true;
    }
}
