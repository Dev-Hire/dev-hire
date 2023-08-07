import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecruitDto, UpdateRecruitDto } from './dto/recruitment.dto';
import { Recruit, RecruitDocument } from './model/recruitment.model';


@Injectable()
export class RecruitsService {

    constructor(@InjectModel(Recruit.name) private recruitModel: Model<RecruitDocument>) {}

    async findAll() {
        const recruits = await this.recruitModel.find().exec();
        return {
            success: true,
            data: { recruits },
        };
    }

    async findOne(id: string) {
        const existingRecruit = await this.recruitModel.findById(id).exec();
        if (!existingRecruit) {
            return {
                success: false,
                message: '존재하지 않는 모집글입니다.',
            };
        }
        return {
            success: true,
            data: { recruit: existingRecruit },
        };
    }

    async create(user: any, createRecruitDto: CreateRecruitDto) {
        const newRecruit = new this.recruitModel({
            ...createRecruitDto,
            user: user?.id || "u1",  // you might want to adjust this part
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

    async update(id: string, updateRecruitDto: UpdateRecruitDto) {
        const updatedRecruit = await this.recruitModel.findByIdAndUpdate(id, {
            ...updateRecruitDto,
            updatedAt: new Date().toISOString(),
        }, { new: true }).exec();  // { new: true } returns the modified document

        if (!updatedRecruit) {
            return {
                success: false,
                message: '존재하지 않는 모집글입니다.',
            };
        }
        return {
            success: true,
            message: '모집글이 수정되었습니다.',
            data: { recruit: updatedRecruit },
        };
    }

    async remove(id: string) {
        const deletedRecruit = await this.recruitModel.findByIdAndDelete(id).exec();
        if (!deletedRecruit) {
            return {
                success: false,
                message: '존재하지 않는 모집글입니다.',
            };
        }
        return {
            success: true,
            message: '모집글이 삭제되었습니다.',
        };
    }
}
