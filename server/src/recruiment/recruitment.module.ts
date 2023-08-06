import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecruitSchema } from 'src/recruiment/schemas/recruitment.schema';
import { RecruitsController } from './recruitment.controller';
import { RecruitsService } from './recruitment.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Recruit', schema: RecruitSchema }])],
    controllers: [RecruitsController],
    providers: [RecruitsService],
    exports: [RecruitsService],
})
export class RecruitsModule { }
