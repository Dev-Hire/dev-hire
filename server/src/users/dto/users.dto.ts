import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()   
    password: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsString({ each: true })
    positions: string[];
    
    @IsString({ each: true })
    recruits: string[];
    
    @IsString()
    role: string;
}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    // @IsStrongPassword()   
    password: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsString({ each: true })
    positions: string[];
    
    @IsString({ each: true })
    recruits: string[];
    
    @IsString()
    role: string;
}
