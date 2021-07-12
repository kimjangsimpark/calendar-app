import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post('user/save')
  async saveUser(
    @Req()
    request: Request<
      void,
      void,
      { email: string; password: string; name: string }
    >,
  ): Promise<{ result: true }> {
    try {
      const body = request.body;
      await this.userService.saveUser(body.email, body.password, body.name);
      return { result: true };
    } catch (e) {
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('user/delete')
  async deleteUser(@Body() user: User): Promise<Object> {
    const findUser = this.userService.findOne(user.email);
    if (findUser == null) return { status: 'error' };

    const result = await this.userService.deleteUser(user.email);
    if (result == null) {
      return {
        status: 'deleteError',
      };
    }

    return Object.assign({
      data: { userEmail: user.email },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }
}
