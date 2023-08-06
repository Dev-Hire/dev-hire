import { Controller, Get, Post, Put, Delete, Param, Body, Req } from '@nestjs/common';
import { RecruitsService } from './recruitment.service';
import { CreateRecruitDto, UpdateRecruitDto } from './dto/recruitment.dto';

// TODO: Add authentication (AuthGuard) to all routes
@Controller('api/v1/recruits')
export class RecruitsController {
    constructor(private readonly recruitsService: RecruitsService) { }

    @Get()
    findAll() {
        return this.recruitsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recruitsService.findOne(id);
    }

    @Post()
    create(@Req() req, @Body() createRecruitDto: CreateRecruitDto) {
        return this.recruitsService.create(req.user, createRecruitDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRecruitDto: UpdateRecruitDto) {
        return this.recruitsService.update(id, updateRecruitDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recruitsService.remove(id);
    }
}
