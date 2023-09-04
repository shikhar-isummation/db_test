import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // } 

  // // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.CEO]))
  // @Get('sm')
  // getData(@Request() req) {
  //   return `I am CEO. \n ${JSON.stringify(req.user)}`;
  // }

  // // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtAuthGuard, new RoleGuard([CONSTANTS.ROLES.MANAGER, CONSTANTS.ROLES.CEO]))
  // @Get('wm')
  // getData1(@Request() req) {
  //   return `I am Manager.\n ${JSON.stringify(req.user)}`;
  // }
}