import { Injectable } from '@nestjs/common';
import { CreateRecruitDto, UpdateRecruitDto } from './dto/recruitment.dto';
import { recruits } from './data/recruitment.data';

@Injectable()
export class RecruitsService {

    // TODO: Change to use MongoDB
    private readonly recruits = recruits;

    findAll() {
        return {
            success: true,
            data: {
                recruits: this.recruits,
            },
        };
    }

    findOne(id: string) {
        const existingRecruit = this.recruits.find(recruit => recruit.id === id);

        if (!existingRecruit) {
            return {
                success: false,
                message: '존재하지 않는 모집글입니다.',
            };
        }

        return {
            success: true,
            data: {
                recruit: { ...existingRecruit },
            },
        };
    }

    // TODO: user: any 타입을 User로 변경
    create(user: any, createRecruitDto: CreateRecruitDto) {
        const newRecruit = {
            id: `r${this.recruits.length + 1}`,
            ...createRecruitDto,

            // TODO: 기본값 "u1" 삭제
            user: user?.id || "u1",
            isEnded: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            applicants: [],
        };
        this.recruits.push(newRecruit);

        return {
            success: true,
            message: '모집글이 등록되었습니다.',
            data: {
                recruit: newRecruit,
            },
        };
    }

    update(id: string, updateRecruitDto: UpdateRecruitDto) {
        const recruitIndex = this.recruits.findIndex(recruit => recruit.id === id);
        if (recruitIndex === -1) {
            return {
                success: false,
                message: '존재하지 않는 모집글입니다.',
            };
        }

        const updatedRecruit = {
            ...this.recruits[recruitIndex],
            ...updateRecruitDto,
            updatedAt: new Date().toISOString(),
        };

        this.recruits[recruitIndex] = updatedRecruit;

        return {
            success: true,
            message: '모집글이 수정되었습니다.',
            data: {
                recruit: updatedRecruit,
            },
        };
    }

    remove(id: string) {
        const recruitIndex = this.recruits.findIndex(recruit => recruit.id === id);
        if (recruitIndex === -1) {
            return {
                success: false,
                message: '존재하지 않는 모집글입니다.',
            };
        }

        this.recruits.splice(recruitIndex, 1);

        return {
            success: true,
            message: '모집글이 삭제되었습니다.',
        };
    }
}
