import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';
import { LocalAuthGuard } from './authentication/local-auth.guard';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authenticationService: AuthenticationService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
