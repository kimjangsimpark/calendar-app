import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api')
export class AuthController {
  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Post('auth/login')
  async login(
    @Req() request: Request<void, void, { email: string; password: string }>,
  ): Promise<{ accessToken: string }> {
    try {
      const body = request.body;
      const token = await this.authService.generateAccessToken(
        body.email,
        body.password,
      );
      return {
        accessToken: token,
      };
    } catch (e) {
      throw new HttpException('no matched user found', HttpStatus.UNAUTHORIZED);
    }
  }
}
