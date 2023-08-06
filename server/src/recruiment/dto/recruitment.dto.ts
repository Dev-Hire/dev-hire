import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional } from 'class-validator';

// Recruitment DTO (Data Transfer Object)
class Position {
    @IsString()
    @IsNotEmpty()
    part: string;

    @IsNumber()
    experience: number;
}

export class CreateRecruitDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    company: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @IsArray()
    @IsNotEmpty()
    positions: Position[];

    @IsString()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    endDate: string;

    @IsArray()
    @IsOptional()
    images: string[];
}

export class UpdateRecruitDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    company?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsNumber()
    @IsOptional()
    salary?: number;

    @IsArray()
    @IsOptional()
    positions?: Position[];

    @IsString()
    @IsOptional()
    startDate?: string;

    @IsString()
    @IsOptional()
    endDate?: string;

    @IsArray()
    @IsOptional()
    images?: string[];
}
