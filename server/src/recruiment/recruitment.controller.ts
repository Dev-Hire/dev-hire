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
        return this.recruitsService.create(req?.user?.id, createRecruitDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Req() req, @Body() updateRecruitDto: UpdateRecruitDto) {
        return this.recruitsService.update(id, req?.user?.id, updateRecruitDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
        return this.recruitsService.remove(id, req?.user?.id);
    }

    @Post(':id/apply')
    apply(@Req() req, @Param('id') recruitId: string) {
        return this.recruitsService.apply(req?.user?.id, recruitId);
    }

    @Delete(':id/apply')
    unapply(@Req() req, @Param('id') recruitId: string) {
        return this.recruitsService.unapply(req?.user?.id, recruitId);
    }

    @Put(':id/end')
    endRecruit(@Req() req, @Param('id') recruitId: string) {
        return this.recruitsService.endRecruit(req?.user?.id, recruitId);
    }

    @Put(':id/restart')
    restartRecruit(@Req() req, @Param('id') recruitId: string) {
        return this.recruitsService.restartRecruit(req?.user?.id, recruitId);
    }
}
